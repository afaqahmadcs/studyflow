---
name: Obsidian Orbit
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00885d'
  on-tertiary-container: '#000703'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.025em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  mono-timer:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.02em
  mono-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system powers an elite, distraction-free productivity environment for high-performing students, researchers, and academic builders. Drawing deeply from the refined mechanics of modern developer tools and precision calendar software, the brand projects intellectual rigor, intentionality, and velocity. 

The aesthetic marries **Technical Minimalism** with **Sleek Layered Glassmorphism**:
- Ultra-deep slate and obsidian planes evoke an immersive nocturnal study cockpit.
- Subtle inner specular glows, micro-borders, and high-frequency tactile states reward dense information management without visual fatigue.
- Accent channels act strictly as semantic telemetry—communicating urgency, streaks, and temporal anchors through electric, luminous frequencies against deep surfaces.

## Colors
The system employs an authoritative dark-first palette structured around a 5-tier zinc-obsidian surface stack and electric status channels.

### Surface Architecture
- **Base Canvas (`#0B0F17`):** The foundational infinite canvas and lowest Z-plane.
- **Surface Low (`#111827`):** Recessed wells, sidebars, command line containers, and secondary panes.
- **Surface Mid (`#182234`):** Interactive boards, standard modular cards, and grid widgets.
- **Surface High (`#1E293B`):** Flyout panels, elevated modals, contextual tooltips, and floating docks.
- **Border Subtle (`rgba(255, 255, 255, 0.08)`): Master boundary for structural line work across dark panels.
- **Border Highlight (`rgba(255, 255, 255, 0.16)`): Hover state and active focus edge token.

### Accent & Telemetry Palette
- **Primary Electric Indigo (`#6366F1` / Hover `#818CF8`):** System-wide focus, command triggers, and interactive dominance.
- **Cyan Focus Stream (`#06B6D4`):** Active pomodoro sessions, deep-work sprints, and live time-tracking.
- **Emerald Streak (`#10B981`):** Submissions completed, attendance streaks, and mastery indicators.
- **Amber Warning (`#F59E0B`):** Upcoming deadlines (<24 hours remaining), pending reviews, and schedule collisions.
- **Rose Critical (`#F43F5E`):** Imminent exam milestones, unsubmitted urgent coursework, and hard blockers.

## Typography
Typography is organized around functional intent:
- **Headlines (`Plus Jakarta Sans`):** Geometrically structured with negative tracking to produce tight, punchy dashboard module headings and KPI figures.
- **Body & Controls (`Inter`):** Neutral, hyper-legible neo-grotesque rendering engineered for extended reading across syllabi, dense assignment briefs, and multi-column calendars.
- **Data & Shortcut Telemetry (`JetBrains Mono`):** Fixed-width tabular metrics for countdown timers, GPA calculations, keyboard shortcuts (`⌘K`), and grade point readouts to prevent layout shift during updates.

## Layout & Spacing
The layout follows a fluid-grid shell anchored by an omnipresent collapsible utility sidebar and modular work tiles.

- **Grid Architecture:** 12-column adaptive layout on desktop (`>=1280px`) with `1.5rem` gutters. Collapses to 6 columns on tablet (`768px-1279px`), and a single column stack on mobile (`<768px`).
- **Rhythm & Metrics:** Internal spacing adheres to an absolute 4px base increment (`0.25rem`), prioritizing dense scanability without crowding actionable touch targets.
- **Spatial Anchors:** Desktop displays reserve dynamic margins allowing dashboard cards to expand or dock into split pane views (e.g., 60% Focus Editor, 40% Live Syllabus/Timer).

## Elevation & Depth
Depth avoids heavy, opaque dropshadows in favor of translucent dark luminescence, layered refraction, and razor edge treatments:

- **Level 0 (Base Canvas):** `#0B0F17`, no shadow, zero offset.
- **Level 1 (Panels & Group Cards):** `#111827` fill at `85%` opacity with `backdrop-filter: blur(12px)`. Outlined by an ultra-crisp border: `1px solid rgba(255, 255, 255, 0.08)`.
- **Level 2 (Interactive Floating Modules):** `#182234` fill, `1px solid rgba(255, 255, 255, 0.12)`, ambient box-shadow: `0 8px 32px -4px rgba(0, 0, 0, 0.5)`. Includes an ultra-fine inset highlight: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`.
- **Level 3 (Command Overlays & Modals):** `#1E293B` at `95%` opacity with `backdrop-filter: blur(20px)`, outer shadow: `0 24px 64px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.14)`.
- **Electric Accent Glow:** Used selectively on primary state items: `box-shadow: 0 0 20px -3px rgba(99, 102, 241, 0.35)`.

