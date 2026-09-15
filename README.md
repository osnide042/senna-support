# Senna Support Website

Static support site for Senna Antivirus.

## Features
- Senna branding + icon favicon
- Inspiration photo on the front page (same as in-app Info)
- Live chat widget (online Mon–Fri 09:00–17:00 UK)
- After hours: chat collects a message and opens email
- Contact form via mailto

## Before going live
1. Edit `chat.js` → set `SUPPORT_EMAIL` to your real address
2. Edit `index.html` mailto links to the same address
3. Optional: replace the demo chat replies with a real provider (Crisp, Tawk.to, Intercom)

## Run locally
```bash
# from this folder
python -m http.server 8080
```
Open http://localhost:8080

## Deploy
Upload the whole `SennaSupportSite` folder to any static host:
Netlify, Cloudflare Pages, GitHub Pages, Vercel, or any web server.
