import React, { useMemo } from 'react';

const EQGraph = ({ genre, eqSettings, isPresetActive }) => {
   const width = 340; 
   const height = 240; 
   const padding = 25; 
   const graphWidth = width - 2 * padding;
   const graphHeight = height - 2 * padding;

   

   const generatePath = useMemo(() => {
      if (!isPresetActive) {
         console.log('Generating inactive path');
         return `M ${padding} ${height / 2} L ${width - padding} ${height / 2}`;
      }

      const points = [
         { x: padding + graphWidth / 5, y: height / 2 - eqSettings.subBass * (graphHeight / 10) },
         { x: padding + 2 * graphWidth / 5, y: height / 2 - eqSettings.bass * (graphHeight / 10) },
         { x: padding + 3 * graphWidth / 5, y: height / 2 - eqSettings.midrange * (graphHeight / 10) },
         { x: padding + 4 * graphWidth / 5, y: height / 2 - eqSettings.treble * (graphHeight / 10) }
      ];

      return `M ${padding} ${height / 2} 
               C ${(padding + points[0].x) / 2} ${height / 2}, 
               ${(padding + points[0].x) / 2} ${points[0].y}, 
               ${points[0].x} ${points[0].y}
               S ${(points[0].x + points[1].x) / 2} ${points[1].y}, 
               ${points[1].x} ${points[1].y}
               S ${(points[1].x + points[2].x) / 2} ${points[2].y}, 
               ${points[2].x} ${points[2].y}
               S ${(points[2].x + points[3].x) / 2} ${points[3].y}, 
               ${points[3].x} ${points[3].y}
               S ${(points[3].x + (width - padding)) / 2} ${height / 2}, 
               ${width - padding} ${height / 2}`;
   }, [eqSettings, isPresetActive]);

   const generateFillPath = useMemo(() => {
      if (!isPresetActive) {
         return '';
      }

      const points = [
         { x: padding + graphWidth / 5, y: height / 2 - eqSettings.subBass * (graphHeight / 10) },
         { x: padding + 2 * graphWidth / 5, y: height / 2 - eqSettings.bass * (graphHeight / 10) },
         { x: padding + 3 * graphWidth / 5, y: height / 2 - eqSettings.midrange * (graphHeight / 10) },
         { x: padding + 4 * graphWidth / 5, y: height / 2 - eqSettings.treble * (graphHeight / 10) }
      ];

      return `M ${padding} ${height / 2} 
               C ${(padding + points[0].x) / 2} ${height / 2}, 
               ${(padding + points[0].x) / 2} ${points[0].y}, 
               ${points[0].x} ${points[0].y}
               S ${(points[0].x + points[1].x) / 2} ${points[1].y}, 
               ${points[1].x} ${points[1].y}
               S ${(points[1].x + points[2].x) / 2} ${points[2].y}, 
               ${points[2].x} ${points[2].y}
               S ${(points[2].x + points[3].x) / 2} ${points[3].y}, 
               ${points[3].x} ${points[3].y}
               S ${(points[3].x + (width - padding)) / 2} ${height / 2}, 
               ${width - padding} ${height / 2}
               Z`;
   }, [eqSettings, isPresetActive]);

   return (
      <svg width={width} height={height + 70} viewBox={`0 0 ${width} ${height + 70}`}>
         <defs>
         <linearGradient id="eqGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0AD3F4" />
            <stop offset="100%" stopColor="#5279DE" />
         </linearGradient>
         <linearGradient id="fillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0AD3F4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#5279DE" stopOpacity="0.6" />
         </linearGradient>
         </defs>
         
         {/* Background */}
         <rect x={padding} y={padding} width={graphWidth} height={graphHeight} fill="#1a1a26" />
         
         {/* Horizontal grid lines */}
         {[...Array(11)].map((_, i) => (
         <line
            key={`h-${i}`}
            x1={padding}
            y1={padding + i * (graphHeight / 10)}
            x2={width - padding}
            y2={padding + i * (graphHeight / 10)}
            stroke="#333"
            strokeWidth="0.5"
         />
         ))}

         {/* Vertical grid lines */}
         {[0, 1, 2, 3, 4, 5].map((i) => (
         <line
            key={`v-${i}`}
            x1={padding + i * (graphWidth / 5)}
            y1={padding}
            x2={padding + i * (graphWidth / 5)}
            y2={height - padding}
            stroke="#333"
            strokeWidth="0.5"
         />
         ))}
         
         {/* EQ curve fill */}
         <path d={generateFillPath} fill="url(#fillGradient)" />
         
         {/* EQ curve or inactive state line */}
         <path d={generatePath} fill="none" stroke="url(#eqGradient)" strokeWidth="3" />
         
         {/* dB labels */}
         <text x="5" y={padding + 5} fill="#fff" fontSize="14">+5 dB</text>
         <text x="5" y={height / 2 + 5} fill="#fff" fontSize="14">0 dB</text>
         <text x="5" y={height - padding + 5} fill="#fff" fontSize="14">-5 dB</text>
         
         {/* Frequency labels */}
         <text x={padding + graphWidth / 5} y={height + 10} fill="#fff" fontSize="12" textAnchor="middle">Sub-bass</text>
         <text x={padding + graphWidth / 5} y={height + 25} fill="#fff" fontSize="12" textAnchor="middle">(60Hz)</text>

         <text x={padding + 2 * graphWidth / 5} y={height + 10} fill="#fff" fontSize="12" textAnchor="middle">Bass</text>
         <text x={padding + 2 * graphWidth / 5} y={height + 25} fill="#fff" fontSize="12" textAnchor="middle">(250Hz)</text>

         <text x={padding + 3 * graphWidth / 5} y={height + 10} fill="#fff" fontSize="12" textAnchor="middle">Midrange</text>
         <text x={padding + 3 * graphWidth / 5} y={height + 25} fill="#fff" fontSize="12" textAnchor="middle">(1kHz)</text>

         <text x={padding + 4 * graphWidth / 5} y={height + 10} fill="#fff" fontSize="12" textAnchor="middle">Treble</text>
         <text x={padding + 4 * graphWidth / 5} y={height + 25} fill="#fff" fontSize="12" textAnchor="middle">(8kHz)</text>
      </svg>
   );
};

export default EQGraph;