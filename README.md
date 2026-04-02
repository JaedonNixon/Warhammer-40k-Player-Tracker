# public/

Static assets served by CRA's development server and included in the production build. Everything in this folder is copied as-is to the build output (it is **not** processed by Webpack).

## Files

| File | Purpose |
|------|---------|
| `index.html` | The single HTML shell for the SPA. Loads Google Fonts (Cinzel + Barlow), sets `theme-color` to `#0a0a0a`, and contains the `<div id="root">` mount point. |
| `manifest.json` | PWA manifest (icons, display mode, start URL). Default CRA template — not heavily customized. |
| `robots.txt` | Default permissive robots policy (`Disallow:` nothing). |
| `favicon.ico` | Browser tab icon (multi-size ICO: 64/32/24/16px). |
| `logo192.png` | Apple touch icon / PWA icon (192×192). |
| `logo512.png` | Large PWA icon (512×512). |

## Directories

### `images/factions/`

Contains 34 faction background images used on the Factions page and player profiles. File formats include `.jpg`, `.png`, `.webp`, and `.avif`. Each file follows the naming convention `<faction-slug>-bg.<ext>` (e.g., `necrons-bg.png`, `space-wolves-bg.jpg`).

These filenames are referenced by `src/utils/factionBackgrounds.ts`, which maps faction display names to their corresponding image paths.
