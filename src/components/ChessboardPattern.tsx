interface ChessboardPatternProps {
  opacity?: number;
}

const ChessboardPattern = ({ opacity = 0.06 }: ChessboardPatternProps) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern 
            id="chessboard-subtle" 
            x="0" 
            y="0" 
            width="100" 
            height="100" 
            patternUnits="userSpaceOnUse"
          >
            <rect width="50" height="50" fill="#000000" fillOpacity="0.03" />
            <rect x="50" width="50" height="50" fill="transparent" />
            <rect y="50" width="50" height="50" fill="transparent" />
            <rect x="50" y="50" width="50" height="50" fill="#000000" fillOpacity="0.03" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chessboard-subtle)" />
      </svg>
    </div>
  );
};

export default ChessboardPattern;
