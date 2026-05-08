# Website for Custom BMS Project

Place this `website/` folder at the root of your repo (you already have it). This site expects the following asset filenames placed directly inside the `website/` folder (no subfolders required):

- `project display image.jpg` — OLED display screenshot used as the hero and gallery image
- `project back side image.jpg` — backside photo showing soldering/wiring
- `project-thumbnail.mp4` — demo video of the running project
- `schematic design.pdf` — KiCad schematic export PDF

How to preview:

1. Open `website/index.html` in a modern browser (double-click or `File → Open`).
2. If your browser blocks local video playback, serve the folder with a tiny HTTP server (Python):

```bash
# from the repository root
python -m http.server 8000
# then open http://localhost:8000/website/
```

Notes:
- The page uses a small, dependency-free IntersectionObserver animation system.
- Assets are loaded from the `website/` folder directly — filenames must match those listed above.
- Open `index.html` or serve the folder via a small HTTP server for best results.

Additional pages

- `firmware.html` — A deep-dive firmware walkthrough with code snippets and math (KaTeX rendered).
- `schematic.html` — Embedded PDF schematic viewer and download.

Client-side thumbnail optimization

The site includes a lightweight LQIP generator: the browser creates a tiny low-res preview of images and then loads the full-resolution image. This accelerates perceived load without server-side tooling. No build step is required.

GitHub Pages deployment notes

You can deploy this folder directly on GitHub Pages. For a production-ready deployment choose one of the following options:

1) Serve from `gh-pages` branch (recommended, simple): use the included GitHub Actions workflow to publish the contents of `website/` to the `gh-pages` branch automatically on push to `main`.

2) Serve from `/docs` folder: move the contents of `website/` into a top-level `docs/` folder and select `docs` in Pages settings.

3) Serve manually: upload built static files to any static host (Netlify, Vercel, S3) — no server-side code required.

Note: GitHub Pages can't directly serve a subfolder like `/website/` as the site root without using `gh-pages` or moving files into `docs/`.

Automated deploy (optional)

If you want automatic deploys, the workflow `.github/workflows/deploy.yml` (in the repo root) will publish the `website/` folder to the `gh-pages` branch using the `JamesIves/github-pages-deploy-action`. To enable automatic deployment:

- Push this repository to GitHub.
- Ensure `Actions` are allowed for your repo (default for standard repos).
- The action uses `GITHUB_TOKEN` automatically so no additional secret is required.

After the workflow runs, configure GitHub Pages to serve from the `gh-pages` branch (Settings → Pages → Branch: `gh-pages`). The site will be available at `https://<username>.github.io/<repo>/`.
