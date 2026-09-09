// Gear outline as an SVG path. Teeth are trapezoids between rInner and rOuter.
export function gearPath(cx: number, cy: number, rOuter: number, teeth: number, depth: number): string {
  const rInner = rOuter - depth;
  const step = (Math.PI * 2) / teeth;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const pts: [number, number][] = [
      [rInner, a0],
      [rInner, a0 + step * 0.18],
      [rOuter, a0 + step * 0.3],
      [rOuter, a0 + step * 0.5],
      [rInner, a0 + step * 0.62],
      [rInner, a0 + step * 0.8],
    ];
    for (const [r, a] of pts) {
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      d += (d ? "L" : "M") + x.toFixed(2) + " " + y.toFixed(2);
    }
  }
  return d + "Z";
}

// Rounded so server and client stringify identically (avoids hydration noise).
export const rd = (n: number) => Math.round(n * 1000) / 1000;

// Points around a circle, for ticks and indices.
export function around(cx: number, cy: number, r: number, n: number, offset = -Math.PI / 2) {
  return Array.from({ length: n }, (_, i) => {
    const a = offset + (i / n) * Math.PI * 2;
    return { x: rd(cx + r * Math.cos(a)), y: rd(cy + r * Math.sin(a)), deg: rd((a * 180) / Math.PI + 90), a, i };
  });
}

export const polar = (cx: number, cy: number, r: number, a: number) => ({ x: rd(cx + r * Math.cos(a)), y: rd(cy + r * Math.sin(a)) });

// Archimedean spiral for a hairspring.
export function spiralPath(cx: number, cy: number, turns: number, a: number, b: number): string {
  let d = "";
  const steps = turns * 60;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * Math.PI * 2;
    const r = a + b * t;
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    d += (d ? "L" : "M") + x.toFixed(2) + " " + y.toFixed(2);
  }
  return d;
}
