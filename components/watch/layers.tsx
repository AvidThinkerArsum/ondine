"use client";

import { around, gearPath, polar, spiralPath } from "@/lib/geometry";
import type { Metal, Variant } from "@/lib/variants";

// All layers share one coordinate space: 400 × 640, head centred at (200, 320), case radius 150.
export const VB = "0 0 400 640";
const CX = 200;
const CY = 320;

const svgProps = {
  viewBox: VB,
  className: "absolute inset-0 h-full w-full overflow-visible",
  xmlns: "http://www.w3.org/2000/svg",
} as const;

function MetalDefs({ id, m }: { id: string; m: Metal }) {
  return (
    <>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={m.light} />
        <stop offset="0.35" stopColor={m.mid} />
        <stop offset="0.6" stopColor={m.dark} />
        <stop offset="0.8" stopColor={m.mid} />
        <stop offset="1" stopColor={m.light} />
      </linearGradient>
      <linearGradient id={`${id}-metal-v`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={m.light} />
        <stop offset="0.5" stopColor={m.mid} />
        <stop offset="1" stopColor={m.dark} />
      </linearGradient>
      <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.5" />
      </filter>
      <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
      </filter>
    </>
  );
}

/* ---------------------------------- STRAP --------------------------------- */
export function StrapLayer({ id, v }: { id: string; v: Variant }) {
  const p = `${id}-strap`;
  return (
    <svg {...svgProps}>
      <defs>
        <MetalDefs id={p} m={v.metal} />
        <linearGradient id={`${p}-leather`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={v.strap.edge} />
          <stop offset="0.2" stopColor={v.strap.base} />
          <stop offset="0.8" stopColor={v.strap.base} />
          <stop offset="1" stopColor={v.strap.edge} />
        </linearGradient>
        <pattern id={`${p}-scales`} width="26" height="18" patternUnits="userSpaceOnUse">
          <rect x="1.5" y="1.5" width="23" height="15" rx="6" fill="none" stroke="#fff" strokeOpacity="0.07" />
          <rect x="4" y="4" width="18" height="10" rx="4" fill="#000" fillOpacity="0.12" />
        </pattern>
      </defs>
      <g filter={`url(#${p}-shadow)`}>
        {/* 12 o'clock strap (holes) */}
        <path d={`M${CX - 40} ${CY - 120} L${CX - 34} 78 Q${CX - 34} 34 ${CX} 30 Q${CX + 34} 34 ${CX + 34} 78 L${CX + 40} ${CY - 120} Z`} fill={`url(#${p}-leather)`} />
        <path d={`M${CX - 40} ${CY - 120} L${CX - 34} 78 Q${CX - 34} 34 ${CX} 30 Q${CX + 34} 34 ${CX + 34} 78 L${CX + 40} ${CY - 120} Z`} fill={`url(#${p}-scales)`} />
        <path d={`M${CX - 30} ${CY - 128} L${CX - 25} 84`} stroke={v.strap.stitch} strokeWidth="1.2" strokeDasharray="5 4" opacity="0.8" />
        <path d={`M${CX + 30} ${CY - 128} L${CX + 25} 84`} stroke={v.strap.stitch} strokeWidth="1.2" strokeDasharray="5 4" opacity="0.8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={CX} cy={72 + i * 20} r="4.2" fill="#000" fillOpacity="0.7" stroke={v.strap.edge} strokeWidth="1" />
        ))}
        {/* 6 o'clock strap (buckle) */}
        <path d={`M${CX - 40} ${CY + 120} L${CX - 33} 560 Q${CX - 33} 600 ${CX} 606 Q${CX + 33} 600 ${CX + 33} 560 L${CX + 40} ${CY + 120} Z`} fill={`url(#${p}-leather)`} />
        <path d={`M${CX - 40} ${CY + 120} L${CX - 33} 560 Q${CX - 33} 600 ${CX} 606 Q${CX + 33} 600 ${CX + 33} 560 L${CX + 40} ${CY + 120} Z`} fill={`url(#${p}-scales)`} />
        <path d={`M${CX - 30} ${CY + 128} L${CX - 24} 556`} stroke={v.strap.stitch} strokeWidth="1.2" strokeDasharray="5 4" opacity="0.8" />
        <path d={`M${CX + 30} ${CY + 128} L${CX + 24} 556`} stroke={v.strap.stitch} strokeWidth="1.2" strokeDasharray="5 4" opacity="0.8" />
        {/* keeper + buckle */}
        <rect x={CX - 36} y={520} width="72" height="10" rx="3" fill={v.strap.edge} />
        <rect x={CX - 40} y={578} width="80" height="30" rx="7" fill="none" stroke={`url(#${p}-metal)`} strokeWidth="7" />
        <rect x={CX - 2} y={578} width="4" height="30" rx="2" fill={`url(#${p}-metal-v)`} />
      </g>
    </svg>
  );
}

