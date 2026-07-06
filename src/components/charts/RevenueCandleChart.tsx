const candles = [
  [42, 31, 60, 52, "up"],
  [52, 44, 68, 61, "up"],
  [61, 38, 64, 42, "down"],
  [42, 37, 62, 57, "up"],
  [57, 51, 78, 71, "up"],
  [71, 54, 74, 60, "down"],
  [60, 41, 64, 48, "down"],
  [48, 42, 72, 66, "up"],
  [66, 61, 84, 78, "up"],
  [78, 53, 81, 59, "down"],
  [59, 40, 62, 47, "down"],
  [47, 42, 61, 55, "up"],
  [55, 48, 69, 63, "up"],
  [63, 47, 68, 52, "down"],
  [52, 46, 67, 59, "up"],
  [59, 54, 74, 68, "up"],
  [68, 61, 82, 76, "up"],
  [76, 62, 80, 67, "down"],
  [67, 55, 71, 61, "down"],
  [61, 57, 76, 69, "up"],
  [69, 62, 82, 75, "up"],
  [75, 59, 80, 65, "down"],
  [65, 60, 84, 72, "up"],
  [72, 67, 91, 84, "up"],
  [84, 78, 99, 92, "up"],
  [92, 86, 110, 103, "up"],
  [103, 98, 118, 111, "up"],
  [111, 91, 116, 98, "down"],
  [98, 81, 102, 87, "down"],
  [87, 71, 90, 78, "down"],
  [78, 62, 82, 67, "down"],
  [67, 60, 78, 71, "up"],
];

const xLabels = [
  { x: 28, text: "May 27" },
  { x: 134, text: "Jun 1" },
  { x: 238, text: "Jun 6" },
  { x: 340, text: "Jun 11" },
  { x: 447, text: "Jun 16" },
  { x: 553, text: "Jun 21" },
  { x: 760, text: "Jun 27" },
];

const yLabels = [
  { y: 30, text: "12 Cr" },
  { y: 71, text: "10 Cr" },
  { y: 112, text: "8 Cr" },
  { y: 153, text: "6 Cr" },
  { y: 194, text: "4 Cr" },
  { y: 235, text: "2 Cr" },
  { y: 276, text: "0" },
];

export default function RevenueCandleChart() {
  return (
    <div className="exact-candle-wrap">
      <svg viewBox="0 0 820 310" className="exact-candle-svg" preserveAspectRatio="none">
        {[30, 71, 112, 153, 194, 235, 276].map((y) => (
          <line key={`h-${y}`} x1="58" x2="800" y1={y} y2={y} className="grid-line" />
        ))}

        {[58, 165, 270, 375, 480, 585, 690, 800].map((x) => (
          <line key={`v-${x}`} x1={x} x2={x} y1="30" y2="276" className="grid-line vertical" />
        ))}

        {yLabels.map((l) => (
          <text key={l.text} x="8" y={l.y + 4} className="axis-label">
            {l.text}
          </text>
        ))}

        {xLabels.map((l) => (
          <text key={l.text} x={l.x} y="302" className="axis-label">
            {l.text}
          </text>
        ))}

        <text x="5" y="155" className="y-axis-title" transform="rotate(-90 5 155)">
          Amount (₹)
        </text>

        {candles.map(([open, low, high, close, type], index) => {
          const x = 70 + index * 22.4;
          const scale = (value: number) => 276 - (value / 120) * 246;
          const color = type === "up" ? "#10b981" : "#ef477a";
          const bodyTop = Math.min(scale(open as number), scale(close as number));
          const bodyHeight = Math.max(Math.abs(scale(open as number) - scale(close as number)), 12);

          return (
            <g key={index}>
              <line
                x1={x + 5}
                x2={x + 5}
                y1={scale(high as number)}
                y2={scale(low as number)}
                stroke={color}
                strokeWidth="1.6"
                opacity="0.95"
              />
              <rect
                x={x}
                y={bodyTop}
                width="10"
                height={bodyHeight}
                rx="1.8"
                fill={color}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}