from __future__ import annotations

import logging
from datetime import date, timedelta
from typing import Iterable

import pandas as pd
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

LOGGER = logging.getLogger(__name__)

DEFAULT_SITE_URL = "https://www.yoursaasgrowth.com/"
ROW_LIMIT = 25_000


class SearchConsoleError(RuntimeError):
    """Raised when Search Console API calls fail."""


def build_service(credentials: Credentials):
    return build("searchconsole", "v1", credentials=credentials, cache_discovery=False)


def normalize_site_url(site_url: str) -> str:
    if site_url.startswith("sc-domain:"):
        return site_url
    return site_url if site_url.endswith("/") else f"{site_url}/"


def get_date_range(days: int, end_date: date | None = None) -> tuple[str, str]:
    if days < 1:
        raise ValueError("--days must be at least 1")
    end = end_date or (date.today() - timedelta(days=2))
    start = end - timedelta(days=days - 1)
    return start.isoformat(), end.isoformat()


def list_sites(service) -> list[dict]:
    try:
        return service.sites().list().execute().get("siteEntry", [])
    except HttpError as exc:
        raise SearchConsoleError(f"Could not list Search Console properties: {exc}") from exc


def has_site_access(service, site_url: str) -> bool:
    wanted = normalize_site_url(site_url)
    return any(site.get("siteUrl") == wanted for site in list_sites(service))


def fetch_search_analytics(
    service,
    site_url: str,
    start_date: str,
    end_date: str,
    dimensions: Iterable[str],
    row_limit: int = ROW_LIMIT,
) -> pd.DataFrame:
    site = normalize_site_url(site_url)
    dims = list(dimensions)
    rows: list[dict] = []
    start_row = 0

    while True:
        body = {
            "startDate": start_date,
            "endDate": end_date,
            "dimensions": dims,
            "rowLimit": row_limit,
            "startRow": start_row,
        }

        try:
            response = service.searchanalytics().query(siteUrl=site, body=body).execute()
        except HttpError as exc:
            raise SearchConsoleError(f"Search Analytics query failed for {site}: {exc}") from exc

        batch = response.get("rows", [])
        for row in batch:
            record = {dimension: value for dimension, value in zip(dims, row.get("keys", []))}
            record.update(
                {
                    "clicks": row.get("clicks", 0),
                    "impressions": row.get("impressions", 0),
                    "ctr": row.get("ctr", 0.0),
                    "position": row.get("position", 0.0),
                }
            )
            rows.append(record)

        LOGGER.info("Fetched %s rows from startRow=%s", len(batch), start_row)
        if len(batch) < row_limit:
            break
        start_row += row_limit

    return pd.DataFrame(rows)
