# Chess Coin Decorative Layer

A premium, lightweight decorative system using animated chess piece SVG "coins" with Framer Motion.

## Components

- **ChessCoin**: Individual animated chess piece
- **ChessCoinLayer**: Container that renders coins for a specific section
- **coins.config.json**: Configuration file defining coin positions

## Usage

```tsx
import ChessCoinLayer from '@/components/ChessCoin/ChessCoinLayer';

<section className="relative">
  <ChessCoinLayer section="hero" />
  {/* Your section content */}
</section>
```

## Configuration

Edit `coins.config.json` to customize coin positions:

```json
{
  "section": "hero",        // Section identifier
  "type": "king",           // Chess piece type
  "size": 180,              // Size in pixels
  "x": 8,                   // X position (percentage)
  "y": 12,                  // Y position (percentage)
  "opacity": 0.08,          // Opacity (0-1)
  "rotation": -6,           // Initial rotation in degrees
  "depth": -2               // Depth layer: -2 (back), -1 (middle), 0 (foreground)
}
```

## Depth Layers

- **-2 (Back)**: Extremely faint (6-8% opacity), large pieces (120-220px), slowest parallax
- **-1 (Middle)**: Mid opacity (10-14%), medium pieces (64-140px), medium parallax
- **0 (Foreground)**: Slightly higher opacity (14-18%), small pieces (28-72px), hover effects

## Customization

### Colors

Chess coins use semantic color tokens from the design system:
- `text-primary/80` - Purple brand color
- `text-foreground/70` - Near-black
- `text-purple-600/75` - Muted purple
- `text-gray-800/65` - Warm gray

To change colors, edit the `colorClass` useMemo in `ChessCoin.tsx`.

### Sizes

Adjust sizes in `coins.config.json`:
- Back layer: 120-220px
- Middle layer: 64-140px  
- Foreground layer: 28-72px

### Animation Speed

Edit animation durations in `ChessCoin.tsx`:
- Bobbing: Currently 7-12s based on depth
- Parallax: Adjust `parallaxMultiplier` values
- Entrance: Currently 0.8s

### Responsive Behavior

Automatically adjusts coin count:
- Mobile (<768px): 3-4 coins (back/middle only)
- Tablet (768-1023px): 6-8 coins
- Desktop (≥1024px): All coins

## Accessibility

- All coins have `aria-hidden="true"`
- Respects `prefers-reduced-motion`
- No keyboard focus interference
- Does not block interactive elements

## Performance

- GPU-accelerated transforms only
- `will-change: transform` for optimization
- Lazy-loaded SVG sprite with `<use>` references
- Tree-shakeable imports

## Reduced Motion

When user prefers reduced motion:
- Disables bobbing animation
- Disables scroll parallax
- Keeps only fade-in entrance

## Testing

Toggle reduced motion in browser DevTools:
1. Open DevTools
2. Command Palette (Cmd/Ctrl + Shift + P)
3. Type "Emulate CSS prefers-reduced-motion"
4. Select "prefers-reduced-motion: reduce"
