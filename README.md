# Eric Bartos — Personal Site

Static personal site built with [Astro](https://astro.build/), configured for GitHub Pages deployment.

## Structure

```
src/
  layouts/BaseLayout.astro    # Shared header/footer layout
  pages/
    index.astro               # Home page
    resume.astro              # Resume (rendered from JSON)
    blog/
      index.astro             # Bartos Lab Logs index
      [...slug].astro         # Individual blog post template
  content/blog/               # Markdown blog posts
  data/resume.json            # Resume data (local copy)
  styles/global.css           # Site-wide styles (light/dark mode)
public/
  favicon.svg                 # EB favicon
```

## Resume Data

The resume source of truth is:

```
/mnt/rackshack/wish/workspace/resume/eric-bartos.resume.json
```

A copy lives at `src/data/resume.json` for build-time import. Update the copy when the source changes.

## Local Development

> **Note:** This project lives on a CIFS mount that does not support symlinks.
> `npm install` must run from a local filesystem. Use the helper below or
> copy the project to `/tmp` before installing.

```sh
# Quick build from a local tmpdir
WORK=/tmp/eric-bartos-site-build
rm -rf "$WORK"
rsync -a --exclude node_modules --exclude dist ./ "$WORK/"
cd "$WORK"
npm install
npm run dev       # Dev server at http://localhost:4321
npm run build     # Static output to dist/
cp -r dist /mnt/rackshack/projects/eric-bartos-site/dist
```

If working on a filesystem that supports symlinks, standard commands work directly:

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # Output: dist/
npm run preview   # Preview the built site
```

## Deployment

Configured for static export (`output: 'static'` in `astro.config.mjs`).
The `site` and `base` values are env-driven for deployment:

- default local/custom-domain fallback: `https://bartos.cloud`
- GitHub Pages build override: `ASTRO_SITE` + `ASTRO_BASE`

A GitHub Pages workflow lives at `.github/workflows/deploy-pages.yml`.
It automatically builds with the correct project-repo base path when published under a temporary `https://<account>.github.io/<repo>` URL, while keeping the future custom-domain move simple.

The `dist/` directory remains ready to serve via GitHub Pages or any other static host.

## Adding Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "Post Title"
date: 2026-04-08
description: "Short description for the index."
---

Post content here.
```

The blog index and individual post pages are generated automatically at build time.
