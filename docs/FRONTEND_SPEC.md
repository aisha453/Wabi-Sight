# FRONTEND SPECIFICATION & DESIGN SYSTEM MANUAL
## Project: 🪨 The Stone & Cloud Oracle (Micro-Meditations from Nature's Shapes)
## Target: Hacktoberfest 2026 — "Touch Grass" Challenge

> [!IMPORTANT]
> **STRICT COMPLIANCE REQUIRED FOR ANTIGRAVITY CODING AGENT**:
> Every component, style token, dimension, font size, animation spring, and color hex in this document MUST be followed verbatim. Do NOT invent alternative styles, random layouts, or arbitrary CSS variables.

---

## 1. Peaceful Art Direction: "Bioluminescent Sumi-e & Shinrin-Yoku"

The visual aesthetic fuses the ancient Japanese art of **Sumi-e (ink wash painting)** with the serene, organic mystery of **Shinrin-yoku (forest bathing)** and **subtle bioluminescence**.

- **Atmosphere**: Deep, velvety forest twilight. The UI feels like walking through an ancient mossy grove where fireflies quietly pulse and stones hold gentle warmth.
- **Lighting Model**: Emissive from within. Elements don't use harsh drop shadows; instead, they cast soft, radial ambient bioluminescent glows (`#2DD4BF` and `#F59E0B`).
- **Tactile Feedback**: Soft spring physics that mimic natural inertia (like water droplets, gentle bamboo rebound, or floating spores).
- **Peaceful Art Elements**:
  - Fine organic hairline rings (concentric ripples).
  - Floating canvas firefly spores that gently wander in response to ambient movement.
  - Soft frosted glassmorphism that diffuses the background into calm water-like reflections.

---

## 2. Complete Color Palette & Design Tokens

### Semantic Palette Table
| Token Name | Hex Code | Tailwind Equivalent / Usage | Semantic Purpose |
| :--- | :--- | :--- | :--- |
| `color-void` | `#060A08` | `bg-[#060A08]` | Primary app canvas background (deep forest night) |
| `color-surface-base` | `#0C140F` | `bg-[#0C140F]` | Primary container / card surface background |
| `color-surface-elevated`| `#132018` | `bg-[#132018]` | Elevated cards, bottom sheets, modal containers |
| `color-glass` | `rgba(14, 26, 19, 0.72)` | `bg-[#0e1a13]/70 backdrop-blur-md` | Translucent frosted glass panels |
| `color-border-subtle` | `rgba(45, 212, 191, 0.12)` | `border-[#2dd4bf]/10` | 1px peaceful hairline borders on cards |
| `color-border-glow` | `rgba(45, 212, 191, 0.35)` | `border-[#2dd4bf]/35` | Active/focused element borders |
| `color-emerald-glow` | `#2DD4BF` | `text-[#2DD4BF]` / `shadow-[#2DD4BF]/30`| Primary bioluminescent accent & particle glow |
| `color-moss-leaf` | `#4ADE80` | `text-[#4ADE80]` | Organic vegetation tag & success indicator |
| `color-firefly-gold` | `#F59E0B` | `text-[#F59E0B]` / `shadow-[#F59E0B]/30`| Sunset warmth, wisdom accent, celebration badge |
| `color-twilight-slate`| `#94A3B8` | `text-slate-400` | Secondary metadata, labels, and timestamps |
| `color-text-bright` | `#F8FAFC` | `text-slate-50` | Primary headings, button text, poetic revelations |
| `color-text-body` | `#CBD5E1` | `text-slate-300` | Regular body copy and instructions |
| `color-dim-backdrop` | `#030504` | `bg-[#030504]` | Screen-dimming meditative breathing background |

### CSS Variables Root Configuration (`src/index.css`)
```css
:root {
  --color-void: #060a08;
  --color-surface-base: #0c140f;
  --color-surface-elevated: #132018;
  --color-glass: rgba(14, 26, 19, 0.72);
  --color-border-subtle: rgba(45, 212, 191, 0.12);
  --color-border-glow: rgba(45, 212, 191, 0.35);
  --color-emerald-glow: #2dd4bf;
  --color-moss-leaf: #4ade80;
  --color-firefly-gold: #f59e0b;
  --color-text-bright: #f8fafc;
  --color-text-body: #cbd5e1;
  --color-text-muted: #94a3b8;
}
```

