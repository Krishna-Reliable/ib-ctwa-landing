// Shared tracking include for the Instant Broadcast CTWA landing pages (index.html, thank-you.html).
// Mirrors instantbroadcast.in's own GTM + Clarity integration, and adds this page's lead + WhatsApp-click events.

// Microsoft Clarity (yd20prc2yj) — same project as instantbroadcast.in
(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "yd20prc2yj");

// Google Tag Manager (GTM-WCGZZNWJ) — same container as instantbroadcast.in (carries GA4 G-5SWQ7MXFLG and
// any Google Ads tags configured there). Add the matching <noscript> iframe right after <body> too.
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-WCGZZNWJ');

// Fire a WhatsApp-click event into GTM/GA4 whenever any wa.me link on this page is tapped
// (hero CTA, final CTA, thank-you page button, etc. — one listener covers all of them).
document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest ? e.target.closest('a[href*="wa.me"]') : null;
  if (!a) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'whatsapp_click', link_url: a.href });
}, true);

// Called by NumberPopup right after a successful lead POST. Pushes a generate_lead event into GTM/GA4
// (no phone number in it — GA4 disallows PII) and pings instantbroadcast.in's own UTM URL in the
// background, fire-and-forget, so this landing page's traffic/conversion is attributed there too.
window.ibFireLeadBeacon = function (source) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', lead_source: source || 'ctwa_landing_v3' });
  } catch (err) {}
  var beaconUrl = 'https://instantbroadcast.in/?utm_source=facebook&utm_medium=cpc&utm_campaign=claude-domain-landing-page';
  try {
    fetch(beaconUrl, { mode: 'no-cors', credentials: 'omit', keepalive: true }).catch(function () {});
  } catch (err) {
    try { new Image().src = beaconUrl; } catch (err2) {}
  }
};
