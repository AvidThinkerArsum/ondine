"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { gearPath, polar } from "@/lib/geometry";

// Background gears on three parallax planes. `progress` turns them as you scroll.
export function Gears({ progress, mx, my }: { progress: MotionValue<number>; mx: MotionValue<number>; my: MotionValue<number> }) {
  const r1 = useTransform(progress, [0, 1], [0, 40]);
  const r2 = useTransform(progress, [0, 1], [0, -70]);
  const r3 = useTransform(progress, [0, 1], [0, 110]);
  const x1 = useTransform(mx, [-0.5, 0.5], [-12, 12]);
  const y1 = useTransform(my, [-0.5, 0.5], [-8, 8]);
  const x2 = useTransform(mx, [-0.5, 0.5], [-28, 28]);
  const y2 = useTransform(my, [-0.5, 0.5], [-18, 18]);
  const x3 = useTransform(mx, [-0.5, 0.5], [-46, 46]);
  const y3 = useTransform(my, [-0.5, 0.5], [-30, 30]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* far plane */}
      <motion.svg style={{ rotate: r1, x: x1, y: y1 }} viewBox="0 0 800 800" className="absolute -right-[18%] top-[-12%] h-[120vh] w-[120vh] opacity-[0.16]">
        <path d={gearPath(400, 400, 380, 42, 34)} fill="none" stroke="var(--color-gold)" strokeWidth="2" />
        <circle cx="400" cy="400" r="300" fill="none" stroke="var(--color-gold)" strokeWidth="1" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const e = polar(400, 400, 300, (i / 6) * Math.PI * 2);
          return <line key={i} x1="400" y1="400" x2={e.x} y2={e.y} stroke="var(--color-gold)" strokeWidth="14" strokeOpacity="0.5" />;
        })}
        <circle cx="400" cy="400" r="60" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
      </motion.svg>
      {/* mid plane */}
      <motion.svg style={{ rotate: r2, x: x2, y: y2 }} viewBox="0 0 500 500" className="absolute -left-[14%] bottom-[-18%] h-[70vh] w-[70vh] opacity-[0.22]">
        <path d={gearPath(250, 250, 230, 28, 26)} fill="var(--color-bordeaux-soft)" fillOpacity="0.5" stroke="var(--color-gold)" strokeWidth="1.5" />
        <circle cx="250" cy="250" r="150" fill="var(--color-bordeaux-deep)" />
        {[0, 1, 2, 3, 4].map((i) => {
          const e = polar(250, 250, 150, (i / 5) * Math.PI * 2);
          return <line key={i} x1="250" y1="250" x2={e.x} y2={e.y} stroke="var(--color-gold)" strokeWidth="12" strokeOpacity="0.6" />;
        })}
        <circle cx="250" cy="250" r="34" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
      </motion.svg>
      {/* near plane */}
      <motion.svg style={{ rotate: r3, x: x3, y: y3 }} viewBox="0 0 300 300" className="absolute left-[38%] top-[8%] h-[26vh] w-[26vh] opacity-[0.28] blur-[1.5px]">
        <path d={gearPath(150, 150, 140, 16, 22)} fill="var(--color-bordeaux-soft)" stroke="var(--color-gold)" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="80" fill="var(--color-bordeaux-deep)" />
        <circle cx="150" cy="150" r="22" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
      </motion.svg>
    </div>
  );
}