---

## 3. Typography Scale & Font Hierarchy

### Font Families
1. **Poetic Serif (Display & Revelation Quotes)**: `'Playfair Display', serif`
   - *Alternative fallback*: `'Cinzel', 'Georgia', serif`
   - *Role*: The Oracle's poetic visions, sacred reflections, and title logo.
2. **Interface Sans (Headings, Body, Buttons, Status)**: `'Plus Jakarta Sans', sans-serif`
   - *Alternative fallback*: `'Inter', sans-serif`
   - *Role*: Clean, highly legible UI labels, circadian status chips, button actions.

### Exact Typographic Hierarchy Table
| Text Role | Font Family | Weight | Size (rem / px) | Line Height | Tracking | Color Token |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Plus Jakarta Sans | 700 (Bold) | `1.25rem` (20px) | `1.4` | `-0.01em` | `color-text-bright` |
| **Poetic Revelation** | Playfair Display | 600 (SemiBold) | `1.25rem` (20px) | `1.6` | `0` | `color-text-bright` |
| **Philosophical Insight**| Plus Jakarta Sans | 400 (Regular) | `0.9375rem` (15px)| `1.5` | `0` | `color-text-body` |
| **Touch Grass Prompt** | Plus Jakarta Sans | 600 (SemiBold) | `1.0rem` (16px) | `1.45` | `0.01em` | `color-emerald-glow`|
| **Circadian Chip** | Plus Jakarta Sans | 500 (Medium) | `0.75rem` (12px) | `1.2` | `0.03em` | `color-moss-leaf` |
| **Button Primary** | Plus Jakarta Sans | 600 (SemiBold) | `1.0rem` (16px) | `1.0` | `0.02em` | `color-void` |
| **Button Secondary** | Plus Jakarta Sans | 500 (Medium) | `0.875rem` (14px)| `1.0` | `0` | `color-text-muted` |
| **Timer Countdown** | Playfair Display | 500 (Medium) | `3.5rem` (56px) | `1.0` | `-0.02em` | `color-emerald-glow`|
| **Metadata / Badges**| Plus Jakarta Sans | 600 (SemiBold) | `0.6875rem` (11px)| `1.2` | `0.05em` | `color-firefly-gold`|

---

## 4. Mobile Viewport Layout & Screen Geometry

### Base Frame Dimensions
- **Mobile Viewport Target**: Responsive standard for 390px to 430px width (iPhone 14/15/16, Galaxy S24, Pixel 8).
- **Height Constraints**: Uses `min-h-[100dvh]` (Dynamic Viewport Height) to prevent clipping behind mobile Safari address bars and Android bottom gestures.
- **Desktop/Laptop Preview Container**:
  - Centered mobile frame (`max-w-[420px]`, `w-full`, `min-h-[100dvh]`).
  - Outside on desktop: Deep velvet forest wallpaper with ambient radial glow (`radial-gradient(circle at center, #0C1E14 0%, #040805 100%)`).

### Z-Index Layering Hierarchy
| Layer | Z-Index | Component / Element |
| :--- | :--- | :--- |
| **Layer 0 (Background)** | `z-0` | Canvas Firefly Particle Simulation (`FireflyCanvas.tsx`) |
| **Layer 1 (Content)** | `z-10` | Header Bar, Ambient Portal, Status indicators |
| **Layer 2 (Actions)** | `z-20` | Bottom Floating Action Deck (Shutter button, Upload link) |
| **Layer 3 (Sheets)** | `z-30` | Revelation Card Drawer, Field Journal Drawer |
| **Layer 4 (Immersion)** | `z-40` | Screen-Dimming Breathing Coach Full-Screen Takeover |
| **Layer 5 (Overlays)** | `z-50` | Singing bowl chime animation, Toast notices, Audio visualizer |

---

## 5. Detailed Component Wireframes & Layout Specs

