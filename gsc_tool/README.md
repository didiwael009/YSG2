# Google Search Console SEO Intelligence CLI

Local Python CLI for Google Search Console using OAuth Desktop authentication.

It uses a browser login flow, saves a local refresh token in `token.json`, and refreshes expired tokens automatically.

## Setup

```bash
cd gsc_tool
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env`:

```env
GOOGLE_CLIENT_ID=your-oauth-desktop-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-oauth-desktop-client-secret
GSC_SITE_URL=https://www.yoursaasgrowth.com/
```

Do not commit `.env` or `token.json`.

## Commands

### Test connection

```bash
python main.py test
```

This opens the browser OAuth flow, lists available Search Console properties, and confirms access to `GSC_SITE_URL`.

Force a fresh login:

```bash
python main.py test --force-login
```

### Export raw GSC data

```bash
python main.py export --days 28 --dimensions query,page --output csv
python main.py export --days 90
```

Exports:

```text
exports/gsc_raw_DATE.csv
```

Supported output formats:

```text
csv, xlsx, json
```

### Find keyword opportunities

```bash
python main.py opportunities
python main.py opportunities --days 90 --min-impressions 100 --low-ctr 0.015
```

Finds:

- keywords ranking position 4-15
- high-impression, low-CTR opportunities
- queries with impressions and zero clicks
- declining keywords vs the previous equivalent period

Exports:

```text
exports/opportunities_DATE.csv
```

### Generate content ideas

```bash
python main.py ideas
python main.py ideas --days 90 --min-impressions 20
```

Clusters query patterns into markdown content opportunities.

Exports:

```text
exports/content_ideas.md
```

### Analyze page performance

```bash
python main.py pages
python main.py pages --days 90
```

Exports separate reports for:

- best pages
- weak pages
- high-impression, low-CTR pages
- declining pages

## Files

- `main.py` - Typer CLI commands.
- `auth.py` - OAuth Desktop flow, token saving, token refresh.
- `search_console.py` - Google Search Console API client and paginated Search Analytics fetcher.
- `analyzers.py` - keyword, content idea, and page performance logic.
- `exporters.py` - CSV/XLSX/JSON/Markdown exporters.

## Notes

- This tool uses OAuth Desktop authentication, not service accounts.
- The OAuth scope is read-only: `https://www.googleapis.com/auth/webmasters.readonly`.
- Search Analytics API data is delayed. By default, the tool ends exports two days before today.
- Pagination uses `rowLimit=25000` and `startRow`, so exports can handle 50,000+ rows.