## Shapes
The structural geometry utilizes Level 2 roundedness to maintain a technical, hardware-inspired finish:
- **Base Elements & Badges:** `rounded` (0.5rem / 8px) for chips, keyboard kbd badges, and segmented toggles.
- **Inputs & Standard Buttons:** `rounded-lg` (0.75rem / 12px) for interactive controls and nested items.
- **Dashboard Modules & Dialogs:** `rounded-xl` (1rem / 16px) for major workspace surfaces and floating modals.
- **Status Indicators:** Pill-shaped (`rounded-full`) reserved strictly for live state indicators, avatars, and concentric progress tracks.

## Components

### Buttons
- **Primary Glow:** Gradient field (`#6366F1` to `#4F46E5`) backed by an electric drop glow `0 0 16px rgba(99,102,241,0.4)`. Inset white hairline highlight on the top edge. Font: `label-md` in pure white.
- **Secondary Glass:** Background `#182234` with `1px solid rgba(255, 255, 255, 0.08)`. Hover introduces a brighter perimeter `rgba(255, 255, 255, 0.18)` and shifts background to `#1E293B`.
- **Subtle Ghost:** Transparent fill with muted text (`#94A3B8`). On hover, transitions to `rgba(255, 255, 255, 0.05)` fill and crisp `#F8FAFC` text.
- **Danger:** Surface tint `rgba(244, 63, 94, 0.12)` bordered by `rgba(244, 63, 94, 0.3)`. Text renders in `#F43F5E`, switching to solid `#F43F5E` fill with white text upon destructive hover.

### Badges & Telemetry Tags
- **Urgent / Exam Deadlines:** Background `rgba(244, 63, 94, 0.12)`, border `rgba(244, 63, 94, 0.25)`, text `#F43F5E`, paired with a pulsing 6px indicator pip.
- **In-Progress Focus:** Background `rgba(6, 182, 212, 0.12)`, border `rgba(6, 182, 212, 0.25)`, text `#06B6D4`.
- **Streak & Completed:** Background `rgba(16, 185, 129, 0.12)`, border `rgba(16, 185, 129, 0.25)`, text `#10B981`.
- **Due Soon:** Background `rgba(245, 158, 11, 0.12)`, border `rgba(245, 158, 11, 0.25)`, text `#F59E0B`.

### Progress Indicators
- **Concentric Circular Rings:** Background track `rgba(255, 255, 255, 0.05)` with `stroke-width: 6px`. Active gauge strokes render in gradient Cyan-to-Indigo with rounded endpoints and centered tabular percentage metrics.
- **Multi-Segment Coursework Bars:** 4px high segmented bar with 2px gap divisions. Finished units light up with Emerald or Indigo, pending units retain `rgba(255,255,255,0.08)`.

### Input Fields & Search Bars
- Background `#111827`, border `1px solid rgba(255, 255, 255, 0.08)`. Active focus triggers an Indigo outer line `1px solid #6366F1` and a soft ambient glow `0 0 0 3px rgba(99, 102, 241, 0.2)`.
- Includes trailing keyboard shortcut pills (`<kbd>`) styled with `JetBrains Mono`, background `rgba(255, 255, 255, 0.06)`, and border `rgba(255, 255, 255, 0.12)`.

### Cards & Modular Tiles
- Encased in `Level 1` or `Level 2` layered glass. Cards feature a dedicated header zone separated by an ultra-thin horizontal divider `rgba(255, 255, 255, 0.06)`, containing title, category badge, and an action trigger.

### Checkboxes & Selection Controls
- Custom squared 18px box with 5px radius (`rounded`). Unchecked: border `rgba(255, 255, 255, 0.2)` on background `rgba(255, 255, 255, 0.02)`. Checked: solid `#6366F1` with an interior crisp white SVG checkmark.

### Tab Bars
- Understated segmented dock with pill containers. Active tab is elevated via a subtle glass surface (`#1E293B`), fine border (`rgba(255, 255, 255, 0.12)`), and white text, gliding seamlessly above a recessed background base.