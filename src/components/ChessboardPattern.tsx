interface ChessboardPatternProps {
  variant?: 'light' | 'dark';
  opacity?: number;
}

const ChessboardPattern = ({ variant = 'light', opacity = 0.03 }: ChessboardPatternProps) => {
  const isDark = variant === 'dark';
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern 
            id={`chessboard-${variant}`} 
            x="0" 
            y="0" 
            width="80" 
            height="80" 
            patternUnits="userSpaceOnUse"
          >
            <rect width="40" height="40" fill={isDark ? "#000" : "#f5f5f5"} />
            <rect x="40" width="40" height="40" fill={isDark ? "#1a1a1a" : "#fff"} />
            <rect y="40" width="40" height="40" fill={isDark ? "#1a1a1a" : "#fff"} />
            <rect x="40" y="40" width="40" height="40" fill={isDark ? "#000" : "#f5f5f5"} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#chessboard-${variant})`} />
      </svg>
    </div>
  );
};

export default ChessboardPattern;
