from __future__ import annotations

import logging
import os
from datetime import date, timedelta
from typing import Annotated

import pandas as pd
import typer
from dotenv import load_dotenv
from rich.console import Console
from rich.table import Table

from analyzers import OpportunityConfig, analyze_pages, cluster_content_ideas, find_keyword_opportunities
from auth import AuthConfigError, get_credentials
from exporters import export_dataframe, export_markdown
from search_console import DEFAULT_SITE_URL, build_service, fetch_search_analytics, get_date_range, has_site_access, list_sites, normalize_site_url

app = typer.Typer(help="Local Google Search Console SEO intelligence CLI.")
console = Console()


def setup_logging(verbose: bool = False) -> None:
    logging.basicConfig(
        level=logging.INFO if verbose else logging.WARNING,
        format="%(levelname)s: %(message)s",
    )


def get_site_url() -> str:
    load_dotenv()
    return normalize_site_url(os.getenv("GSC_SITE_URL", DEFAULT_SITE_URL))


def get_service(force_login: bool = False):
    credentials = get_credentials(force_login=force_login)
    return build_service(credentials)


def parse_dimensions(dimensions: str) -> list[str]:
    parsed = [dimension.strip() for dimension in dimensions.split(",") if dimension.strip()]
    if not parsed:
        raise typer.BadParameter("Provide at least one dimension, e.g. query,page")
    return parsed


def fetch_period(service, site_url: str, days: int, dimensions: list[str], previous: bool = False) -> pd.DataFrame:
    if previous:
        previous_end = date.today() - timedelta(days=days + 2)
        start_date, end_date = get_date_range(days=days, end_date=previous_end)
    else:
        start_date, end_date = get_date_range(days=days)
    console.print(f"Fetching {site_url} from {start_date} to {end_date} with dimensions: {', '.join(dimensions)}")
    return fetch_search_analytics(service, site_url, start_date, end_date, dimensions)


@app.command()
def test(
    force_login: Annotated[bool, typer.Option("--force-login", help="Ignore token.json and run OAuth again.")] = False,
    verbose: Annotated[bool, typer.Option("--verbose", "-v")] = False,
) -> None:
    """Authenticate, list properties, and confirm site access."""
    setup_logging(verbose)
    site_url = get_site_url()
    try:
        service = get_service(force_login=force_login)
        sites = list_sites(service)
    except AuthConfigError as exc:
        console.print(f"[red]{exc}[/]")
        raise typer.Exit(1)

    table = Table(title="Google Search Console Properties")
    table.add_column("Property")
    table.add_column("Permission")
    for site in sites:
        table.add_row(site.get("siteUrl", ""), site.get("permissionLevel", ""))
    console.print(table)

    if has_site_access(service, site_url):
        console.print(f"[green]Access confirmed:[/] {site_url}")
    else:
        console.print(f"[red]Access not found:[/] {site_url}")
        raise typer.Exit(1)


@app.command()
def export(
    days: Annotated[int, typer.Option("--days", help="Number of days to export.")] = 28,
    dimensions: Annotated[str, typer.Option("--dimensions", help="Comma-separated GSC dimensions.")] = "query,page",
    output: Annotated[str, typer.Option("--output", help="csv, xlsx, or json.")] = "csv",
    verbose: Annotated[bool, typer.Option("--verbose", "-v")] = False,
) -> None:
    """Export raw Search Analytics rows."""
    setup_logging(verbose)
    service = get_service()
    df = fetch_period(service, get_site_url(), days, parse_dimensions(dimensions))
    path = export_dataframe(df, "gsc_raw", output)
    console.print(f"[green]Exported {len(df):,} rows:[/] {path}")


@app.command()
def opportunities(
    days: Annotated[int, typer.Option("--days")] = 28,
    min_impressions: Annotated[int, typer.Option("--min-impressions")] = 50,
    low_ctr: Annotated[float, typer.Option("--low-ctr", help="CTR threshold, e.g. 0.02 = 2%.")] = 0.02,
    output: Annotated[str, typer.Option("--output")] = "csv",
    verbose: Annotated[bool, typer.Option("--verbose", "-v")] = False,
) -> None:
    """Find keyword opportunities and declines."""
    setup_logging(verbose)
    service = get_service()
    dimensions = ["query", "page"]
    current = fetch_period(service, get_site_url(), days, dimensions)
    previous = fetch_period(service, get_site_url(), days, dimensions, previous=True)
    config = OpportunityConfig(min_impressions=min_impressions, low_ctr=low_ctr)
    result = find_keyword_opportunities(current, previous, config)
    path = export_dataframe(result, "opportunities", output)
    console.print(f"[green]Exported {len(result):,} opportunities:[/] {path}")


@app.command()
def ideas(
    days: Annotated[int, typer.Option("--days")] = 90,
    min_impressions: Annotated[int, typer.Option("--min-impressions")] = 20,
    verbose: Annotated[bool, typer.Option("--verbose", "-v")] = False,
) -> None:
    """Cluster query patterns into content ideas."""
    setup_logging(verbose)
    service = get_service()
    df = fetch_period(service, get_site_url(), days, ["query"])
    report = cluster_content_ideas(df, min_impressions=min_impressions)
    path = export_markdown(report, "content_ideas.md")
    console.print(f"[green]Exported content ideas:[/] {path}")


@app.command()
def pages(
    days: Annotated[int, typer.Option("--days")] = 28,
    min_impressions: Annotated[int, typer.Option("--min-impressions")] = 50,
    output: Annotated[str, typer.Option("--output")] = "csv",
    verbose: Annotated[bool, typer.Option("--verbose", "-v")] = False,
) -> None:
    """Analyze page-level SEO performance."""
    setup_logging(verbose)
    service = get_service()
    dimensions = ["page"]
    current = fetch_period(service, get_site_url(), days, dimensions)
    previous = fetch_period(service, get_site_url(), days, dimensions, previous=True)
    reports = analyze_pages(current, previous, min_impressions=min_impressions)
    if not reports:
        console.print("[yellow]No page data found.[/]")
        raise typer.Exit(0)
    for name, df in reports.items():
        path = export_dataframe(df, f"pages_{name}", output)
        console.print(f"[green]Exported {name} ({len(df):,} rows):[/] {path}")


if __name__ == "__main__":
    app()
