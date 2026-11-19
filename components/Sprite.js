"use client";
import { useEffect, useRef, useState } from "react";
import { PALETTE, SPRITE, EYES, EYE_ROWS } from "../lib/sprite";

// Draws the pixel character as crisp SVG. Same-colored pixels in a row are merged
// into one rectangle to keep it small. The eyes follow the mouse, the head turns a
// little when the mouse is far to one side, and the eyes blink every few seconds (CSS).
// When nobody moves the mouse for a while (or on phones), he glances around on his own.

const HEAD_ROWS = 28; // rows 0-27 are the head and move as one piece

function runs(from, to) {
  const out = [];
  for (let y = from; y < to; y++) {
    const row = SPRITE[y];
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === ch) end++;
      if (ch !== ".") out.push({ x, y, w: end - x, fill: PALETTE[ch] });
      x = end;
    }
  }
  return out;
}

const HEAD = runs(0, HEAD_ROWS);
const BODY = runs(HEAD_ROWS, SPRITE.length);
const [lid, eyeTop, eyeBottom] = EYE_ROWS;
const W = SPRITE[0].length, H = SPRITE.length;
const EYE_Y = (eyeTop + 1) / H; // eye height as a fraction of the picture

const Rects = ({ list }) =>
  list.map((r, i) => <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />);

// One eye: 4 pixels wide, 2 tall. The 2x2 iris slides left/right, and the pupil sits
// on the side it's looking toward (top row when looking up, bottom when looking down).
function Eye({ a, inner, dx, dy }) {
  const ix = a + 1 + dx;
  const px = dx < 0 ? ix : dx > 0 ? ix + 1 : inner;
  const py = dy > 0 ? eyeBottom : eyeTop;
  return (
    <g>
      <rect x={a} y={eyeTop} width={4} height={1} fill={PALETTE.W} />
      <rect x={a} y={eyeBottom} width={1} height={1} fill={PALETTE.s} />
      <rect x={a + 1} y={eyeBottom} width={2} height={1} fill={PALETTE.W} />
      <rect x={a + 3} y={eyeBottom} width={1} height={1} fill={PALETTE.s} />
      <rect x={ix} y={eyeTop} width={2} height={2} fill={PALETTE.E} />
      <rect x={px} y={py} width={1} height={1} fill={PALETTE.P} />
    </g>
  );
}

const sign = (v, dead) => (v > dead ? 1 : v < -dead ? -1 : 0);

export default function Sprite({ width = 256, label = "Pixel-art drawing of me" }) {
  const ref = useRef(null);
  const [look, setLook] = useState({ dx: 0, dy: 0, head: 0 });

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0, idle = 0, wander = 0;
    let last = { dx: 0, dy: 0, head: 0 };
    const set = (next) => {
      if (next.dx === last.dx && next.dy === last.dy && next.head === last.head) return;
      last = next;
      setLook(next);
    };

    // Look at a point on the screen
    const aim = (mx, my) => {
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      const x = mx - (box.left + box.width / 2);
      const y = my - (box.top + box.height * EYE_Y);
      set({ dx: sign(x, box.width * 0.15), dy: sign(y, box.height * 0.2), head: sign(x, box.width * 1.2) });
    };

    // With no mouse activity, glance somewhere random every couple of seconds
    const glance = () => {
      const pick = () => [-1, 0, 0, 1][Math.floor(Math.random() * 4)];
      const dx = pick();
      set({ dx, dy: pick(), head: Math.random() < 0.3 ? dx : 0 });
      wander = setTimeout(glance, 1500 + Math.random() * 2500);
    };
    const restartIdle = () => {
      clearTimeout(idle);
      clearTimeout(wander);
      if (!reduce) idle = setTimeout(glance, 4000);
    };

    const onMove = (e) => {
      const { clientX, clientY } = e.touches ? e.touches[0] : e;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => aim(clientX, clientY));
      restartIdle();
    };
    const onLeave = () => { set({ dx: 0, dy: 0, head: 0 }); restartIdle(); };

    addEventListener("mousemove", onMove, { passive: true });
    addEventListener("touchstart", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    restartIdle();
    return () => {
      removeEventListener("mousemove", onMove);
      removeEventListener("touchstart", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
      clearTimeout(idle);
      clearTimeout(wander);
    };
  }, []);

  const { dx, dy, head } = look;
  return (
    <svg
      ref={ref}
      className="sprite"
      viewBox={`0 0 ${W} ${H}`}
      width={width}
      height={(width * H) / W}
      shapeRendering="crispEdges"
      role="img"
      aria-label={label}
    >
      <g className="sprite-body">
        <Rects list={BODY} />
        <g className="sprite-head" transform={`translate(${head} 0)`}>
          <Rects list={HEAD} />
          {EYES.map(([a], i) => (
            <Eye key={a} a={a} inner={i === 0 ? a + 2 : a + 1} dx={dx} dy={dy} />
          ))}
          {/* eyelids: hidden, briefly shown to blink */}
          <g className="sprite-blink">
            {EYES.map(([a, b]) => (
              <g key={a}>
                <rect x={a} y={lid} width={b - a + 1} height={eyeTop - lid + 1} fill={PALETTE.S} />
                <rect x={a} y={eyeBottom} width={b - a + 1} height={1} fill={PALETTE.K} />
              </g>
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}
