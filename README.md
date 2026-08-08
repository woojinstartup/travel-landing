# Altura — landing page

A landing page for a fictional package-tour operator, built around a full-bleed
hero video. Four sections: the hero, destinations, an FAQ, and contact. Every
CTA opens the same inquiry dialog.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # serve the built output
```

`dist/` is fully static — drop it on Vercel, Netlify, Cloudflare Pages, or any
static host.

## Where things are

| File | What it holds |
| --- | --- |
| `src/site.ts` | All page copy — nav links, destinations, FAQ. Rewrite here, not in the layout. |
| `src/App.tsx` | Page shell and the hero: video, scrims, headline block. |
| `src/components/site-nav.tsx` | Fixed nav island and its mobile sheet. |
| `src/components/sections.tsx` | Destinations, FAQ, contact, footer. |
| `src/components/inquiry-dialog.tsx` | The CTA dialog and its form. |
| `src/index.css` | Design tokens — palette, fonts, grain, motion. |
| `public/hero.mp4` | 2560×1440 · H.264 · 24fps · 8s, loops silently, no audio track. |
| `public/hero-poster.jpg` | First frame, shown until the video is ready. |

## Design notes

The palette is sampled from the video itself, so the page and the footage stay
in one key:

| Token | Value | Sampled from |
| --- | --- | --- |
| `dusk` / `dusk-deep` | `oklch(0.205 0.038 264)` / `oklch(0.145 0.028 264)` | the navy band at the top of the sky |
| `ember` | `oklch(0.765 0.132 66)` | the sun on the horizon |
| `linen` | `oklch(0.963 0.009 85)` | the lit side of the clouds |

Type is Instrument Serif for display and Inter for UI, both self-hosted via
Fontsource — no external font requests at runtime.

The delivered video is 2560×1440. The original render was 1280×720, which went
visibly soft once it filled a large viewport, so it was upscaled with lanczos
and an unsharp pass:

```bash
ffmpeg -i original.mp4 \
  -vf "scale=2560:1440:flags=lanczos,unsharp=luma_msize_x=5:luma_msize_y=5:luma_amount=1.0:chroma_amount=0" \
  -c:v libx264 -profile:v high -crf 21 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an public/hero.mp4
```

Sharpness here is mostly a question of what sits *on top* of the footage. The
scrims are deliberately tight — a global wash reads as blur — so the copy
carries its own contrast via `.copy-shadow`, and a bottom-left radial gradient
pools darkness under the text while leaving the sun and wing clean. The grain
layer is down at 5% opacity; it now only breaks up banding in the sky.

The grain and the entrance animations both stop under
`prefers-reduced-motion: reduce`.

## Navigation

The nav links point at real sections, so none of them dead-ends: `#home`,
`#destinations`, `#faq`, `#contact`. Below `md` they collapse into a sheet.

The hero runs on the light token set inverted by hand (`linen` on `dusk`);
everything below it is wrapped in `.dark` so the shadcn primitives — accordion,
sheet — inherit the right colours rather than being re-skinned one by one. The
dialog portals to `<body>`, which keeps it on the light cream surface.

Destination cards open the inquiry dialog with that destination preselected, so
clicking "Iceland" is a real action rather than decoration.

## No phone number or email address

There is deliberately no phone number and no email address anywhere on the page,
in the nav, or in `site.ts`. A plausible-looking contact detail on a public page
invites someone to dial or write to it, and this operator does not exist. The
request form is the only channel, and the contact section carries reply times
instead of addresses.

If you add real contact details later, that is the moment to also wire the form
up — see below.

## The inquiry form does not send anything

This is deliberate — there is no backend and no endpoint configured. On submit,
`handleSubmit` in `src/components/inquiry-dialog.tsx` logs the collected values
to the console and switches the dialog to its success state. **A visitor would
see "Request received" while nothing was actually delivered**, so wire it up
before this goes anywhere real.

To make it work, POST the `values` object to an endpoint in that handler and
drive the success state off the response. Formspree or a Resend-backed function
both drop in with a few lines.
