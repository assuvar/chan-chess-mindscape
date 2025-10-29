# Premium Chess Coin Decorative Layer

A luxury decorative system using metallic engraved chess piece "coins" with Framer Motion animations and scroll-reactive effects.

## Components

- **ChessCoin**: Individual animated metallic chess piece coin
- **ChessCoinLayer**: Container that renders coins for a specific section
- **coins.config.json**: Configuration file defining coin positions across all sections

## Design Philosophy

Classic Staunton-style chess pieces rendered as premium metallic coins with:
- Light silver + graphite metal tones with subtle purple brand accents
- Minimal engraved coin effect with subtle shadows
- Soft noise texture for realistic metallic feel
- Premium, sleek, and elegant aesthetic

## Usage

```tsx
import ChessCoinLayer from '@/components/ChessCoin/ChessCoinLayer';

<section className="relative overflow-hidden">
  <ChessCoinLayer section="hero" />
  <div className="relative z-10">
    {/* Your section content */}
  </div>
</section>
```

## Size Guidelines

Coins are dynamically sized based on their role:

- **Hero section**: 200–280px (largest, background presence)
- **Section backgrounds**: 120–180px (medium decorative)
- **Foreground accents**: 48–90px (near CTAs and headings)
- **Tiny accents**: 24–48px (edge details)

## Configuration

Edit `coins.config.json` to customize coin positions:

```json
{
  "section": "hero",        // Section: hero, features, programs, testimonials, achievements, footer
  "type": "king",           // Piece: king, queen, rook, bishop, knight, pawn
  "size": 240,              // Size in pixels
  "x": 6,                   // X position (percentage 0-100)
  "y": 10,                  // Y position (percentage 0-100)
  "opacity": 0.07,          // Opacity (0-1, recommended: 0.06-0.18)
  "rotation": -8,           // Initial rotation in degrees
  "depth": -2               // Depth layer: -2 (back), -1 (middle), 0 (foreground)
}
```

## Depth Layers

- **-2 (Back)**: Extremely faint (6-8% opacity), largest pieces (160-280px), slowest parallax
- **-1 (Middle)**: Mid opacity (9-14%), medium pieces (95-150px), medium parallax
- **0 (Foreground)**: Higher opacity (14-18%), small pieces (32-90px), interactive hover effects

## Animations

### Scroll Parallax
Different speeds per depth layer create immersive depth:
- Back layer: Slowest movement (0.02x scroll)
- Middle layer: Medium movement (0.04x scroll)
- Foreground layer: Fastest movement (0.06x scroll)

### Hover Effects (Desktop Only)
Interactive coins (middle & foreground) respond to hover:
- Scale up (1.08x)
- Slight rotation (±8°)
- Lift upward (y: -6px)
- 3D tilt effect (rotateY: 15°)
- Metallic shine sweep (gradient overlay animation)
- Purple glow shadow enhancement

### Idle Motion
Gentle floating bobbing animation:
- Back layer: 12s duration
- Middle layer: 9s duration
- Foreground layer: 7s duration
- Vertical movement: -6px to 0px

### Entrance Animation
Staggered fade-in with scale:
- Initial: opacity 0, scale 0.98
- Animate to: opacity (configured), scale 1
- Duration: 0.8s with random delays

## Visual Styling

### Metallic Effect
- Radial gradients for brushed metal appearance
- Light silver (#e8eaed) to graphite (#6b7280)
- Subtle inner shadows for depth
- Random color variations with purple tint option

### Shine Effect
On hover, a metallic shine sweeps across the coin:
- White gradient overlay
- Diagonal movement animation
- Mix-blend-mode: overlay for realistic reflection
- 0.8s duration

### Shadow Effects
- Base coin shadow: 0 2px 8px rgba(0,0,0,0.15)
- Hover purple glow: 0 2px 8px rgba(139,92,246,0.3)
- Drop shadow filter for depth

## Performance Optimization

- **GPU Acceleration**: All transforms use `will-change: transform`
- **Optimized SVGs**: Clean paths, <10kb each, shared gradients
- **Lazy Loading**: SVG sprite loaded once, referenced via `<use>`
- **Tree Shaking**: Code-split by section
- **Reduced Motion**: Automatically disables animations when user prefers reduced motion

## Responsive Behavior

Automatically adjusts coin count and sizes:
- **Mobile** (<768px): 3-4 coins, back/middle layers only, no hover
- **Tablet** (768-1023px): 6-8 coins, simplified animations
- **Desktop** (≥1024px): All coins, full interactivity

## Chess Piece Designs

Each piece follows classic Staunton style with clear identification:

- **King**: Cross on top, spherical crown, tapered body
- **Queen**: Multiple crown spheres (5 points), elegant curved body
- **Rook**: Castle battlements (crenellations), tower body
- **Bishop**: Top sphere with cross slit, pointed mitre (split helmet)
- **Knight**: Horse head profile with mane details, nostril, eye
- **Pawn**: Round head, simple tapered body

## Color Customization

Coins use filter effects for color variation:
```js
// In ChessCoin.tsx, edit colorStyle variations:
{ filter: 'brightness(1.05) contrast(1.1)' },              // Standard silver
{ filter: 'brightness(0.98) contrast(1.15) hue-rotate(260deg)' }, // Purple tint
{ filter: 'brightness(1.02) contrast(1.08)' },             // Bright silver
{ filter: 'brightness(0.95) contrast(1.12)' },             // Dark graphite
```

## Accessibility

- All coins have `aria-hidden="true"` (purely decorative)
- Respects `prefers-reduced-motion` (disables animations)
- No keyboard focus capture
- Never blocks interactive elements (proper z-index layering)
- Pointer events disabled for background layers

## Section Integration

Coins integrated across all major sections:
- **Hero**: 9 coins (signature brand theme, strongest presence)
- **Features**: 7 coins
- **Programs**: 7 coins
- **Testimonials**: 7 coins
- **Achievements**: 7 coins
- **Footer**: 6 coins

Total: 43 coins distributed elegantly across the site.

## Testing Reduced Motion

Toggle in browser DevTools:
1. Open DevTools (F12)
2. Command Palette (Cmd/Ctrl + Shift + P)
3. Type "Emulate CSS prefers-reduced-motion"
4. Select "prefers-reduced-motion: reduce"

Result: Animations disabled, only fade-in remains.

## Performance Targets

- **Lighthouse Score**: >90
- **Bundle Size**: <50kb total (including SVGs)
- **FPS**: 60fps on desktop, 30fps on mobile
- **CLS**: <0.1 (no layout shift)

## Future Enhancements

Potential additions:
- Scroll velocity-reactive rotation
- Mouse parallax tracking (advanced depth)
- Click interaction (coin flip animation)
- Randomized entrance patterns
- Seasonal color themes
