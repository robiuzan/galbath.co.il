# Before/after source photos

Originals as delivered. **Not** under `public/` on purpose — `public/` is copied verbatim
into the static export, and these are ~16 MB the site never requests.

The client's pairing is `Image_NNN` = **before**, `Image_NNN(2)` = **after**. Note the
inconsistent filenames (`Image_029 (2).webp` has a space, `Image_041(2).webp` does not),
which is one reason the shipped copies are renamed rather than served from here.

## What ships

`public/gallery/ba-<NN>-{before,after}.webp`, resized to max 800px wide (no upscaling) at
webp q78 — 800px covers the 3-column tile at 2x DPR. That takes the set from **7.13 MB to
0.20 MB**. The pair order and the Hebrew `subject` strings live in `lib/content.ts` as
`beforeAfterPairs`.

> **Do not regenerate the "after" images from the files in this folder.** The originals here
> still carry the generator watermark described below; the shipped copies in `public/gallery/`
> were cleaned afterwards and are now the source of truth for those frames. Re-running a
> resize over `Image_NNN(2).webp` would put every watermark straight back. The "before"
> frames are unedited and can safely be regenerated from here.

| Pair | before | after |
| ---- | ------ | ----- |
| 01 | `Image_001.webp` | `Image_001(2).webp` |
| 02 | `Image_018.webp` | `Image_018(2).webp` |
| 03 | `Image_029.webp` | `Image_029 (2).webp` |
| 04 | `Image_031.webp` | `Image_031 (2).webp` |
| 05 | `Image_032.webp` | `Image_032 (2).webp` |
| 06 | `Image_041.webp` | `Image_041(2).webp` |
| 07 | `Image_045.webp` | `Image_045(2).webp` |

## Known problems with the source material

- **`Image_001.webp` is 150x100.** Every other "before" is 675-900px. Upscaled into a tile it
  is visibly blurry next to its 1264px partner. Needs re-exporting from the original.
- **Six of the seven "after" originals carry a four-pointed sparkle watermark** in the
  bottom-right corner (all except `Image_001(2)`), the marker generative image tools stamp on
  their output. The shipped copies were cleaned — see the warning above — so the watermarked
  bytes survive only in this folder.
- `Image_045` is the only portrait pair; the tiles are a uniform 3:2 box, so it is
  centre-cropped.
- `Image_045 (2).png` (7.3 MB) duplicates the webp, and `image_50.webp` is not part of any
  listed pair. Both are parked here, unused.
