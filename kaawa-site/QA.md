# Verification — 22 October 2026

## Passed
- JavaScript syntax checks for app.js and content.js.
- Every local HTML asset exists; every fragment link resolves; no duplicate HTML IDs.
- Desktop hero visually inspected; local photographs render.
- First browser entry displayed intro; subsequent reload omitted it.
- Replay displayed the branded layered cup; early Skip dismissed overlay and left hero heading/photo at opacity 1.
- Scroll ritual visually inspected empty and full. Liquid transform progressed to y≈15, then reversed to y≈148 on upward scrolling; espresso background and second headline appeared.
- Refined the liquid mask so crema and ripples are visible at the cup opening.
- Cookie macro masked reveal visually inspected.
- Café evening scene visually inspected, with night layer reaching opacity 1 and actual relit imagery.
- Mobile navigation expanded and closed after selecting the selection link.
- Matcha filter showed exactly the two matcha entries. Dessert filter showed cookie, banana pudding and tiramisu.
- Filter changes refresh scroll measurements to account for changed menu height.
- Reduce motion control verified: intro hidden, ritual position relative, cookie clip removed.
- Narrow viewport measured 390px client width and 390px scroll width: no horizontal document overflow.
- No captured console warnings/errors during initial narrow viewport test.
- Screenshots saved in screenshots/.

## Limits
- Browser automation occasionally timed out and viewport screenshots included unused browser surface outside the CSS viewport. Recovered via reload/default viewport and used DOM measurements alongside visual inspection.
- No physical iPhone/Android testing or measured 60fps performance benchmark.
- OS-level reduced-motion emulation was not available through the browser API; the explicit in-page control exercised the same animation bypass, with the media-query CSS also reviewed.
- Instagram could not be fetched. Official imagery, packaging, full menu and opening hours still require client confirmation. All generated imagery is disclosed as demonstration material.

## Revision 2 — Vite and header
- npm run check and npm run build passed (Vite 8.3.5).
- Desktop redesigned navigation and hero visually inspected.
- Mobile menu expands; measured 390px viewport and 390px document width.
- Photography replacement awaits client Instagram images.