/* ---------------------------------- CASE ---------------------------------- */
export function CaseLayer({ id, v }: { id: string; v: Variant }) {
  const p = `${id}-case`;
  return (
    <svg {...svgProps}>
      <defs>
        <MetalDefs id={p} m={v.metal} />
        <radialGradient id={`${p}-back`} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor={v.metal.dark} />
          <stop offset="1" stopColor="#0a0506" />
        </radialGradient>
      </defs>
      <g filter={`url(#${p}-shadow)`}>
        {/* lugs */}
        {[
          [CX - 32, CY - 168],
          [CX + 18, CY - 168],
          [CX - 32, CY + 128],
          [CX + 18, CY + 128],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="14" height="44" rx="6" fill={`url(#${p}-metal-v)`} />
        ))}
        {/* crown */}
        <rect x={CX + 146} y={CY - 13} width="26" height="26" rx="5" fill={`url(#${p}-metal-v)`} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={CX + 152 + i * 5} y1={CY - 13} x2={CX + 152 + i * 5} y2={CY + 13} stroke="#000" strokeOpacity="0.35" strokeWidth="1.5" />
        ))}
        {/* case band */}
        <circle cx={CX} cy={CY} r="150" fill={`url(#${p}-metal)`} />
        <circle cx={CX} cy={CY} r="150" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1" />
        {/* recess */}
        <circle cx={CX} cy={CY} r="136" fill={`url(#${p}-back)`} />
        <circle cx={CX} cy={CY} r="136" fill="none" stroke="#000" strokeOpacity="0.6" strokeWidth="3" />
        <text x={CX} y={CY + 118} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" letterSpacing="2.2" fill={v.metal.light} fillOpacity="0.55">
          ONDINE · GENÈVE · 38.5 · 50 M
        </text>
      </g>
    </svg>
  );
}

