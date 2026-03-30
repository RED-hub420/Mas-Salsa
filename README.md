# Mas Salsa Demo Site

Static multi-page demo for **Mas Salsa Tex Mex Restaurant** designed for GitHub Pages.

## Pages
- `index.html` — homepage
- `menu.html` — full menu
- `order.html` — clickable pickup-only order ahead demo
- `events.html` — event landing page
- `contact.html` — about, contact, hours, and location

## Notes
- Built as a static site so it can deploy fast on GitHub Pages.
- Cart state is stored in `localStorage`.
- Order flow is a demo only. No payment or backend integration is wired yet.
- Menu structure and pricing were based on the current Toast menu at build time.

## Deploy to GitHub Pages
1. Create a GitHub repo.
2. Upload the contents of this folder to the repo root.
3. In GitHub, go to **Settings > Pages**.
4. Set source to **Deploy from a branch**.
5. Choose the `main` branch and `/root`.
6. Save.

If you want a stronger phase 2:
- swap in better interior and dining-room photos
- add a real online ordering backend
- wire events to a simple CMS or Google Sheet
- add structured menu item descriptions and modifiers
