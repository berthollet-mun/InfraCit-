---
name: InfraCité Precision
colors:
  surface: '#f7fafa'
  surface-dim: '#d7dadb'
  surface-bright: '#f7fafa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f4'
  surface-container: '#ebeeef'
  surface-container-high: '#e6e9e9'
  surface-container-highest: '#e0e3e3'
  on-surface: '#181c1d'
  on-surface-variant: '#3f494a'
  inverse-surface: '#2d3132'
  inverse-on-surface: '#eef1f2'
  outline: '#6f797a'
  outline-variant: '#bec8ca'
  surface-tint: '#006972'
  primary: '#00545c'
  on-primary: '#ffffff'
  primary-container: '#0b6e78'
  on-primary-container: '#9eedf9'
  inverse-primary: '#84d3de'
  secondary: '#7e5700'
  on-secondary: '#ffffff'
  secondary-container: '#feba35'
  on-secondary-container: '#6e4c00'
  tertiary: '#723f12'
  on-tertiary: '#ffffff'
  tertiary-container: '#8f5628'
  on-tertiary-container: '#ffdac2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a0effa'
  primary-fixed-dim: '#84d3de'
  on-primary-fixed: '#001f23'
  on-primary-fixed-variant: '#004f56'
  secondary-fixed: '#ffdeab'
  secondary-fixed-dim: '#feba35'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5f4100'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb782'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#6c3a0d'
  background: '#f7fafa'
  on-background: '#181c1d'
  surface-variant: '#e0e3e3'
  text-primary: '#10272F'
  text-muted: '#4B6168'
  border-hairline: '#C5D2CE'
  bg-canvas: '#F2F5F3'
  bg-soft: '#E5ECE9'
  band-dark-bg: '#10272F'
  band-dark-text: '#E4EEEC'
  band-dark-line: '#2E4952'
  dark-bg: '#0B1B21'
  dark-surface: '#10262D'
  dark-text: '#E4EEEC'
  dark-accent: '#5CC6CC'
  dark-amber: '#F0B93A'
