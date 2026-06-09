# Zerno — craft coffee shop

A bilingual (UA/EN) one-page demo for a fictional specialty coffee shop. Built as a fast, static site with a client-friendly admin panel — no frameworks, no build step.

**Live demo:** [lyr1c1.github.io/Zerno](https://lyr1c1.github.io/Zerno/)  
**Admin:** [lyr1c1.github.io/Zerno/admin](https://lyr1c1.github.io/Zerno/admin/)

## About the site

Zerno is a portfolio-ready landing page for a cozy craft café. It focuses on atmosphere, menu, social proof, and a clear call to action — table booking via a contact form.

**Sections:** Hero · About & features · Menu (tabs) · Gallery (lightbox) · Reviews (slider) · Contacts (form + Google Maps) · Footer

**Highlights:**
- Responsive layout (mobile-first, burger menu on small screens)
- Ukrainian / English language switch
- Scroll reveal animations (lightweight, GPU-friendly)
- Content-driven sections loaded from JSON
- [Decap CMS](https://decapcms.org/) admin for non-technical edits
- Hosted free on GitHub Pages

**Stack:** HTML · CSS · vanilla JavaScript (ES modules) · JSON content · Decap CMS · GitHub Actions

## Project structure

```
index.html          # page markup
css/                # styles (desktop, tablet, mobile, animations)
js/
  main.js           # bootstrap, i18n, form, nav
  content.js        # JSON loader
  render/           # menu, gallery, reviews, contacts
  i18n/             # UI strings (nav, form, hero, about)
content/            # editable content (menu, gallery, reviews, contacts)
admin/              # Decap CMS (index.html + config.yml)
img/                # images and uploads/
```

## Local preview

Do not open the site as `file://` — ES modules and `fetch` require an HTTP server.

```bash
python -m http.server 8080
# or
npx serve .
```

Open [http://localhost:8080](http://localhost:8080)

## Deploy (GitHub Pages)

1. Push the `main` branch to GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source** → **GitHub Actions**.
3. The workflow in `.github/workflows/pages.yml` publishes the site on each push.

## Content admin (Decap CMS)

Clients can edit **menu, gallery, reviews, and contacts** in the admin. Changes are saved to `content/*.json` in the repo; the live site updates after deploy (~1–2 min).

New images upload to `img/uploads/`.

### Local editing (no GitHub login)

Run two terminals:

```bash
npx decap-server
python -m http.server 8080
```

Open [http://localhost:8080/admin/](http://localhost:8080/admin/) — `local_backend: true` in `admin/config.yml` skips auth locally.

### Production (GitHub login)

GitHub Pages needs a small OAuth proxy for Decap:

1. Deploy [ublabs/netlify-cms-oauth](https://github.com/ublabs/netlify-cms-oauth) to Vercel.
2. Create a **GitHub OAuth App**:
   - Homepage URL: `https://lyr1c1.github.io/Zerno/`
   - Callback URL: `https://<your-proxy>.vercel.app/callback`
3. Set Vercel env vars: `OAUTH_GITHUB_CLIENT_ID`, `OAUTH_GITHUB_CLIENT_SECRET`, then **Redeploy**.
4. Set `base_url` in `admin/config.yml` to your proxy URL (without `/callback`).
5. The GitHub account used to log in needs **write** access to the repo.

## Part of a site pipeline

This repository is one output of a **repeatable site pipeline**: a fixed template (layout, components, CMS wiring, deploy) that gets customized per client — brand, copy, photos, and contact details. The goal is to ship similar one-page business sites quickly, with a professional look and an admin panel the client can actually use, without rebuilding from scratch each time.
