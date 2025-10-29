import { useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import ChessCoin, { ChessCoinProps } from './ChessCoin';
import coinsConfig from './coins.config.json';

export type SectionType = 'hero' | 'programs' | 'testimonials' | 'achievements' | 'features' | 'footer';

interface ChessCoinLayerProps {
  section: SectionType;
  className?: string;
}

interface CoinConfig extends Omit<ChessCoinProps, 'scrollY'> {
  section: string;
}

const ChessCoinLayer = ({ section, className = '' }: ChessCoinLayerProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const scrollYValue = useTransform(scrollY, [0, 1000], [0, 1000]);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYValue.on('change', (latest) => {
      setCurrentScrollY(latest);
    });
    return () => unsubscribe();
  }, [scrollYValue]);

  // Filter coins for this section
  const sectionCoins = (coinsConfig as CoinConfig[]).filter(
    (coin) => coin.section === section
  );

  // Responsive coin filtering
  const [visibleCoins, setVisibleCoins] = useState(sectionCoins);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        // Mobile: only show back and middle layer coins (3-4 total)
        setVisibleCoins(sectionCoins.filter((coin) => coin.depth <= -1).slice(0, 4));
      } else if (width < 1024) {
        // Tablet: show 6-8 coins
        setVisibleCoins(sectionCoins.slice(0, 8));
      } else {
        // Desktop: show all coins
        setVisibleCoins(sectionCoins);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [section]);

  if (!isMounted) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {visibleCoins.map((coin, index) => (
        <ChessCoin
          key={`${section}-${coin.type}-${index}`}
          type={coin.type as ChessCoinProps['type']}
          size={coin.size}
          x={coin.x}
          y={coin.y}
          opacity={coin.opacity}
          rotation={coin.rotation}
          depth={coin.depth as ChessCoinProps['depth']}
          scrollY={currentScrollY}
        />
      ))}
    </div>
  );
};

export default ChessCoinLayer;
