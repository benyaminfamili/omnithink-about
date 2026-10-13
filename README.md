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

Three founder cards live in `index.html` under `#founders`: Benyamin (real LinkedIn
linked), Nika and Shahab (placeholder `.founder-link.pending` — swap the `href="#"`
for their LinkedIn URLs and drop in `founder-nika.jpg` / `founder-shahab.jpg` photos
when available; same fallback-initial pattern as Benyamin's card).

## Local preview

```bash
python3 -m http.server 8080
# then open http://127.0.0.1:8080/
```

## Deploy

GitHub Actions → Azure Static Web Apps (`.github/workflows/azure-static-web-apps.yml`),
same mechanism as the `belvantis` repo. Needs the `AZURE_STATIC_WEB_APPS_API_TOKEN`
repo secret once the Azure Static Web App resource exists — see the runbook handed
over in chat for exact `az` commands and the DNS CNAME target.