/* -------------------------------- MOVEMENT -------------------------------- */
export function MovementLayer({ id, v, cropped = false }: { id: string; v: Variant; cropped?: boolean }) {
  const p = `${id}-mvt`;
  const m = v.metal;
  const gears = [
    { cx: CX - 52, cy: CY - 40, r: 40, t: 24 },
    { cx: CX + 58, cy: CY - 52, r: 30, t: 18 },
    { cx: CX + 22, cy: CY + 58, r: 48, t: 30 },
    { cx: CX - 70, cy: CY + 54, r: 24, t: 14 },
  ];
  const jewels = [
    [CX - 52, CY - 40],
    [CX + 58, CY - 52],
    [CX + 22, CY + 58],
    [CX - 70, CY + 54],
    [CX + 78, CY + 60],
    [CX - 6, CY - 98],
  ];
  return (
    <svg {...svgProps} viewBox={cropped ? "110 190 180 180" : VB}>
      <defs>
        <MetalDefs id={p} m={m} />
        <radialGradient id={`${p}-ruby`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ff7d8a" />
          <stop offset="0.5" stopColor="#b3122a" />
          <stop offset="1" stopColor="#4a0410" />
        </radialGradient>
        <linearGradient id={`${p}-bridge`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={m.light} />
          <stop offset="0.5" stopColor={m.mid} />
          <stop offset="1" stopColor={m.dark} />
        </linearGradient>
      </defs>
      <g filter={cropped ? undefined : `url(#${p}-shadow)`}>
        <circle cx={CX} cy={CY} r="135" fill={`url(#${p}-metal)`} />
        <circle cx={CX} cy={CY} r="135" fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="1.5" />
        {/* skeleton openings */}
        {gears.map((g, i) => (
          <circle key={i} cx={g.cx} cy={g.cy} r={g.r + 6} fill="#120507" />
        ))}
        <circle cx={CX + 78} cy={CY + 60} r="30" fill="#120507" />
        {/* gears */}
        {gears.map((g, i) => (
          <g key={i} filter={`url(#${p}-soft)`}>
            <path d={gearPath(g.cx, g.cy, g.r, g.t, 6)} fill={`url(#${p}-metal-v)`} stroke="#000" strokeOpacity="0.35" strokeWidth="0.6" />
            <circle cx={g.cx} cy={g.cy} r={g.r * 0.62} fill="#120507" fillOpacity="0.85" />
            {[0, 1, 2, 3, 4].map((k) => {
              const end = polar(g.cx, g.cy, g.r * 0.6, (k / 5) * Math.PI * 2);
              return <line key={k} x1={g.cx} y1={g.cy} x2={end.x} y2={end.y} stroke={m.mid} strokeWidth="4" strokeLinecap="round" />;
            })}
            <circle cx={g.cx} cy={g.cy} r="8" fill={`url(#${p}-metal-v)`} />
          </g>
        ))}
        {/* balance wheel + hairspring */}
        <g filter={`url(#${p}-soft)`}>
          <circle cx={CX + 78} cy={CY + 60} r="26" fill="none" stroke={`url(#${p}-metal)`} strokeWidth="5" />
          <line x1={CX + 52} y1={CY + 60} x2={CX + 104} y2={CY + 60} stroke={m.mid} strokeWidth="3" />
          <line x1={CX + 78} y1={CY + 34} x2={CX + 78} y2={CY + 86} stroke={m.mid} strokeWidth="3" />
          <path d={spiralPath(CX + 78, CY + 60, 3.5, 2, 0.9)} fill="none" stroke="#4d6fa8" strokeWidth="1" opacity="0.95" />
        </g>
        {/* bridges */}
        <path d={`M${CX - 120} ${CY - 6} Q${CX - 60} ${CY + 12} ${CX - 10} ${CY - 2} L${CX - 8} ${CY + 14} Q${CX - 60} ${CY + 28} ${CX - 118} ${CY + 12} Z`} fill={`url(#${p}-bridge)`} stroke="#000" strokeOpacity="0.4" strokeWidth="0.8" filter={`url(#${p}-soft)`} />
        <path d={`M${CX - 30} ${CY - 128} L${CX + 40} ${CY - 100} L${CX + 34} ${CY - 86} L${CX - 36} ${CY - 114} Z`} fill={`url(#${p}-bridge)`} stroke="#000" strokeOpacity="0.4" strokeWidth="0.8" filter={`url(#${p}-soft)`} />
        {/* jewels + screws */}
        {jewels.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5.2" fill={`url(#${p}-ruby)`} />
            <circle cx={x - 1.6} cy={y - 1.8} r="1.2" fill="#fff" fillOpacity="0.8" />
          </g>
        ))}
        {[
          [CX - 96, CY - 70],
          [CX + 98, CY - 30],
          [CX - 100, CY + 82],
          [CX + 40, CY + 112],
          [CX - 20, CY + 10],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#2c4a86" stroke="#0b1a3a" strokeWidth="0.8" />
            <line x1={x - 2.6} y1={y} x2={x + 2.6} y2={y} stroke="#0b1a3a" strokeWidth="1" transform={`rotate(${i * 37} ${x} ${y})`} />
          </g>
        ))}
        <text x={CX} y={CY + 122} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="6.5" letterSpacing="2" fill="#120507" fillOpacity="0.8">
          CAL. O·01 · TWENTY-ONE JEWELS · HAND-WOUND
        </text>
      </g>
    </svg>
  );
}

