import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';

export type ChessPieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';

export interface ChessCoinProps {
  type: ChessPieceType;
  size: number;
  x: number; // percentage
  y: number; // percentage
  opacity: number;
  rotation: number;
  depth: -2 | -1 | 0; // back, middle, foreground
  scrollY?: number;
  className?: string;
}

const ChessCoin = ({
  type,
  size,
  x,
  y,
  opacity,
  rotation,
  depth,
  scrollY = 0,
  className = '',
}: ChessCoinProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Calculate parallax offset based on depth
  const parallaxMultiplier = useMemo(() => {
    switch (depth) {
      case -2: return 0.02; // slowest (back layer)
      case -1: return 0.04; // medium
      case 0: return 0.06; // fastest (foreground)
      default: return 0;
    }
  }, [depth]);

  const parallaxY = prefersReducedMotion ? 0 : scrollY * parallaxMultiplier;

  // Determine interaction based on depth
  const isInteractive = depth >= -1;
  const pointerEvents = depth === 0 ? 'auto' : 'none';

  // Bobbing duration based on depth
  const bobbingDuration = depth === -2 ? 12 : depth === -1 ? 9 : 7;

  // Metallic color variations
  const colorStyle = useMemo(() => {
    const variations = [
      { filter: 'brightness(1.05) contrast(1.1)' },
      { filter: 'brightness(0.98) contrast(1.15) hue-rotate(260deg)' }, // purple tint
      { filter: 'brightness(1.02) contrast(1.08)' },
      { filter: 'brightness(0.95) contrast(1.12)' },
    ];
    return variations[Math.floor(Math.random() * variations.length)];
  }, []);

  return (
    <motion.div
      className={`absolute ${className} chess-coin`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        pointerEvents,
        willChange: 'transform',
        zIndex: depth === -2 ? -2 : depth === -1 ? -1 : 0,
        ...colorStyle,
      }}
      onHoverStart={() => !prefersReducedMotion && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={
        prefersReducedMotion
          ? {
              opacity,
              scale: 1,
              rotate: rotation,
              y: parallaxY,
            }
          : {
              opacity,
              scale: 1,
              rotate: rotation,
              y: [parallaxY, parallaxY - 6, parallaxY],
              transition: {
                y: {
                  duration: bobbingDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: Math.random() * 2,
                },
                opacity: { duration: 0.8, delay: Math.random() * 0.3 },
                scale: { duration: 0.8, delay: Math.random() * 0.3 },
              },
            }
      }
      whileHover={
        isInteractive && !prefersReducedMotion
          ? {
              scale: 1.08,
              rotate: rotation + (Math.random() > 0.5 ? 8 : -8),
              y: parallaxY - 6,
              rotateY: 15,
              transition: { duration: 0.3, ease: 'easeOut' }
            }
          : undefined
      }
      whileTap={
        isInteractive && !prefersReducedMotion
          ? { scale: 0.96, transition: { duration: 0.1 } }
          : undefined
      }
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          style={{
            filter: `drop-shadow(0 2px 8px rgba(139, 92, 246, ${isHovered ? 0.3 : 0.1}))`
          }}
        >
          <use href={`/chess-sprite.svg#chess-${type}`} />
        </svg>
        
        {/* Metallic shine effect on hover */}
        {isHovered && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: [0, 1, 0], x: ['100%', '-100%'] }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ mixBlendMode: 'overlay' }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ChessCoin;
