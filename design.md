---
version: alpha
name: Taste Buds
description: A culinary-focused, editorial interface that emphasizes high-contrast minimalism and food photography. Sharp geometry, a stark black-and-white palette, and elegant serif typography create a magazine-like layout. UI elements are aggressively flat, relying on solid color blocking and strict grid alignments to separate content, allowing the vibrant ingredients and dishes to serve as the sole source of color.

colors:
  primary: "#000000"
  primary-hover: "#333333"
  ink: "#000000"
  ink-muted: "#555555"
  ink-inverse: "#ffffff"
  canvas: "#ffffff"
  canvas-alt: "#f9f9f9"
  canvas-dark: "#1e1e1e"
  surface-input: "#e6e6e6"
  surface-dotted: "url(#dotted-pattern)" # Conceptual representation of the dot pattern
  divider-dark: "#000000"
  on-primary: "#ffffff"
  on-dark: "#ffffff"

typography:
  hero-display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 4px
    textTransform: "uppercase"
  display-lg:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: 32px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 2px
    textTransform: "uppercase"
  display-md:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 1px
  body-lead:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  nav-link:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0.5px
  button-label:
    fontFamily: "Helvetica Neue, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: 1px
    textTransform: "capitalize"
  caption:
    fontFamily: "Helvetica Neue, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0

rounded:
  none: 0px
  pill: 9999px
  full: 9999px

spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  section: 100px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-label}"
    rounded: "{rounded.none}"
    padding: 12px 32px
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-label}"
    rounded: "{rounded.none}"
    padding: 8px 0px
  global-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 80px
  nav-item-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    padding: 30px 24px
  nav-item-default:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: 30px 24px
  grid-tile-image:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.none}"
    padding: 0px
  grid-tile-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: "{spacing.xl}"
  grid-tile-dotted:
    backgroundColor: "{colors.canvas}"
    backgroundImage: "{colors.surface-dotted}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: "{spacing.xl}"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    borderBottom: "1px solid {colors.primary}"
    rounded: "{rounded.none}"
    padding: 12px 0px
  input-solid:
    backgroundColor: "{colors.surface-input}"
    textColor: "{colors.ink}"
    border: "none"
    rounded: "{rounded.none}"
    padding: 16px
  testimonial-section:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.ink-inverse}"
    typography: "{typography.display-md}"
    padding: "{spacing.section}"
  chat-widget-trigger:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
---

## Overview

Taste Buds employs an aggressively flat, highly editorial design system reminiscent of modern print magazines and upscale cookbooks. The interface steps back entirely, using a strict black, white, and gray palette to allow the high-saturation food photography to serve as the visual anchor. 

Density varies dramatically. Hero sections and textual layouts use airy, generous whitespace, while the signature "mosaic" grid tightly packs edge-to-edge squares of photography alternating with solid typographic blocks (black, white, or a subtle dotted pattern). 

**Key Characteristics:**
- **Monochrome Foundation:** The UI has zero inherent color. Every brand mark, button, and text block is strictly black or white.
- **Serif Dominance:** Playfair Display (or a similar high-contrast serif) handles nearly all text duties, from giant spaced-out headers down to the main body copy, reinforcing an elegant, traditional culinary feel.
- **Sharp Geometry:** Border radius is strictly `0px` across the entire core layout. Buttons are sharp rectangles; grid tiles are perfect squares or sharp rectangles. The only exceptions are localized widgets (like the floating chat pill).
- **Active State Blocking:** The global navigation indicates active states not with underlines or text color changes, but by inverting the entire background of the nav item to a solid black block.

## Colors

> **Source pages analyzed:** Home, Our Workshops, Online Classes, About Us, Contact Us. The palette is uncompromisingly neutral.

