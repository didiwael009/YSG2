from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass
from typing import Iterable

import pandas as pd


@dataclass(frozen=True)
class OpportunityConfig:
    min_impressions: int = 50
    min_position: float = 4.0
    max_position: float = 15.0
    low_ctr: float = 0.02


def _empty_if_missing(df: pd.DataFrame, required: Iterable[str]) -> pd.DataFrame:
    missing = [column for column in required if column not in df.columns]
    if missing or df.empty:
        return pd.DataFrame()
    return df.copy()


def find_keyword_opportunities(
    current: pd.DataFrame,
    previous: pd.DataFrame | None = None,
    config: OpportunityConfig | None = None,
) -> pd.DataFrame:
    config = config or OpportunityConfig()
    df = _empty_if_missing(current, ["query", "clicks", "impressions", "ctr", "position"])
    if df.empty:
        return df

    df["opportunity_type"] = ""
    df["reason"] = ""

    quick_wins = df[
        (df["position"] >= config.min_position)
        & (df["position"] <= config.max_position)
        & (df["impressions"] >= config.min_impressions)
    ].copy()
    quick_wins["opportunity_type"] = "position_4_to_15"
    quick_wins["reason"] = "Ranking close to page one / top positions with meaningful impressions."

    low_ctr = df[(df["impressions"] >= config.min_impressions) & (df["ctr"] < config.low_ctr)].copy()
    low_ctr["opportunity_type"] = "low_ctr"
    low_ctr["reason"] = "High impressions but low CTR. Review title, meta description, and search intent match."

    zero_click = df[(df["impressions"] >= config.min_impressions) & (df["clicks"] == 0)].copy()
    zero_click["opportunity_type"] = "zero_clicks"
    zero_click["reason"] = "Impressions but zero clicks. SERP snippet or intent mismatch likely."

    frames = [quick_wins, low_ctr, zero_click]

    if previous is not None and not previous.empty and {"query", "clicks", "impressions", "position"}.issubset(previous.columns):
        merged = df.merge(
            previous[["query", "clicks", "impressions", "position"]],
            on="query",
            how="inner",
            suffixes=("", "_previous"),
        )
        declining = merged[
            (merged["impressions"] >= config.min_impressions)
            & ((merged["clicks"] < merged["clicks_previous"]) | (merged["position"] > merged["position_previous"] + 1))
        ].copy()
        declining["opportunity_type"] = "declining_keyword"
        declining["reason"] = "Clicks declined or average position worsened vs previous period."
        frames.append(declining)

    result = pd.concat(frames, ignore_index=True) if frames else pd.DataFrame()
    if result.empty:
        return result

    result = result.drop_duplicates(subset=["query", "page", "opportunity_type"] if "page" in result.columns else ["query", "opportunity_type"])
    return result.sort_values(["impressions", "position"], ascending=[False, True])


def analyze_pages(current: pd.DataFrame, previous: pd.DataFrame | None = None, min_impressions: int = 50) -> dict[str, pd.DataFrame]:
    df = _empty_if_missing(current, ["page", "clicks", "impressions", "ctr", "position"])
    if df.empty:
        return {}

    page_df = (
        df.groupby("page", as_index=False)
        .agg(clicks=("clicks", "sum"), impressions=("impressions", "sum"), ctr=("ctr", "mean"), position=("position", "mean"))
        .sort_values("clicks", ascending=False)
    )

    output = {
        "best_pages": page_df.sort_values(["clicks", "impressions"], ascending=False).head(50),
        "weak_pages": page_df[(page_df["impressions"] < min_impressions) & (page_df["clicks"] == 0)].sort_values("impressions"),
        "high_impression_low_ctr": page_df[(page_df["impressions"] >= min_impressions) & (page_df["ctr"] < 0.02)].sort_values("impressions", ascending=False),
    }

    if previous is not None and not previous.empty and "page" in previous.columns:
        prev = previous.groupby("page", as_index=False).agg(
            clicks_previous=("clicks", "sum"),
            impressions_previous=("impressions", "sum"),
            position_previous=("position", "mean"),
        )
        merged = page_df.merge(prev, on="page", how="inner")
        output["declining_pages"] = merged[
            (merged["clicks"] < merged["clicks_previous"]) | (merged["position"] > merged["position_previous"] + 1)
        ].sort_values("impressions", ascending=False)

    return output


def cluster_content_ideas(df: pd.DataFrame, min_impressions: int = 20) -> str:
    source = _empty_if_missing(df, ["query", "impressions", "clicks", "position"])
    if source.empty:
        return "# Content Ideas\n\nNo query data available.\n"

    source = source[source["impressions"] >= min_impressions].copy()
    if source.empty:
        return "# Content Ideas\n\nNo queries met the impression threshold.\n"

    cluster_rules = {
        "SaaS Landing Page CRO": ["landing page", "conversion", "cro", "demo"],
        "SaaS Cold Email": ["cold email", "outreach", "email sequence", "reply rate"],
        "Paid Ads for SaaS": ["google ads", "meta ads", "paid ads", "facebook ads"],
        "SaaS GTM Strategy": ["gtm", "go to market", "marketing plan", "strategy"],
        "LinkedIn Outreach": ["linkedin", "prospecting", "connection request"],
        "SEO for SaaS": ["seo", "organic", "keyword", "search"],
    }

    clusters: dict[str, list[dict]] = defaultdict(list)
    for row in source.sort_values("impressions", ascending=False).to_dict("records"):
        query = str(row["query"]).lower()
        matched = False
        for cluster, terms in cluster_rules.items():
            if any(term in query for term in terms):
                clusters[cluster].append(row)
                matched = True
                break
        if not matched:
            token = " ".join(query.split()[:3]).title() or "Other"
            clusters[f"Other: {token}"].append(row)

    lines = ["# Content Ideas", ""]
    for cluster, rows in sorted(clusters.items(), key=lambda item: sum(r["impressions"] for r in item[1]), reverse=True):
        total_impressions = int(sum(row["impressions"] for row in rows))
        total_clicks = int(sum(row["clicks"] for row in rows))
        avg_position = sum(row["position"] for row in rows) / len(rows)
        lines.extend(
            [
                f"## {cluster}",
                "",
                f"- Total impressions: {total_impressions}",
                f"- Total clicks: {total_clicks}",
                f"- Average position: {avg_position:.1f}",
                "- Suggested angle: build or improve content around the queries below, then link to the closest money page.",
                "",
                "| Query | Impressions | Clicks | Position |",
                "|---|---:|---:|---:|",
            ]
        )
        for row in rows[:12]:
            lines.append(f"| {row['query']} | {int(row['impressions'])} | {int(row['clicks'])} | {float(row['position']):.1f} |")
        lines.append("")

    return "\n".join(lines)
