# KAAWA — Your daily ritual

A self-contained, responsive creative concept for KAAWA, Manchester.

## Run

```sh
cd kaawa-site
npm install
npm run dev
```

Vite serves the site at http://127.0.0.1:5173. Use `npm run build` to create production output in `dist`, and `npm run preview` to check that build.

## Edit

- `index.html`: page content, navigation, location and links.
- `src/main.js`: npm GSAP imports, cup scene, intro, scroll timelines and interactions.
- `src/styles.css`: layouts, responsive design and motion fallback.
- `src/content.js`: confirmed opening hours.
- `public/assets/`: photographs; awaiting official Instagram images from the client.

The opening header and hero were redesigned in revision 2. A compact logo and clear navigation sit above a split composition with a readable headline and straight image panel. Existing generated images are temporary until official images arrive.

## Content status

The address and Instagram URL came from the client brief. Opening hours remain unconfirmed. The seven-item browsable selection is inspiration, not a confirmed complete menu. There are no prices. Product captions are creative copy, not official descriptions. All photographs are generated demonstration assets; the interior is imagined and is explicitly labelled. Replace with approved KAAWA photography before treating this as an official business website.

## Verification

JavaScript syntax and local asset/anchor integrity checked. Browser inspected at desktop and narrow viewport: hero, intro replay, session repeat behavior, menu navigation and matcha/dessert filters. Reduced-motion control verified to remove sticky positioning and reveal the static cookie image. See QA.md for detailed observations and remaining limitations.
