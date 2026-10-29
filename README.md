# Instant Broadcast — CTWA landing page (v3)

WhatsApp-ads ("Click-to-WhatsApp") landing page for Instant Broadcast, deployed as a static site to
Cloudflare Pages at https://free-trial.instantbroadcast.in/

## Structure
- `index.html` — main landing page
- `thank-you.html` — post-lead thank-you page (fires Meta Pixel Lead + GTM generate_lead once per lead)
- `NumberPopup.dc.html`, `StoryReel.dc.html`, `StickyBar.dc.html` — page components (loaded at runtime by `support.js`)
- `analytics.js` — Clarity + GTM-WCGZZNWJ init, WhatsApp-click tracking, lead beacon to instantbroadcast.in
- `support.js` — the dc-runtime that renders the `.dc.html` component files
- `assets/` — all images, referenced by content hash

## Integrations wired in
- Meta Pixel `1191549192775541` — PageView on load, Lead once per lead (on thank-you.html)
- Google Tag Manager `GTM-WCGZZNWJ` (same container as instantbroadcast.in — carries GA4 `G-5SWQ7MXFLG`)
- Microsoft Clarity `yd20prc2yj`
- Lead POST to `https://instantbroadcast.in/api/leads/special-offer` (same endpoint/shape as the main site; `source: "ctwa_landing_v3"`)
- Background beacon to `https://instantbroadcast.in/?utm_source=facebook&utm_medium=cpc&utm_campaign=claude-domain-landing-page` on successful lead

## Deploy
Static site, no build step. Cloudflare Pages: set build command to none / "Deploy without a build", output directory `/`. Every push to `main` auto-deploys.
