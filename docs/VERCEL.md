# Deployment and observability

The checkout is linked to the existing **portfolio** project in **Ronny's projects** (`ronnys-projects-3b4c3a7a`). The project already connects to `rhaberer/rhaberer.github.io`, production branch `main`.

- Production domain: https://ronnyhaberer.de
- Dashboard: https://vercel.com/ronnys-projects-3b4c3a7a/portfolio
- Framework: Next.js
- Node: 24.x
- Install: `npm ci`
- Build: `npm run build`
- Output directory: framework default

The local source is deployed through the CLI; changes remain uncommitted until reviewed. Future Git-triggered deployment requires committing and pushing this application to `main`. The original GitHub Pages site does not run Next.js server features; use Vercel for the new application.

## Agent setup

Official setup guide: https://vercel.com/get-started.md

Vercel CLI 65.11.0 is installed in `~/.local/bin`; CLI login is authenticated as `rhaberer`. The official Vercel agent plugin is installed for Codex in user scope. Its manifest declares the shared remote MCP endpoint `https://mcp.vercel.com`. The connected Vercel tools passed documentation-search and read-only account/project checks. Explicit team-scoped mutation through that connector returned 403; the authenticated CLI with the verified team scope is used for project configuration and deployment. No duplicate MCP entry was added.

If `vercel` is absent from a new terminal's path, add `~/.local/bin` to that terminal's PATH. No unrelated shell settings were changed.

## Public environment flags

Configured in Production and Preview:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://ronnyhaberer.de` |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `true` |
| `NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS` | `true` |
| `NEXT_PUBLIC_ENABLE_CUSTOM_EVENTS` | `false` |

These values are public configuration. No telemetry credentials are needed in the app. Analytics removes query strings and URL fragments before submission. Optional custom events contain only fixed project/category/finish names and remain off by default. The SDKs do not collect arbitrary form input in this application.

## What to monitor

1. **Web Analytics**: page visits and project interest. Web Analytics was already enabled on this Vercel project. Visit the deployed site to begin collecting new traffic.
2. **Speed Insights**: the SDK is mounted in the root layout. Use the free tier for Real Experience Score. The current free tier starts collecting when the package is installed, with no paid project upgrade. Free collection limits can pause data collection while the site remains online. Detailed Core Web Vitals breakdowns require Plus; no Plus or Pro upgrade was made.
3. **Runtime logs and session traces**: `@vercel/otel` registers the application. Most pages are statically generated, so cached page delivery will not create a new application execution span. `/api/health` is dynamic and emits a `portfolio.health` span on every request; use this to verify server tracing.

```sh
vercel curl --trace /api/health
# The CLI returns a request ID and an exact follow-up command:
vercel traces get <request-id>
```

A trace may take a few seconds to appear. Session tracing is available on all plans. You can also enable a tracing session from the Vercel Toolbar on a preview deployment, then open its traces in Logs. Always-on tracing and external drains are separate features; none were enabled by this migration.

## Deploy / rollback

```sh
vercel deploy --prod --yes
```

Use `vercel curl` for protected previews; preserve deployment protection. Review deployment status and verify `/`, a project route, `/api/health`, redirects, and media. Use the dashboard's previous deployment or `vercel rollback` if needed.

## Documentation checked

- https://vercel.com/docs/analytics/quickstart
- https://vercel.com/docs/speed-insights/limits-and-pricing
- https://vercel.com/docs/tracing/instrumentation
- https://vercel.com/docs/tracing/session-tracing

## Verified live trace

A production request to `/api/health` returned HTTP 200 and a resolved trace with 15 spans, including the custom `portfolio.health` span. The trace is available at:

https://vercel.com/ronnys-projects-3b4c3a7a/portfolio/logs/traces/6128260ed8004a37838891501b344f4d

Both Web Analytics and Speed Insights script endpoints returned HTTP 200. The original credential-bearing `/assets/index-v2ilsv_b.js` returned HTTP 404 on the new production site. Dashboard metrics still require actual visits and ingestion time.
