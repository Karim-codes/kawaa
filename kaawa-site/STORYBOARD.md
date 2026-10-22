# KAAWA — The daily ritual

## Motion storyboard (before implementation)
1. Arrival / pour / takeover — time-driven, 3.4s. Warm ivory, small blue wordmark, dimensional blue cup. A masked liquid volume rises behind an illustrated cutaway; elliptical crema, ripples, stream and steam reveal depth. Cup advances and its blue surface expands into the identical blue hero. Skip is always available; sessionStorage remembers playback; a hard timeout releases the page.
2. Blue hero — oversized KAAWA wordmark, editorial latte photograph, restrained secondary headline. Entrance is time-driven; desktop pointer depth is small and optional.
3. The ritual — one short sticky scroll sequence. Cup fills, ivory becomes espresso, typography switches from NOT JUST COFFEE to IT’S A RITUAL. Cup advances into a circular blue reveal. Timeline scrubs both ways.
4. Product theatre — three normal-flow scenes, Spanish Latte, Date Syrup Matcha, Iced V60. Clipped image reveals and opposing text motion follow scroll. No long product pin. Blue, sage and terracotta provide chapter changes.
5. Cookie — high-quality macro photograph zooms through an expanding circular mask. Use the photographic fallback rather than simulate a false break. Dessert links lead to the browsable selection.
6. Atmosphere — matched generated daylight/evening photos crossfade on scroll, with actual localized light changes. No flat dark overlay pretending to change time.
7. Breathe / convert — editorial brand copy, filterable concept selection, photography gallery, actual supplied address, hours awaiting confirmation, directions and Instagram.

## Assets
Original generated demonstration photographs: latte, matcha, V60, cookie, imagined cafe daylight and matching evening. These are NOT official products or actual premises photography. Custom layered SVG cup is a demonstration packaging design. All final assets are local, optimized JPEG; hero preloads. GSAP + ScrollTrigger is the sole complex animation engine, vendored locally.

## Mobile / accessibility
Mobile reduces depth and pin duration, stacks products and maintains clear navigation. Native scrolling. Reduced motion removes intro, pinning, parallax and masked reveals; all content remains readable. Keyboard-accessible menu, focus states, filters, skip link, semantic headings. No JavaScript: readable page and all selection entries remain visible. Intro is hidden by default.

## Business content
User supplied: 71 High Street, Manchester, M4 1FS; https://www.instagram.com/kaawa_uk/. Hours unconfirmed and editable in content.js. Product names are inspiration, not a confirmed menu. No prices or official product descriptions. Instagram fetch failed, so no claim of direct visual matching is made.
