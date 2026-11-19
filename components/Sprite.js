import { PALETTE, SPRITE, EYES, EYE_ROWS } from "../lib/sprite";

// Draws the pixel character as crisp SVG. Same-colored pixels in a row are merged
// into one rectangle to keep it small. The eyes blink every few seconds (CSS).
function runs() {
  const out = [];
  SPRITE.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === ch) end++;
      out.push({ x, y, w: end - x, fill: PALETTE[ch] });
      x = end;
    }
  });
  return out;
}

const RECTS = runs();
const [top, mid, bottom] = EYE_ROWS;

export default function Sprite({ width = 256, label = "Pixel-art drawing of me" }) {
  const w = SPRITE[0].length, h = SPRITE.length;
  return (
    <svg
      className="sprite"
      viewBox={`0 0 ${w} ${h}`}
      width={width}
      height={(width * h) / w}
      shapeRendering="crispEdges"
      role="img"
      aria-label={label}
    >
      <g className="sprite-body">
        {RECTS.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
        ))}
        {/* eyelids: hidden, briefly shown to blink */}
        <g className="sprite-blink">
          {EYES.map(([a, b]) => (
            <g key={a}>
              <rect x={a} y={top} width={b - a + 1} height={mid - top + 1} fill={PALETTE.S} />
              <rect x={a} y={bottom} width={b - a + 1} height={1} fill={PALETTE.K} />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
