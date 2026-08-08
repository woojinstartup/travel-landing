# Altura — hero landing page

A single full-bleed hero section for a fictional package-tour operator, built
around `public/hero.mp4`. The CTA opens an inquiry form in a dialog.

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
| `src/site.ts` | All page copy. Rewrite here, not in the layout. |
| `src/App.tsx` | Hero: video, scrims, nav, headline block. |
| `src/components/inquiry-dialog.tsx` | The CTA dialog and its form. |
| `src/index.css` | Design tokens — palette, fonts, grain, motion. |
| `public/hero.mp4` | 1280×720 · H.264 · 24fps · 8s, loops silently. |
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

The source video is 720p, so it gets soft when scaled to a large viewport. A
fine animated grain layer (`.grain` in `index.css`) sits over it to hide that.
The grain and the entrance animations both stop under
`prefers-reduced-motion: reduce`.

## The inquiry form does not send anything

This is deliberate — there is no backend and no endpoint configured. On submit,
`handleSubmit` in `src/components/inquiry-dialog.tsx` logs the collected values
to the console and switches the dialog to its success state. **A visitor would
see "Request received" while nothing was actually delivered**, so wire it up
before this goes anywhere real.

To make it work, POST the `values` object to an endpoint in that handler and
drive the success state off the response. Formspree or a Resend-backed function
both drop in with a few lines.
