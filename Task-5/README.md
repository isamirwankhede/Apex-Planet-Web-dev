# 📝 INKWELL — Dark Theme Blog Website

> A professional, responsive blog website built with pure **HTML, CSS & JavaScript** as part of a Web Development Final Project (Task 5 — Final Project and Optimization).

---

## 📸 Project Overview

INKWELL is a fully functional dark-themed blog website focused on web development content. It features real article links from trusted sources like **freeCodeCamp** and **CSS-Tricks**, and is built entirely without any frameworks or libraries.

---

## 📁 File Structure

```
inkwell-blog/
│
├── index.html       → Main HTML structure & content
├── style.css        → All styling, dark theme & responsive design
├── script.js        → All interactivity & JavaScript features
└── README.md        → Project documentation (this file)
```

---

## ✨ Features

### 🧩 Sections
- **Navbar** — Sticky navigation with smooth scroll & mobile hamburger menu
- **Hero** — Full-screen landing with animated headline and stats
- **Featured Post** — Editor's pick with author info and real article link
- **Posts Grid** — 6 blog cards with category filter and live search
- **Topics / Categories** — 8 topic cards for easy browsing
- **Newsletter** — Email subscription form with validation & success state
- **Footer** — Multi-column footer with links and social icons
- **Back to Top** — Floating button that appears on scroll

### ⚡ JavaScript Features
| Feature | Description |
|---|---|
| 🔍 Live Search | Filters posts in real-time as you type |
| 🏷️ Category Filter | Filter posts by JavaScript, CSS, Design, etc. |
| 📱 Mobile Menu | Hamburger menu with animated open/close icon |
| 📧 Form Validation | Email format check + name required validation |
| ✅ Success State | Newsletter form switches to success message |
| 🎞️ Scroll Reveal | Cards animate in as you scroll down the page |
| ⬆️ Back to Top | Smooth scroll button appears after 400px scroll |
| 🔗 Active Nav Link | Highlights current section in navbar while scrolling |
| 🖼️ Lazy Loading | Images load only when they enter the viewport |
| 🌐 Browser Check | Fallback applied if browser lacks modern API support |

---

## 🔗 Real Article Links Used

| Post Title | Source |
|---|---|
| How AI is Changing the Way We Code | freeCodeCamp |
| JavaScript Promises, Async/Await Explained | freeCodeCamp |
| Quick! What's the Difference Between Flexbox and Grid? | CSS-Tricks |
| What is a Component Library? | freeCodeCamp |
| How to Not Be Overwhelmed by AI | freeCodeCamp |
| What Does It Mean to Be a Senior Developer | freeCodeCamp |
| Build a RESTful API Using Node, Express & MongoDB | freeCodeCamp |

---

## 🎨 Design Decisions

| Property | Choice |
|---|---|
| **Theme** | Dark (`#0c0c0f` background) |
| **Accent Color** | Gold (`#e8c96e`) |
| **Heading Font** | Playfair Display (serif) |
| **Body Font** | Epilogue (sans-serif) |
| **Layout** | CSS Grid + Flexbox |
| **Animations** | CSS keyframes + IntersectionObserver |

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `> 992px` | Full desktop layout — 2-column featured, 3-column grid |
| `≤ 992px` | Tablet — single column featured, 2-column grid |
| `≤ 768px` | Mobile — hamburger menu, single column grid |
| `≤ 480px` | Small mobile — compact padding, stacked layout |

---

## ⚙️ Task Objectives Covered

### ✅ 1. Build a Full Web Application
- Complete multi-section blog with all pages in a single HTML file
- Integrated HTML, CSS, and JavaScript working together
- Real external article links from trusted web dev sources

### ✅ 2. Optimize for Performance
- Lazy image loading via `IntersectionObserver` API
- CSS-only animations (no heavy animation libraries)
- Minimal external dependencies (only Google Fonts)
- Staggered scroll-reveal avoids layout thrashing

### ✅ 3. Cross-Browser Compatibility & Mobile Responsiveness
- Fully responsive across all screen sizes
- Compatibility check function in `script.js` applies fallbacks for:
  - Browsers without `IntersectionObserver` support
  - Browsers without CSS custom property (`var()`) support
- Tested on: Chrome, Firefox, Safari, and mobile browsers
- Semantic HTML for better accessibility

---

## 🚀 How to Run

1. Download all 3 files into the **same folder**:
   - `index.html`
   - `style.css`
   - `script.js`

2. Open `index.html` in any browser:
   - Double-click the file, **OR**
   - Right-click → *Open with* → Browser, **OR**
   - Use VS Code **Live Server** extension for hot reload

> ⚠️ All 3 files must be in the same folder or CSS/JS will not load.

---

## 🛠️ Built With

- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
- [Google Fonts](https://fonts.google.com/) — Playfair Display & Epilogue

---

## 📚 Learning Resources Used

- [MDN Web Docs](https://developer.mozilla.org/) — HTML, CSS & JS reference
- [freeCodeCamp](https://www.freecodecamp.org/news/) — Article content & tutorials
- [CSS-Tricks](https://css-tricks.com/) — CSS layout guides

---

## 👨‍💻 Project Info

| Detail | Info |
|---|---|
| **Task** | Task 5 — Final Project and Optimization |
| **Timeline** | 9 Days |
| **Objective** | Build a comprehensive web app with performance, responsiveness & compatibility |
| **Type** | Blog Website |
| **Stack** | Vanilla HTML + CSS + JavaScript |

---

*Made with ☕ and a lot of CSS variables.*