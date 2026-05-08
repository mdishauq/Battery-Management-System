# Battery Management System — Production Grade Website

A stunning, modern website showcasing the custom BMS project with professional design patterns and cutting-edge web technologies.

## 🎨 Design Features

- **Bento Grid Layout** — Modern, responsive card-based architecture
- **Glassmorphism** — Frosted glass effect with backdrop blur
- **Neon Accents** — Vibrant cyan/blue gradient highlights with glow effects
- **Scroll-Triggered Animations** — Smooth reveal animations as you scroll
- **Sticky Navigation** — Fixed header with smooth scroll highlights
- **Light Theme** — Clean, professional white and light blue color scheme
- **Smooth Scroll Behavior** — Native CSS scroll-behavior with Intersection Observer
- **Code Highlighting** — Syntax-highlighted C code snippets
- **Responsive Design** — Fully responsive on all devices

## 📁 File Structure

- `index.html` — Main production page with all sections
- `production.css` — Complete styling with animations and effects
- `production.js` — JavaScript for scroll animations and interactions
- `firmware.html` — Deep-dive firmware walkthrough
- `schematic.html` — Schematic viewer
- `script.js` — Shared utilities
- `project display image.jpg` — OLED display screenshot
- `project back side image.jpg` — PCB assembly photo
- `project-thumbnail.mp4` — Demo video
- `schematic design.pdf` — KiCad schematic

## 🚀 Features

### Sections
1. **Hero** — Dramatic intro with floating animation
2. **Architecture** — Bento grid showing system components
3. **Hardware** — Discrete analog circuit design details
4. **Firmware** — Code snippets with highlighting
5. **Gallery** — Video demo and image showcase
6. **Specs** — Technical specifications grid
7. **Schematic** — Embedded PDF viewer

### Interactions
- Scroll-triggered fade/slide animations
- Hover effects on cards and buttons
- Gallery lightbox for images
- Parallax hero image
- Active nav link highlighting
- Smooth scroll to sections
- Keyboard shortcuts (ESC to close lightbox)

## 🌐 Deployment

### Option 1: GitHub Pages with `gh-pages` branch
```bash
git add docs/ .github/workflows/
git commit -m "Add production website"
git push origin main
# GitHub Actions will automatically deploy to gh-pages
# Configure Settings → Pages → Branch: gh-pages
```

### Option 2: Local Preview
```bash
python -m http.server 8000
# Open http://localhost:8000/docs/
```

### Option 3: Any Static Host
- Netlify: Drag & drop the `docs/` folder
- Vercel: Connect repo, set root directory to `docs/`
- GitHub Pages: Point to `docs/` folder in settings

## 🎯 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with CSS backdrop-filter support

## 🛠️ Customization

### Colors
Edit `:root` variables in `production.css`:
```css
--neon-cyan: #00d4ff;
--neon-blue: #0099ff;
--accent: #0099cc;
```

### Animations
- Scroll reveal timing: `0.7s cubic-bezier(0.2, 0.9, 0.2, 1)`
- Float animation: `6s ease-in-out infinite`
- Pulse glow: `2s infinite`

### Content
Update section titles, descriptions, and add your own images/videos in:
- `<img src="...">` tags
- `<video>` elements
- `<embed>` for PDF

## 📊 Performance

- Smooth 60fps animations
- Optimized images with lazy loading
- Minimal JavaScript (no frameworks)
- CSS-only animations where possible
- Backdrop filter blur for modern browsers

## 📝 Notes

- Filenames with spaces are URL-encoded (e.g., `project%20display%20image.jpg`)
- For production, consider renaming assets to hyphenated names
- PDF viewer requires modern browser support for `<embed>`
- Video controls include play, pause, volume, fullscreen

## 🔗 Links

- [Demo Video](project-thumbnail.mp4)
- [Schematic PDF](schematic%20design.pdf)
- [Firmware Deep-Dive](firmware.html)
- [Schematic Viewer](schematic.html)

---

**Built with care** — A production-grade showcase of the Custom Battery Management System project.