```
+-------------------------------------------------------+
|  [🌿 The Oracle]         [🌲 Sunset • 21°C • Water]  [📖 4]  |  <- Top Header (h-14, px-4)
+-------------------------------------------------------+
|                                                       |
|                                                       |
|                  .  *     +                           |  <- Canvas Fireflies
|                       *        .                      |     (floating in z-0)
|                                                       |
|               /---------------------\                 |
|              /   ( ( (  🌟  ) ) )    \                |  <- Ambient Portal
|             |      BREATHING ORB      |               |     (w-64 h-64, rounded-full)
|             |   Bioluminescent Aura   |               |     concentric ripple rings
|              \                       /                |
|               \---------------------/                 |
|                                                       |
|             "Notice the quiet geometry"               |  <- Poetic Hint (text-sm, text-slate-400)
|             "Ripples • Bark • Clouds"                 |
|                                                       |
+-------------------------------------------------------+
|                                                       |
|               [ 📸  Awaken the Oracle  ]               |  <- Primary Shutter (h-14, w-full, rounded-2xl)
|                                                       |     Pulsing Emerald Glow
|                 or select from gallery                |  <- Secondary link (text-xs, text-slate-500)
|                                                       |
+-------------------------------------------------------+
```

---

### Component 1: `Header.tsx` (Top Navigation Bar)
- **Position**: `sticky top-0 z-10 w-full`
- **Height**: `56px` (`h-14`)
- **Padding**: `px-4 flex items-center justify-between`
- **Background**: `bg-[#060a08]/80 backdrop-blur-md border-b border-[#2dd4bf]/10`
- **Sub-elements**:
  1. **Logo & Identity** (Left):
     - Icon: `Sparkles` or `Compass` from `lucide-react` (`w-5 h-5 text-[#2dd4bf]`).
     - Title: `"The Oracle"` in Plus Jakarta Sans 700, 16px, text-slate-100.
  2. **Circadian Weather Pill** (Center):
     - Container: `rounded-full px-3 py-1 bg-[#132018] border border-[#2dd4bf]/20 flex items-center gap-1.5`.
     - Icon: `Sun` or `Moon` (`w-3.5 h-3.5 text-[#f59e0b]`).
     - Text: `"Dusk • 21°C • Water"` (11px, font-medium, text-slate-300).
  3. **Journal Trigger Button** (Right):
     - Container: `w-9 h-9 rounded-full bg-[#132018] border border-[#2dd4bf]/20 flex items-center justify-center relative`.
     - Icon: `BookOpen` (`w-4 h-4 text-[#2dd4bf]`).
     - Badge: Small pill on top-right showing entry count (`w-4 h-4 rounded-full bg-[#f59e0b] text-[#060a08] text-[10px] font-bold flex items-center justify-center`).

---

### Component 2: `AmbientPortal.tsx` (The Central Visual Stage)
- **Position**: `flex-1 flex flex-col items-center justify-center relative py-6`
- **The Core Orb**:
  - Dimensions: `240px × 240px` (`w-60 h-60` on mobile, `w-72 h-72` on larger screens).
  - Shape: `rounded-full relative flex items-center justify-center`.
  - Outer Glow: `box-shadow: 0 0 45px rgba(45, 212, 191, 0.25), inset 0 0 35px rgba(45, 212, 191, 0.15)`.
  - Border: Multi-layered concentric SVG circles with subtle animated dash-offset rotation.
