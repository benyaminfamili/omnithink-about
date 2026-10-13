# OmniThink — about.omnithink.io

Dedicated marketing/about site for OmniThink. Static HTML/CSS/JS, split out of
the `belvantis` repo's `omnithink/` pages so OmniThink has its own domain and
deploy pipeline, independent of the Belvantis site.

## Site map

| Path             | Purpose                                      |
| ---------------- | --------------------------------------------- |
| `/index.html`    | Full product page: hero, features, how it works, pricing summary, founders |
| `/pricing.html`  | Full cost-transparency breakdown              |
| `/privacy.html`  | Privacy policy (OmniThink is a Belvantis product — legal entity unchanged) |

## Founders

Three founder cards live in `index.html` under `#founders`, all filled in: Benyamin
(`founder-benyamin.jpg`), Nika Nikousokhan (`founder-nika.png`), and Shahab Afshar
(`founder-shahab.png`), each linking to their real LinkedIn profile. Photos are
square crops taken from their LinkedIn profile photos.

## Local preview

```bash
python3 -m http.server 8080
# then open http://127.0.0.1:8080/
```

## Deploy

GitHub Actions → Azure Static Web Apps (`.github/workflows/azure-static-web-apps.yml`),
same mechanism as the `belvantis` repo (`skip_app_build: true`, plain static files,
no build step). Push to `main` auto-deploys.

**Live infra** (see `docs/07-azure-deployment-guide.md` in the `omnithink` repo for
the full writeup):
- Azure Static Web App: `omnithink2-about-prod`, resource group `omnithink2`, Free tier
- Custom domain: `about.omnithink.io`, DNS-only CNAME at Cloudflare → the SWA's
  `defaultHostname`, validated via `az staticwebapp hostname set` (managed cert, no
  separate TXT record needed for a subdomain)
- GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN` is set from
  `az staticwebapp secrets list --name omnithink2-about-prod -g omnithink2`

This site makes no API calls, so it needed no backend, CORS, or Entra changes.
