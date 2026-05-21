from __future__ import annotations

from datetime import datetime
from pathlib import Path

import pandas as pd

EXPORT_DIR = Path("exports")


def ensure_export_dir() -> Path:
    EXPORT_DIR.mkdir(parents=True, exist_ok=True)
    return EXPORT_DIR


def dated_filename(prefix: str, extension: str) -> Path:
    ensure_export_dir()
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return EXPORT_DIR / f"{prefix}_{stamp}.{extension}"


def export_dataframe(df: pd.DataFrame, prefix: str, output: str = "csv") -> Path:
    output = output.lower()
    if output not in {"csv", "xlsx", "json"}:
        raise ValueError("output must be one of: csv, xlsx, json")

    path = dated_filename(prefix, output)
    if output == "csv":
        df.to_csv(path, index=False)
    elif output == "xlsx":
        df.to_excel(path, index=False)
    else:
        df.to_json(path, orient="records", indent=2)
    return path


def export_markdown(content: str, filename: str = "content_ideas.md") -> Path:
    ensure_export_dir()
    path = EXPORT_DIR / filename
    path.write_text(content, encoding="utf-8")
    return path