typography:
  display-hero:
    fontFamily: Bricolage Grotesque
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.025em
  display-hero-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 2.5rem
    fontWeight: '700'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 1.25rem
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  lead:
    fontFamily: IBM Plex Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-default:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-medium:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: '500'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  eyebrow:
    fontFamily: IBM Plex Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.12em
  metadata-mono:
    fontFamily: IBM Plex Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.08em
  label-pill:
    fontFamily: IBM Plex Sans
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system marries the rigor of civil infrastructure engineering with the ethereal, atmospheric elegance seen in the Auralis visual reference. Designed for civil engineering leaders, public project owners (*maîtres d'ouvrage*), and urban developers, it establishes an aura of uncompromising technical precision balanced by modern, human-centered clarity.

The visual style is **Contemporary Engineering Minimalist with Atmospheric Tactility**:
- Crisp, survey-grade technical indexing (monospace metadata, fine 1px structural guidelines, and topographic contours).
- Soft, organic surfaces inspired by field-survey papers and dawn landscapes, utilizing curved container silhouettes (20px border radius) and floating pill capsules (999px).
- Frosted glassmorphism (`backdrop-blur`) that grounds floating controls and navigational capsules above procedural terrain lines and dynamic content.
- Restrained, purposeful color highlights that mimic geodetic markers, transit lines, and leveling beacons.

## Colors

The color architecture is inspired by cartographic relief maps and technical survey instruments. It balances heavy dark-slate ink against warm mineral paper neutrals, energized by a primary infrastructure teal and a focused amber surveyor mark.

### Color Tokens & Dynamic Application
- **Primary Teal (`#0B6E78` in light / `#5CC6CC` in dark):** Used for focal CTAs, primary interactive affordances, active nav anchors, and critical line strokes.
- **Marker Amber (`#D99A0B` in light / `#F0B93A` in dark):** Used sparingly as an orienting survey beacon—eyebrow glyphs, milestone pins, critical status highlights, and precision metrics.
- **Canvas Neutral (`#F2F5F3` in light / `#0B1B21` in dark):** The foundational substrate, evoking clean architectural drafting paper.
- **Soft Surface (`#E5ECE9` in light / `#10262D` in dark):** Utilized for secondary cards, segmented chip backgrounds, and tonal alternating section bands.
- **Structural Inverted Band (`#10272F` with text `#E4EEEC`):** Immersive, high-contrast dark sections for enterprise engineering deliverables and executive synthesis.
- **Structural Dividers (`#C5D2CE` in light / `#24404A` in dark):** Hairline precision borders (1px) maintaining dimensional order across complex datasets.

## Typography

The typographic hierarchy creates a deliberate contrast between technical authority and expressive modernism:
- **Display & Headlines (`Bricolage Grotesque` 700):** Provides architectural character and personality. Headlines utilize negative tracking and tight leading (`1.1` to `1.25`) with balanced text wraps.
- **Reading Body (`IBM Plex Sans` 400, 500, 600):** Delivers clean readability for detailed project scopes, calculations, technical narratives, and executive summaries.
- **Engineering Indexing (`IBM Plex Mono` 400, 500):** Applied across all geodetic coordinates, step numbers, chip identifiers, metadata timestamps, and section overlines (`uppercase` with `0.12em` tracking).

## Layout & Spacing

The layout is built around a maximum content measure of `1160px` with fluid responsive padding.

### Grid & Layout Rules
- **Grid Models:**
  - **Desktop (≥1024px):** 12-column layout or asymmetrical split grids (`minmax(0, 4fr) minmax(0, 7fr)` for sticky domain sidebars; 2-column equal splits for feature showcases).
  - **Tablet (768px - 1023px):** 2-column grids with collapsed margins (`1.5rem`).
  - **Mobile (≤767px):** 1-column linear flow with preserved minimum inline touch margins (`16px`).
- **Vertical Rhythm:**
  - Section blocks: `5.5rem` (`88px`) vertical padding on desktop, collapsing to `3.75rem` (`60px`) on mobile.
  - Text Measures: Strictly constrain reading paragraphs to `56ch`–`65ch` to preserve technical legibility.

## Elevation & Depth

Visual hierarchy abandons heavy, muddy drop shadows in favor of ambient optical diffusion, frosted atmospheric backdrops, and crisp 1px structural framing:

- **Floating Glass Nav:** High-translucency pill (`rgba(242, 245, 243, 0.72)` in light mode, `rgba(16, 38, 45, 0.75)` in dark mode) combined with a `backdrop-filter: blur(16px)` and a subtle 1px inner border (`#C5D2CE` at 50% opacity).
- **Ambient Diffusion Shadows:** Cards and floating overlays utilize an ultra-soft, expansive shadow tinted with dark slate: `0 8px 32px -4px rgba(16, 39, 47, 0.05)`.
- **Topographic Canvas Layering:** Structural relief contours are positioned beneath content containers, softened via CSS radial gradients and masks to allow high-contrast typography and interactive cards to sit cleanly on the foreground plane.
- **Inverted Dark Bands:** Elevation is deepened through high-contrast surface transitions rather than z-index stacking, drawing intense visual focus to critical engineering expertise.

## Shapes

The design language balances structural engineering corners with soft, humanized radii:

- **Cards & Surface Modules:** Fixed at `20px` border radius (`rounded-lg` token extension for large cards) to evoke smooth tablet consoles and modern architectural panels.
- **Interactive Floating Pills:** Set to `999px` (`full rounded`) for floating navigation bars, primary pill CTAs, metadata badges, and filter chips.
- **Topographic & Survey Markers:** Precision geometric surveyor triangles (`clip-path: polygon(50% 0, 100% 100%, 0 100%)`) scaled to `9px` and `14px` in Marker Amber (`#D99A0B`), serving as precision anchors next to section headers and chronological stems.

## Components

### Floating Navigation Bar
- **Geometry:** Floating horizontal pill (`border-radius: 999px`) pinned `24px` from top.
- **Surface:** Glassmorphic translucent background (`backdrop-filter: blur(14px)`), framed with a 1px border in `#C5D2CE`.
- **Navigation Links:** `IBM Plex Sans` 500 (`0.9rem`), color `#4B6168`, transitioning to `#10272F` on hover.
- **Embedded CTA:** Nested pill button in Primary Teal (`#0B6E78`) with crisp white label text and survey directional icon.

### Primary & Ghost Buttons
- **Primary CTA:** Pill shape (`999px`), background `#0B6E78`, text `#FFFFFF`, font `IBM Plex Sans` 500. Padding `12px 24px`. Hover state applies `filter: brightness(1.08)` and subtle micro-expansion.
- **Secondary / Ghost:** Transparent background with 1px border in `#0B6E78` (or `#C5D2CE` for subtle tiers), text `#10272F`.

### Cards (Projets & Domaines)
- **Geometry:** `20px` border radius, 1px perimeter border in `#C5D2CE`.
- **Background:** `#F2F5F3` in base state, `#FFFFFF` for elevated focus, or `#10262D` in dark mode.
- **Accent Treatment:** Optional top accent stroke (`3px solid #0B6E78`) on key infrastructure case cards.
- **Padding:** `28px` internal clearance (`22px` on mobile screens).

### Eyebrows & Engineering Tags
- **Structure:** Monospaced label (`IBM Plex Mono`, `0.75rem`, uppercase, tracking `0.12em`), paired with an upward amber marker triangle (`width: 9px; height: 9px; background: #D99A0B; clip-path: polygon(50% 0, 100% 100%, 0 100%)`).

### Chips & Filter Pills
- **Geometry:** `999px` pill radius, padding `6px 14px`.
- **Styling:** Background `#E5ECE9`, border `1px solid #C5D2CE`, typography `IBM Plex Mono` (`0.8125rem`). Active state inverts to `#0B6E78` fill with `#FFFFFF` text.

### Form Inputs & Selectors
- **Geometry:** `12px` rounded corners, padding `12px 16px`, background `#FFFFFF` (light) / `#10262D` (dark), border `1px solid #C5D2CE`.
- **Focus:** 2px outline in `#0B6E78` with `3px` outline offset, ensuring complete accessibility compliance across all interactive survey forms.