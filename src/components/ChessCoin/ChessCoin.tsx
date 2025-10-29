import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

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

  // Color based on brand palette
  const colorClass = useMemo(() => {
    const colors = [
      'text-primary/80',
      'text-foreground/70',
      'text-purple-600/75',
      'text-gray-800/65',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <motion.div
      className={`absolute ${colorClass} ${className}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        pointerEvents,
        willChange: 'transform',
        zIndex: depth === -2 ? -2 : depth === -1 ? -1 : 0,
      }}
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
              scale: 1.06,
              rotate: rotation + (Math.random() > 0.5 ? 5 : -5),
              y: parallaxY - 4,
            }
          : undefined
      }
      whileTap={
        isInteractive && !prefersReducedMotion
          ? { scale: 0.98 }
          : undefined
      }
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 64 64"
        className="drop-shadow-sm"
      >
        <use href={`/chess-sprite.svg#chess-${type}`} />
      </svg>
    </motion.div>
  );
};

export default ChessCoin;
