# Launch UI Baseline — 2026-08-04

## Status

The launch UI is approved. It preserves the original mobile-first, two-card
translator workflow and applies a restrained editorial visual system. Dark
mode is deferred until after launch.

## Product Copy

- Imprint: “NO CAP, JUST CONTEXT”
- Title: “Gen Alpha Translator”
- Tagline: “because every generation says it differently.”
- Forward action: “Cook it”
- Reverse action: “Uncook it”

## Visual System

- Warm putty background: `#F3F1ED`
- Ivory card surfaces: `#F7F4EF`
- Cardinal action color: `#8C1515`
- Editorial serif: product title, translated output, and “Why these changes”
- Sans serif: controls, labels, instructions, explanations, and supporting copy
- Two equal workflow cards with subtle borders, shadows, and moderate corners
- Cardinal red is reserved for primary actions and selected-state accents

## Interaction Baseline

- The translator remains the primary focus; branding is secondary.
- Input and output are distinct, adjacent containers on desktop and stack on
  smaller screens.
- The empty output previews translation and explanation as separate stages.
- Development ratings remain controlled by
  `NEXT_PUBLIC_ENABLE_LOCAL_FEEDBACK` and are excluded from production.

## Verification

- [x] No horizontal overflow at 320px, 768px, 1024px, or desktop width
- [x] Cards stack on mobile and align as one workflow on desktop
- [x] Direction controls work with keyboard arrow navigation
- [x] Labels, live regions, disabled states, and touch targets remain intact
- [x] Text and primary-control colors meet WCAG AA contrast
- [x] Focus ring exceeds 3:1 contrast against both launch surfaces
- [x] Empty, populated, explanation, copy, and local-evaluation layouts reviewed
- [x] Local feedback strings absent from the production bundle
- [x] ESLint, TypeScript checking, and optimized production build passed

## Deferred

- Manual light/dark theme selection
- Example inputs and automatic direction detection
- Durable public feedback and sharing features