- **Three Core Visual States**:
  1. **Idle State**:
     - The orb expands and contracts smoothly with breathing keyframes (`scale: [1, 1.05, 1]` over 4.5s).
     - Inner glyph: A glowing minimalist sumi-e circle (Ensō glyph) or calm stone icon.
     - Prompt text below orb: `"Find a fleeting pattern in the world..."` (13px, Playfair Display italic, text-slate-400).
  2. **Analyzing State**:
     - The orb spins an ethereal gradient border (`conic-gradient(from 0deg, #2dd4bf, #f59e0b, #4ade80, #2dd4bf)`).
     - Inner text: `"The Oracle is dreaming..."` (14px, Plus Jakarta Sans, text-[#2dd4bf] animate-pulse).
  3. **Preview State**:
     - Displays the circular-cropped snapshot framed with a radiant glowing border ring.

---

### Component 3: `FireflyCanvas.tsx` (Peaceful Ambient Particles)
- **Position**: `absolute inset-0 pointer-events-none z-0`
- **Physics Engine**:
  - Spawns 20 firefly particles.
  - Each particle has:
    - `x, y`: position.
    - `radius`: `1.2px` to `2.8px`.
    - `color`: `rgba(45, 212, 191, alpha)` or `rgba(245, 158, 11, alpha)`.
    - `alpha`: Sinusoidal pulsing between `0.1` and `0.85` with independent frequencies.
    - `vx, vy`: Gentle Brownian drift (`-0.3` to `+0.3` px/frame).
  - Renders to `<canvas>` via `requestAnimationFrame` with zero CPU overhead.

---

### Component 4: `ActionDeck.tsx` (Bottom Floating Controls)
- **Position**: `w-full px-6 pb-8 pt-3 flex flex-col items-center gap-3 z-20`
- **Primary Shutter Button**:
  - Width: `w-full max-w-[340px]`
  - Height: `56px` (`h-14`)
  - Border Radius: `rounded-2xl` (`16px`)
  - Background: `bg-gradient-to-r from-[#2dd4bf] via-[#34d399] to-[#2dd4bf]`
  - Shadow: `shadow-[0_0_25px_rgba(45,212,191,0.4)]`
  - Content: `flex items-center justify-center gap-3`
    - Icon: `Camera` (`w-5 h-5 text-[#060a08]`)
    - Label: `"Awaken the Oracle"` (Plus Jakarta Sans 700, 16px, text-[#060a08])
  - Interaction: Uses `<input type="file" accept="image/*" capture="environment" id="camera-input" class="hidden">` triggered on click.
- **Secondary Gallery Button**:
  - Text: `"or choose from nature gallery"` (12px, text-slate-400 hover:text-slate-200 underline cursor-pointer).
  - Triggers standard file picker without `capture` attribute for saved trail photos.

---

### Component 5: `RevelationModal.tsx` (The Oracle's Revelation Card)
- **Position**: Framer Motion bottom-sheet modal (`fixed inset-x-0 bottom-0 z-30 max-w-[420px] mx-auto`)
- **Background**: `bg-[#0c140f]/95 backdrop-blur-xl border-t border-[#2dd4bf]/25 rounded-t-3xl p-6 shadow-2xl`
- **Layout & Structure**:
  1. **Top Drag Handle**: `w-12 h-1.5 rounded-full bg-slate-700 mx-auto mb-4`
  2. **Category & Element Tag**:
     - Badge: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#132018] border border-[#2dd4bf]/25 text-[11px] font-semibold text-[#f59e0b] uppercase tracking-wider mb-3`
     - Text: `🌿 Water Pattern • Concentric Rings`
  3. **The Vision (Poetic Metaphor)**:
     - Typography: Playfair Display 600, 19px, line-height 1.55, text-slate-50.
     - Content: *"These puddle ripples mirror the annual rings of an ancient cedar, expanding into the stillness."*
  4. **The Philosophical Reflection**:
     - Typography: Plus Jakarta Sans 400, 14px, line-height 1.5, text-slate-300 mt-2.
     - Content: *"Disturbance marks the surface for only a moment; the depth remains untouched."*
  5. **The Touch Grass Grounding Cue (Highlighted Box)**:
     - Container: `mt-4 p-4 rounded-2xl bg-[#132018] border border-[#2dd4bf]/30 flex items-start gap-3`
     - Icon: `Compass` or `Wind` (`w-5 h-5 text-[#2dd4bf] shrink-0 mt-0.5`)
     - Text: *"Set your phone face down in the grass. Close your eyes, feel the breeze, and take 5 slow breaths."* (14px, font-semibold, text-[#2dd4bf])
  6. **Action Buttons Deck**:
     - Primary Button: `[🌬️ Begin Grounding (30s)]` (h-12 w-full rounded-xl bg-[#2dd4bf] text-[#060a08] font-bold text-sm shadow-lg)
     - Audio Replay: `[🔊 Listen to Voice]` (h-10 w-full rounded-xl bg-[#132018] border border-[#2dd4bf]/20 text-slate-300 text-xs flex items-center justify-center gap-2 mt-2)

---

### Component 6: `BreathingCoach.tsx` (The Screen-Dimming Sanctuary)
- **Position**: `fixed inset-0 z-40 bg-[#030604] flex flex-col items-center justify-between p-8`
- **Philosophy**: Extreme minimalism. Dims the screen almost entirely, providing an unhurried, hypnotic organic breathing orb.
- **Layout**:
  1. **Top Subtle Prompt**:
     - Text: `"Eyes closed. Senses open."` (14px, Playfair Display italic, text-slate-500)
  2. **Center Breathing Orb**:
     - Outer Glow: `w-64 h-64 rounded-full border border-[#2dd4bf]/30 flex items-center justify-center relative`
     - Inner Fluid Core: Framer Motion animated circle that expands during Inhale (scale 1.5) and contracts during Exhale (scale 0.8) matching `breath_cadence_seconds`.
     - Center Text inside orb:
       - Mode Indicator: `"INHALE"` -> `"HOLD"` -> `"EXHALE"` (13px, tracking-widest, font-bold, text-[#2dd4bf])
       - Cycle Counter: `"Breath 3 of 5"` (11px, text-slate-400 mt-1)
  3. **Bottom Controls**:
     - Countdown Timer: `"00:24 remaining"` (12px, text-slate-600)
     - Emergency Exit: `"Tap anywhere to return"` (11px, text-slate-700)
- **Audio Climax**:
  - When the final breath completes, a high-fidelity **Tibetan Singing Bowl Chime (`singing_bowl.mp3`)** rings out with a long 6-second resonant decay.
  - Spawns a golden firefly particle burst celebration (`canvas-confetti` with `#2dd4bf` and `#f59e0b` colors).
  - Automatically transitions to the Field Journal.

---

### Component 7: `FieldJournalDrawer.tsx` (Wabi-Sabi Field Scrapbook)
- **Position**: Draggable bottom sheet (`fixed inset-x-0 bottom-0 z-30 max-h-[85vh] rounded-t-3xl bg-[#0c140f] border-t border-[#2dd4bf]/20 p-5 overflow-y-auto`)
- **Layout & Content**:
  - Header: `"Nature Scrapbook"` with count badge + close button.
  - Specimen Grid: 2-column responsive grid of past nature observations.
  - Card Design:
    - Aspect Ratio: `aspect-square rounded-2xl overflow-hidden border border-[#2dd4bf]/15 relative bg-[#132018]`
    - Image: Polaroid crop of the captured nature pattern.
    - Overlay Pill: Element badge (e.g. `[Water 💧]`, `[Stone 🪨]`).
    - Bottom caption: 1-line poetic snippet + timestamp.
    - Click action: Opens full inspection card with audio playback.

---

## 6. Framer Motion Animation Standards

```typescript
// Strict spring configurations to use throughout all components
export const transitions = {
  // Bouncy responsive spring for buttons and cards
  springBouncy: {
    type: "spring",
    stiffness: 340,
    damping: 22,
    mass: 0.8
  },
  // Calm, serene spring for modal entrance
  springCalm: {
    type: "spring",
    stiffness: 240,
    damping: 28,
    mass: 1.0
  },
  // Smooth breathing animation
  breathingPulse: (cadenceSeconds: number) => ({
    scale: [0.85, 1.35, 1.35, 0.85],
    opacity: [0.5, 0.95, 0.95, 0.5],
    transition: {
      duration: cadenceSeconds,
      times: [0, 0.45, 0.55, 1.0],
      repeat: Infinity,
      ease: "easeInOut"
    }
  })
};
```

---

## 7. Strict Implementation Guidelines for Coding Agent

1. **Zero Layout Shifts**: Always declare explicit dimensions on images and containers.
2. **Audio Autoplay Safety**: Always wrap audio play calls in a user-gesture handler or try/catch to satisfy mobile Safari autoplay policies.
3. **Touch Targets**: Every button must be at least 48px × 48px.
4. **Offline Capability**: All UI assets (icons via `lucide-react`, fonts loaded locally or pre-cached, singing bowl sound bundled in `/public/audio/singing_bowl.mp3`) must function completely offline.
