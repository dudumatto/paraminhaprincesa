---
schemaVersion: 1
scope: workspace
updatedAt: "2026-05-20T17:56:12.524Z"
workspaceName: "forbia"
---

# Project Memory

## Project Overview
- Workspace for “Ola Brand Design,” focused on a romantic, cinematic personal site experience.
- Current corrected scope: pure HTML/CSS/JavaScript site with only an initial heartbeat/coração loading overlay before revealing the existing page.

## Current State
- Existing personal romantic HTML/CSS/JS page in Portuguese remains the main project.
- A loading overlay was added/refined in the existing files only: appears on site open, runs for ~3.3s, fades out, then stops blocking interaction.
- The overlay includes dark cinematic background, minimal pulsing heart, soft pink/red glow, light particles, and reduced-motion handling.
- `DESIGN.md` exists and remains the authoritative design-system baton.
- Runtime preview/final visual verification could not complete because Chrome/Chromium is unavailable in the environment.
- `App.jsx` still exists from the prior login direction, but the latest user correction explicitly says not to use React/Tailwind/Framer and not to create/use a login screen.

## Artifacts
- `index.html`: main romantic site source in Portuguese; now includes the initial loading overlay at the start of `body`.
- `style.css`: main styling; now includes loading overlay, heart/glow/particle styles, keyframes, fade-out, and `prefers-reduced-motion`.
- `script.js`: main behavior/content; now includes loading timing and removal/reveal logic.
- `App.jsx`: prior React login animation artifact; not part of the corrected current scope.
- `DESIGN.md`: authoritative reusable design-system artifact for the romantic premium visual direction.

## Design Direction
- Romantic cinematic atmosphere with dark background and restrained pink/red bloom.
- Minimal heartbeat/coração animation: elegant, alive, premium, smooth, not childish.
- Loading should feel like an entrance moment only, then disappear cleanly without changing the main site layout/content.

## User Feedback
- User corrected the scope: does NOT want login screen, form, inputs, login button, or login card.
- User does NOT want React, TailwindCSS, Framer Motion, or a recreated site for this task.
- User wants only necessary changes in existing `index.html`, `style.css`, and `script.js`.
- Must not alter main texts, sections, or layout beyond adding the initial loading overlay.
- Must avoid childish visuals, hard transitions, cheap gradients, exaggerated effects.
- Must respect `prefers-reduced-motion`, avoid horizontal scroll, work on desktop/mobile, and not block clicks after disappearing.

## Decisions
- Current active implementation is pure HTML/CSS/JavaScript.
- Add the loading overlay at the beginning of `body` in `index.html`.
- Keep the main site content and layout intact.
- Use high z-index full viewport overlay with smooth fade-out and JS removal so it no longer blocks interaction.
- Use reduced-motion timing for users who prefer reduced motion.

## Open Questions
- Whether to remove the obsolete `App.jsx` artifact from the workspace, since it conflicts with the corrected scope.
- Whether the loading duration should be tuned closer to 2.5s, 3.3s, or 4s after visual testing.
- Whether further polish is needed after previewing in a browser with Chrome/Chromium available.

## Next Steps
- Preview in an environment with Chrome/Chromium installed.
- Test on mobile and desktop for no horizontal scroll and no post-loading click blocking.
- Optionally remove or archive `App.jsx` if the project should remain strictly HTML/CSS/JS.

## Promotion Candidates For DESIGN.md
- Cinematic dark romantic loading overlay pattern.
- Minimal heartbeat heart with soft red/pink glow as reusable entrance motion.
- Reduced-motion-friendly romantic animation behavior.
- Floating particles and restrained bloom as atmosphere motif.

## Recent History
- 2026-05-20: Inspected workspace and reviewed existing romantic HTML/CSS/JS source.
- 2026-05-20: Added prior `App.jsx` cinematic romantic login animation and created/corrected `DESIGN.md`.
- 2026-05-20: User corrected scope: no login, no React/Tailwind/Framer; only loading overlay in existing HTML/CSS/JS.
- 2026-05-20: Added/refined heartbeat loading overlay in `index.html`, `style.css`, and `script.js`; preview blocked by missing Chrome/Chromium.