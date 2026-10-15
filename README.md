# Mesud Amin — Personal Developer Portfolio

A pure **100% static frontend** implementation of the approved **Google Stitch UI/UX design** for Mesud Amin's developer portfolio. Built with semantic **HTML5**, **Vanilla CSS3**, and **Vanilla JavaScript** without requiring any backend server, npm packages, or build tools.

---

## 🎯 Pure Frontend (Zero Server Needed)

You do **not** need a server to run, edit, or deploy this project:
- **Direct Local Preview**: Double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.
- **Static Hosting**: Ready to deploy directly to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any static host.
- **Zero Build Step**: No `npm install`, no `node`, no dependencies required.

---

## 📁 Clean & Easy-to-Edit File Structure

```
stitch_mesud_amin_developer_portfolio/
│
├── index.html                  # Main semantic HTML5 file (ultra-fast, SEO & A11y optimized)
│
├── css/
│   └── styles.css              # Master Vanilla CSS with Table of Contents, tokens, and content-visibility
│
├── js/
│   └── main.js                 # Vanilla JavaScript with Project Configuration at the top
│
├── assets/
│   └── images/
│       ├── aurora-preview.jpg  # Aurora Task Engine screenshot
│       ├── mesud-portrait.jpg  # Monochrome developer portrait
│       └── verve-preview.jpg   # Verve Studio Agency screenshot
│
├── .gitignore                  # Development git ignore rules
└── README.md                   # Documentation & quick editing guide
```

---

## ✏️ How to Easily Edit & Fix Content

### 1. Changing Your Name, Title, or Email
- **Name & Title**: Open [`index.html`](file:///c:/Users/User/OneDrive/Pictures/asset/stitch_mesud_amin_developer_portfolio%20(1)/index.html) and search for `Mesud Amin` in:
  - Header (`line 41`)
  - Hero Section (`line 120`)
  - About Section (`line 247`)
  - Footer (`line 440`)
- **Email**: Search for `contact@mesudamin.dev` in [`index.html`](file:///c:/Users/User/OneDrive/Pictures/asset/stitch_mesud_amin_developer_portfolio%20(1)/index.html) and [`js/main.js`](file:///c:/Users/User/OneDrive/Pictures/asset/stitch_mesud_amin_developer_portfolio%20(1)/js/main.js).

### 2. Adding or Editing Projects
- **In HTML**: Go to `<!-- 03. SECTION 01 // SELECTED WORK -->` in [`index.html`](file:///c:/Users/User/OneDrive/Pictures/asset/stitch_mesud_amin_developer_portfolio%20(1)/index.html).
- **In JavaScript (Modal Popup)**: Open [`js/main.js`](file:///c:/Users/User/OneDrive/Pictures/asset/stitch_mesud_amin_developer_portfolio%20(1)/js/main.js) and edit the `PROJECT_DATA` object right at the top (lines 18–48). You can change project titles, descriptions, screenshots, tech tags, and live URLs.

### 3. Updating Skills
- Go to `<!-- 05. SECTION 03 // TOOLKIT & CAPABILITIES -->` in [`index.html`](file:///c:/Users/User/OneDrive/Pictures/asset/stitch_mesud_amin_developer_portfolio%20(1)/index.html).
- Edit the 4 cards: *Frontend Architecture*, *Backend & REST APIs*, *Database Design*, or *Performance & A11y*.

### 4. Updating Colors & Design Tokens
- Open [`css/styles.css`](file:///c:/Users/User/OneDrive/Pictures/asset/stitch_mesud_amin_developer_portfolio%20(1)/css/styles.css).
- Under `01. DESIGN TOKENS` (`:root` lines 30–75), you can tweak:
  - `--canvas-bg`: Main off-white background (`#fafaf7`)
  - `--accent-lime`: Electric lime accent (`#c3f266`)
  - `--text-primary`: Near-black text (`#171717`)
  - `--font-display`: Headline font (Space Grotesk)
  - `--font-body`: Body copy font (Inter)
  - `--font-mono`: Code and label font (JetBrains Mono)

---

## 🧩 Implemented Sections

1. **Header & Sticky Navigation**: Rotating brand mark on hover, live availability pill, desktop links with scroll-spy, and mobile drawer.
2. **Hero Section**: Display headline, subhead, dual CTAs, metric counters, and HUD Inspector Card.
3. **01 // Selected Work**: Aurora Task Engine and Verve Studio Agency cards with browser mockups, tags, and interactive architecture quickview modal.
4. **02 // About & Focus**: Portrait with status pill, craftsmanship bio, white tech stack chips, and social presence links.
5. **03 // Toolkit & Capabilities**: 4 modular engineering capability cards.
6. **04 // Development Process**: 4 numbered lifecycle stages (`01` to `04`).
7. **05 // Services**: 3 value-delivery cards (*Responsive Websites*, *Frontend Implementation*, *Web Application MVPs*).
8. **06 // Contact**: Direct email card and client-side contact form with mail client launch and message copy buttons.
9. **07 // Footer**: Bold statement, directory links, social links, location indicator, and copyright.
10. **Utilities**: Project modal dialog and toast notification system.
