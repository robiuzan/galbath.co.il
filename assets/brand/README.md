# Brand source art

Original logo boards as delivered. **Not** under `public/` on purpose — `public/` is
copied verbatim into the static export, and these three files are ~1 MB of raw JPEG
that the site never requests.

| File                | Board                                        | Derived into                |
| ------------------- | -------------------------------------------- | --------------------------- |
| `galbath_logo1.jpg` | light ink on a near-black field               | `public/galbath-logo-light.webp` (footer) |
| `galbath_logo2.jpg` | blue/red ink on white                         | `public/galbath-logo-dark.webp` (header)  |
| `galbath_logo3.jpg` | unused variant                                | —                           |

## How the shipped marks were made

Each board is opaque with ~40% padding, so neither drops onto a coloured surface as-is
(the footer sits on `#2123BC`). For each pixel the board background was un-composited to
recover straight alpha, classifying first by hue so the brand colours stay exact rather
than muddying at the edges: red where `r - b > 30` → `rgb(229,89,76)`, blue where
`b - r > 30` → `rgb(25,35,165)`, otherwise neutral (white on the dark board, blue on the
light one) with alpha from luminance. The result was then trimmed to the mark's bounding
box plus 4% breathing room and written as WebP.

`public/favicon.ico` (48px) and `public/apple-touch-icon.png` (180px) come from the red
"גל" glyphs inside `galbath_logo2.jpg` — same artwork as the supplied
`public/galbath_favicon.webp`, which is only 50×50 and too small for iOS.