/* ---------------------------------- DIAL ---------------------------------- */
export type Time = { h: number; m: number; s: number };

export function DialLayer({ id, v, time }: { id: string; v: Variant; time: Time }) {
  const p = `${id}-dial`;
  const hourDeg = (time.h % 12) * 30 + time.m * 0.5;
  const minDeg = time.m * 6 + time.s * 0.1;
  const secDeg = time.s * 6;
  const sub = { x: CX, y: CY + 62 };
  return (
    <svg {...svgProps}>
      <defs>
        <MetalDefs id={p} m={v.hands} />
        <radialGradient id={`${p}-face`} cx="0.42" cy="0.36" r="0.75">
          <stop offset="0" stopColor={v.dial[0]} />
          <stop offset="1" stopColor={v.dial[1]} />
        </radialGradient>
        <radialGradient id={`${p}-moon`} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#f7e3b2" />
          <stop offset="1" stopColor="#b8894a" />
        </radialGradient>
      </defs>
      <g filter={`url(#${p}-shadow)`}>
        <circle cx={CX} cy={CY} r="136" fill={`url(#${p}-face)`} />
        {/* sunburst brushing */}
        {around(CX, CY, 136, 96).map((pt) => (
          <line key={pt.i} x1={CX} y1={CY} x2={pt.x} y2={pt.y} stroke="#fff" strokeOpacity={pt.i % 2 ? 0.035 : 0.06} strokeWidth="1" />
        ))}
        <circle cx={CX} cy={CY} r="136" fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="2" />
        {/* minute track */}
        {around(CX, CY, 124, 60).map((pt) => {
          const major = pt.i % 5 === 0;
          const inner = polar(CX, CY, major ? 112 : 118, pt.a);
          return (
            <line
              key={pt.i}
              x1={inner.x}
              y1={inner.y}
              x2={pt.x}
              y2={pt.y}
              stroke={major ? v.dialText : v.dialText}
              strokeOpacity={major ? 0.9 : 0.45}
              strokeWidth={major ? 1.6 : 0.8}
            />
          );
        })}
        {/* applied indices (skip 6 for the subdial) */}
        {around(CX, CY, 100, 12).map((pt) =>
          pt.i === 6 ? null : (
            <g key={pt.i} transform={`rotate(${pt.deg} ${pt.x} ${pt.y})`} filter={`url(#${p}-soft)`}>
              <rect x={pt.x - 2.2} y={pt.y - 9} width="4.4" height="18" rx="1" fill={`url(#${p}-metal-v)`} />
              {pt.i === 0 && <rect x={pt.x - 8} y={pt.y - 9} width="4.4" height="18" rx="1" fill={`url(#${p}-metal-v)`} />}
              {pt.i === 0 && <rect x={pt.x + 3.6} y={pt.y - 9} width="4.4" height="18" rx="1" fill={`url(#${p}-metal-v)`} />}
            </g>
          ),
        )}
        {/* brand */}
        <text x={CX} y={CY - 44} textAnchor="middle" fontFamily="var(--font-cormorant)" fontSize="19" letterSpacing="5" fill={v.dialText}>
          ONDINE
        </text>
        <text x={CX} y={CY - 30} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="5.5" letterSpacing="2.4" fill={v.dialText} fillOpacity="0.7">
          THE SLOW HOUR
        </text>
        {/* small seconds / moonphase */}
        {v.moon ? (
          <g>
            <circle cx={sub.x} cy={sub.y} r="34" fill="#050916" stroke={v.dialText} strokeOpacity="0.5" strokeWidth="1" />
            {[[-14, -10], [10, -16], [18, 8], [-20, 12], [2, 20], [-4, -22]].map(([dx, dy], i) => (
              <circle key={i} cx={sub.x + dx} cy={sub.y + dy} r={i % 2 ? 0.9 : 1.3} fill="#fff" fillOpacity="0.85" />
            ))}
            <circle cx={sub.x + 6} cy={sub.y - 2} r="11" fill={`url(#${p}-moon)`} />
            <circle cx={sub.x + 12} cy={sub.y - 6} r="9.5" fill="#050916" />
          </g>
        ) : (
          <g>
            <circle cx={sub.x} cy={sub.y} r="34" fill="#000" fillOpacity="0.18" stroke={v.dialText} strokeOpacity="0.5" strokeWidth="1" />
            {around(sub.x, sub.y, 30, 20).map((pt) => {
              const inner = polar(sub.x, sub.y, pt.i % 5 === 0 ? 24 : 27, pt.a);
              return <line key={pt.i} x1={inner.x} y1={inner.y} x2={pt.x} y2={pt.y} stroke={v.dialText} strokeOpacity="0.7" strokeWidth="0.8" />;
            })}
            <g transform={`rotate(${secDeg} ${sub.x} ${sub.y})`}>
              <line x1={sub.x} y1={sub.y + 7} x2={sub.x} y2={sub.y - 28} stroke={v.dialText} strokeWidth="1.2" strokeLinecap="round" />
              <circle cx={sub.x} cy={sub.y} r="2.2" fill={v.dialText} />
            </g>
          </g>
        )}
        {/* hands */}
        <g filter={`url(#${p}-soft)`}>
          <g transform={`rotate(${hourDeg} ${CX} ${CY})`}>
            <path d={`M${CX} ${CY + 12} L${CX - 5} ${CY - 10} L${CX} ${CY - 74} L${CX + 5} ${CY - 10} Z`} fill={`url(#${p}-metal-v)`} />
            <line x1={CX} y1={CY - 10} x2={CX} y2={CY - 70} stroke="#000" strokeOpacity="0.35" strokeWidth="0.8" />
          </g>
          <g transform={`rotate(${minDeg} ${CX} ${CY})`}>
            <path d={`M${CX} ${CY + 14} L${CX - 4} ${CY - 10} L${CX} ${CY - 108} L${CX + 4} ${CY - 10} Z`} fill={`url(#${p}-metal-v)`} />
            <line x1={CX} y1={CY - 10} x2={CX} y2={CY - 104} stroke="#000" strokeOpacity="0.35" strokeWidth="0.8" />
          </g>
          <circle cx={CX} cy={CY} r="6" fill={`url(#${p}-metal)`} stroke="#000" strokeOpacity="0.4" strokeWidth="0.6" />
        </g>
      </g>
    </svg>
  );
}

/* ----------------------------- BEZEL + CRYSTAL ----------------------------- */
export function BezelLayer({ id, v }: { id: string; v: Variant }) {
  const p = `${id}-bezel`;
  return (
    <svg {...svgProps}>
      <defs>
        <MetalDefs id={p} m={v.metal} />
        <radialGradient id={`${p}-glass`} cx="0.3" cy="0.22" r="0.9">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      <g filter={`url(#${p}-shadow)`}>
        <circle cx={CX} cy={CY} r="143" fill="none" stroke={`url(#${p}-metal)`} strokeWidth="15" />
        <circle cx={CX} cy={CY} r="150.5" fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle cx={CX} cy={CY} r="135.5" fill="none" stroke={v.metal.light} strokeOpacity="0.8" strokeWidth="1.4" />
        <circle cx={CX} cy={CY} r="135" fill={`url(#${p}-glass)`} />
        <path d={`M${CX - 96} ${CY - 78} A126 126 0 0 1 ${CX - 20} ${CY - 124}`} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
