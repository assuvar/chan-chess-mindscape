import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FloatingChessPieces = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const pieces = containerRef.current.querySelectorAll('.chess-piece');
    
    pieces.forEach((piece, i) => {
      gsap.to(piece, {
        y: `${Math.sin(i) * 30}px`,
        x: `${Math.cos(i) * 20}px`,
        rotation: Math.sin(i) * 15,
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.5,
      });
    });
  }, []);

  const chessPieces = [
    { icon: '♔', top: '10%', left: '5%' },
    { icon: '♕', top: '20%', right: '8%' },
    { icon: '♖', bottom: '15%', left: '10%' },
    { icon: '♗', top: '60%', right: '12%' },
    { icon: '♘', top: '40%', left: '15%' },
    { icon: '♙', bottom: '25%', right: '20%' },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {chessPieces.map((piece, i) => (
        <div
          key={i}
          className="chess-piece absolute text-6xl opacity-5"
          style={{
            top: piece.top,
            bottom: piece.bottom,
            left: piece.left,
            right: piece.right,
          }}
        >
          {piece.icon}
        </div>
      ))}
    </div>
  );
};

export default FloatingChessPieces;
