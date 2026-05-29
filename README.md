# zquang2202.github.io

Personal homepage for **Quang Nguyen** — AI & Robotics Engineer.
A self-contained static site (plain HTML / CSS / JS, no build step) inspired by the
[minimal-light](https://github.com/yaoyao-liu/minimal-light) theme, with a dark/light
toggle and a gold-on-cream "Metal element" palette.

## Files
```
index.html              # the whole page (edit content here)
assets/css/style.css    # all styling + the color palette (CSS variables at the top)
assets/js/main.js       # dark/light toggle + footer year
assets/img/profile.svg  # placeholder avatar — replace with your photo
assets/img/favicon.svg  # browser tab icon
assets/img/pub/         # publication teaser images (see that folder's README)
```

## How to edit
Open `index.html` and look for `<!-- TODO -->` comments. Things to finish:

- **LinkedIn / X links** — replace the two `href="#"` in the sidebar `socials` block.
- **CV** — put your PDF at `assets/cv.pdf` and change the CV button's `href="#"` to `assets/cv.pdf`.
- **Profile photo** — your photo is at `assets/img/profile.jpg`; replace that file to change it
  (a square image looks best). The old `profile.svg` monogram is unused and can be deleted.
- **Honors & Awards** — fill in the `#awards` section (placeholder rows are there).
- **Academic Services** — fill in the `#services` section.
- **Bio / affiliation** — tweak the `#about` text and the sidebar `affiliation`.
- **Publication images** — drop teasers into `assets/img/pub/` (see its README).

## Change the colors
Edit the CSS variables at the top of `assets/css/style.css`:
`:root { ... }` controls light mode and `html[data-theme="dark"] { ... }` controls dark mode.
The main one is `--accent` (the gold).

## Preview locally
Just double-click `index.html` — it opens straight in the browser, no server needed.

## Deploy (GitHub Pages)
1. Commit and push to the `main` branch of `ZQuang2202/ZQuang2202.github.io`.
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`.
3. Your site goes live at <https://zquang2202.github.io/> within a minute or two.
   (The `.nojekyll` file tells GitHub Pages to serve the files as-is.)
