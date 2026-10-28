# slxt.org

My start page: a glass card you can **grab and throw** across a night sky with
**shooting stars** – socials in the first row, everything I built in the second.

- **Apple-style:** system fonts, light (dawn sky) and dark (night sky) follow the device,
  44 px+ tap targets, visible focus, reduced motion / transparency / more contrast respected.
- **Throwable card:** drag the card anywhere, release with momentum, it bounces off the edges
  (same physics as [cats.slxt.org](https://cats.slxt.org)). Double-click the card to bring it back.
  On phones (or when the card doesn't fit) it stays in place.
- **Shooting stars:** every few seconds one crosses the sky – tap the sky to send your own.
- **Own icons** for every project (one stroke style), brand icons for the socials.
- **No third parties:** no Google Fonts, no CDNs, no trackers.

## Structure

```
index.html            page + SVG symbols
assets/site.css       colors, layout, animations
assets/site.js        stars, shooting stars, drag & throw
assets/*.svg          social icons, favicon
assets/avatar-*.webp  Memoji
```

Run locally: `python3 -m http.server 8000`. After CSS/JS changes behind a cache, bump `?v=` in `index.html`.

## 🔄 Changes (October 2026)

- **Rebuilt:** Apple-style card, night sky with shooting stars, throwable card, new project row (disslxt, Command Center, Nexus, Webshop, LBS Eibiswald, Rechner, slxt.dev), own icons; the shop moved from the socials into the project row.

- Fonts are served from the site itself instead of Google Fonts (privacy, one less third party).
- Removed the unused 7.4 MB `background_old.jpg`.
- Footer text matches the live site again.
- Fixed the clone URL in this README.

## 📝 Meta Tags

Don't forget to update the Open Graph and meta tags for your domain:

```html
<meta property="og:title" content="Your Title">
<meta property="og:description" content="Your Description">
<meta property="og:url" content="https://your-domain.com">
<meta name="theme-color" content="#0a0a0a">
```

## 🎬 Features Explained

- **Draggable Window** – Click and drag the titlebar to move the window
- **Traffic Lights** – Visual element (non-functional, can be enabled)
- **Snowflakes** – Ambient animation, toggles based on season or preference
- **Status Indicator** – Shows "online" status in the titlebar
- **Responsive Grid** – Automatically adjusts on smaller screens

## 📄 License

Feel free to fork, modify, and use this for your own portfolio. Attribution appreciated but not required.

## 🤝 Contributing

Found a bug or have an improvement? Open an issue or submit a PR!

## 👋 About

Created with care by [Florian](https://github.com/slxt47). Made to be simple, fast, and fun.

---

**Visit:** [slxt.org](https://slxt.org)  
**GitHub:** [github.com/slxt47](https://github.com/slxt47)