### Brand & Accent
- **Primary Black** (`{colors.primary}` — #000000): The single brand anchor. Used for primary buttons, active navigation blocks, dark grid tiles, and heavy borders.
- **Ink** (`{colors.ink}` — #000000): The default text color for all typography on light backgrounds.

### Surface
- **Pure White** (`{colors.canvas}` — #ffffff): The dominant background for the page body, headers, and light grid tiles.
- **Input Gray** (`{colors.surface-input}` — #e6e6e6): A flat, mid-light gray used exclusively as the background fill for the borderless input fields on the Contact Us page.
- **Dark Canvas** (`{colors.canvas-dark}` — #1e1e1e): A near-black used specifically for full-width sections that need to break the visual flow, such as the Testimonials carousel.

## Typography

### Font Family
- **Primary Voice:** `Playfair Display, Georgia, serif`. This handles almost everything: brand lockups, headers, navigation items, and surprisingly, the body paragraph text.
- **Utility Voice:** `Helvetica Neue, Arial, sans-serif`. Used extremely sparingly, primarily for button labels, micro-copy, and form labels where readability at small sizes overrides editorial style.

### Hierarchy

| Token | Size | Weight | Use |
|---|---|---|---|
| `{typography.hero-display}` | 48px | 700 | Main brand mark ("TASTE BUDS"). Wide tracking. |
| `{typography.display-lg}` | 32px | 400 | Section headers, grid tile text ("OUR CHEFS"). |
| `{typography.display-md}` | 24px | 400 | Testimonial quotes. |
| `{typography.body-lead}` | 18px | 400 | Sub-headers and intro paragraphs. |
| `{typography.body}` | 16px | 400 | Standard paragraph text ("I'm a paragraph..."). |
| `{typography.nav-link}` | 15px | 400 | Global navigation links. |
| `{typography.button-label}` | 14px | 600 | Sans-serif CTA labels ("Book Now"). |

### Principles

- **Wide Tracking on Caps:** Uppercase headings utilize extensive letter-spacing (2px to 4px) to create a premium, unhurried feel.
- **Serif for Reading:** Unlike many modern SaaS sites, body copy is set in a serif font, committing fully to the print-magazine aesthetic.
- **Minimal Weight Variation:** Hierarchy is established through size and capitalization rather than font weight. Most text sits at a standard 400 weight.

## Layout

### Spacing System
- **Generous Section Padding:** Standard sections (like "ABOUT US" text blocks) feature immense padding, often 100px or more, allowing the text to breathe.
- **Zero-Gap Grids:** The mosaic image grids snap edge-to-edge with exactly 0px gap between tiles. 

### Whitespace Philosophy
Whitespace is treated as a structural element, equivalent to a solid block of color. The layout often juxtaposes an edge-to-edge, dense photo grid immediately above or below a sprawling white section containing a single centered paragraph.

## Elevation & Depth

**Strictly Flat.** There are no drop shadows on cards, buttons, or images in the core design system. 
- Elements rely entirely on high-contrast color blocking (black next to white) to establish boundaries.
- The single exception is the floating "Let's Chat" third-party widget, which carries a standard default system shadow to separate it from the scrolling content.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | 99% of the UI. Images, buttons, input fields, and grid tiles. |
| `{rounded.pill}` | 9999px | Floating chat widget and user avatar. |

## Components

### Top Navigation

**`global-nav`** — A persistent, static top bar. Background `{colors.canvas}` (white). Links are centered, set in `{typography.nav-link}`. 
**`nav-item-active`** — The active page indicator is highly distinct: the link background becomes a solid `{colors.primary}` (black) block that stretches to the top and bottom bounds of the nav bar, with the text inverted to `{colors.on-primary}` (white).

### Buttons

**`button-primary`** — Background `{colors.primary}` (Black), text `{colors.on-primary}` in `{typography.button-label}`. Perfectly sharp corners (`{rounded.none}`). Used for "View Details", "Book Now", and form submissions.
**`button-text`** — Used for secondary actions like the "Subscribe" trigger in the newsletter form. No background, just text.

### Cards & Grids

**`grid-tile-image`** — Edge-to-edge photography cropped perfectly square or rectangular depending on the grid row. No inner padding, no borders.
**`grid-tile-dark`** — Solid black block used in the mosaic grid. Features vertically and horizontally centered white text.
**`grid-tile-dotted`** — A unique pattern tile featuring a sparse dot-grid on a white background, used to break up the heaviness of the black tiles and photography in the mosaic.

### Inputs & Forms

Taste Buds uses two distinct form grammars depending on context:
**`input-underline`** — Used in the "STAY UP TO DATE" newsletter block. The input has no background and no side/top borders, only a thick 1px solid black bottom border (`border-bottom: 1px solid #000`).
**`input-solid`** — Used on the "CONTACT US" page. Inputs are solid gray blocks (`{colors.surface-input}`) with absolutely no borders.

## Do's and Don'ts

### Do
- Use `{colors.primary}` (Black) for all primary actions.
- Enforce sharp, `0px` border radii on all structural and interactive elements.
- Use wide letter-spacing on uppercase serif headers.
- Indicate active navigation states with solid black block backgrounds.
- Alternate heavy photography with solid typographic tiles to maintain the magazine-grid rhythm.

### Don't
- Don't introduce any brand colors; color must come entirely from the food photography.
- Don't use rounded corners on buttons or images.
- Don't use drop shadows to indicate elevation or hover states.
- Don't wrap inputs in standard bordered boxes; use either the flat gray solid fill or the minimalist bottom-underline style.