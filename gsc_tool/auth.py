from __future__ import annotations

import json
import logging
import os
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

LOGGER = logging.getLogger(__name__)

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
TOKEN_PATH = Path("token.json")


class AuthConfigError(RuntimeError):
    """Raised when OAuth configuration is incomplete."""


def load_env() -> None:
    load_dotenv()


def get_oauth_client_config() -> dict[str, Any]:
    load_env()
    client_id = os.getenv("GOOGLE_CLIENT_ID")
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET")

    if not client_id or not client_secret:
        raise AuthConfigError(
            "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET. Copy .env.example to .env and fill both values."
        )

    return {
        "installed": {
            "client_id": client_id,
            "client_secret": client_secret,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": ["http://localhost"],
        }
    }


def _save_token(credentials: Credentials, token_path: Path = TOKEN_PATH) -> None:
    token_path.write_text(credentials.to_json(), encoding="utf-8")
    LOGGER.info("Saved OAuth token to %s", token_path)


def _load_token(token_path: Path = TOKEN_PATH) -> Credentials | None:
    if not token_path.exists():
        return None
    try:
        return Credentials.from_authorized_user_info(json.loads(token_path.read_text(encoding="utf-8")), SCOPES)
    except Exception as exc:
        LOGGER.warning("Could not read existing token file: %s", exc)
        return None


def get_credentials(force_login: bool = False) -> Credentials:
    credentials = None if force_login else _load_token()

    if credentials and credentials.expired and credentials.refresh_token:
        LOGGER.info("Refreshing expired OAuth token")
        credentials.refresh(Request())
        _save_token(credentials)
        return credentials

    if credentials and credentials.valid:
        return credentials

    LOGGER.info("Starting browser OAuth login flow")
    flow = InstalledAppFlow.from_client_config(get_oauth_client_config(), SCOPES)
    credentials = flow.run_local_server(port=0, prompt="consent")
    _save_token(credentials)
    return credentials
