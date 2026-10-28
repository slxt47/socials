# slxt.org

A minimal, retro-styled personal portfolio and social hub with a beautiful dark theme and nostalgic window UI aesthetic.

## 🎨 Features

- **Retro Window Design** – Classic macOS window chrome with draggable titlebar
- **Dark Theme** – Carefully crafted dark mode with vignette and grain effects
- **Responsive Layout** – Works on desktop and mobile devices
- **Snowflake Animation** – Subtle animated snowflakes in the background
- **Social Links Hub** – Quick access to all your social media profiles
- **Smooth Interactions** – Draggable window, tooltips, and smooth transitions

## 🛠️ Tech Stack

- **HTML5** – Semantic structure
- **CSS3** – Grid, Flexbox, CSS Variables, animations
- **Vanilla JavaScript** – No frameworks, lightweight interactions
- **Self-hosted fonts** – Instrument Serif & JetBrains Mono (SIL Open Font License), no requests to Google

## 📦 What's Included

```
slxt.org/
├── index.html          # Main page
├── script/
│   ├── css/
│   │   ├── styles.css  # All styles (theme variables, animations)
│   │   └── fonts.css   # @font-face for the local fonts
│   └── js/
│       └── script.js   # Window dragging, year update, interactions
├── assets/             # Social icons, background & favicon
│   ├── *.svg           # Icon assets
│   ├── fonts/          # woff2 files (latin + latin-ext)
│   └── favicon.ico
└── README.md          # This file
```

## 🚀 Quick Start

### Option 1: Local Development

```bash
# Clone the repo
git clone https://github.com/slxt47/socials.git
cd socials

# Serve locally (Python 3)
python -m http.server 8000

# Or with Node.js
npx http-server

# Open http://localhost:8000
```

### Option 2: Deploy Directly

Upload all files to your web server or hosting provider (Vercel, Netlify, GitHub Pages, etc.).

## ✏️ Customization

### Change Your Social Links

Edit the social links in `index.html`:

```html
<a href="YOUR_URL_HERE" class="social-link" data-tooltip="Your Social">
  <img src="./assets/your-icon.svg" alt="" width="22" height="22" />
</a>
```

### Customize Colors & Fonts

Edit CSS variables at the top of `script/css/styles.css`:

```css
:root {
  --color-bg: #0a0a0a;
  --color-text: #e5e5e5;
  --color-accent: #ffffff;
  /* ... more variables */
}
```

### Add Your Own Info

Update the title and tagline in the HTML:

```html
<h1 class="title">YOUR<span class="title-dot">.</span>NAME</h1>
<p class="tagline">Your tagline here <span class="emote">:3</span></p>
```

## 🔄 Changes (October 2026)

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
