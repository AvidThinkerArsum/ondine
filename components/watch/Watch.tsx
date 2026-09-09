"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useId, useState } from "react";
import type { Variant } from "@/lib/variants";
import { BezelLayer, CaseLayer, DialLayer, MovementLayer, StrapLayer, type Time } from "./layers";

const FIXED: Time = { h: 10, m: 8, s: 37 };

export function useClock(live: boolean): Time {
  const [t, setT] = useState<Time>(FIXED);
  useEffect(() => {
    if (!live) return;
    const tick = () => {
      const d = new Date();
      const s = d.getSeconds() + d.getMilliseconds() / 1000;
      setT({ h: d.getHours() % 12, m: d.getMinutes(), s });
    };
    tick();
    const iv = setInterval(tick, 50);
    return () => clearInterval(iv);
  }, [live]);
  return t;
}

// Depth of each layer when fully exploded (px of translateZ), strap → bezel.
const DEPTHS = [-240, -120, 0, 120, 240];

function Layer({
  depth,
  spread,
  children,
}: {
  depth: number;
  spread: MotionValue<number>;
  children: React.ReactNode;
}) {
  const z = useTransform(spread, (v) => v * depth);
  return (
    <motion.div style={{ z, transformStyle: "preserve-3d" }} className="absolute inset-0">
      {children}
    </motion.div>
  );
}

/**
 * The watch as five real layers in 3D. `spread` 0 = assembled, viewed face-on;
 * 1 = tilted and pulled apart along the depth axis.
 */
export function Watch3D({
  spread,
  variant,
  live = true,
  className,
  tiltX,
  tiltY,
}: {
  spread: MotionValue<number>;
  variant: Variant;
  live?: boolean;
  className?: string;
  tiltX?: MotionValue<number>;
  tiltY?: MotionValue<number>;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const time = useClock(live);
  const baseX = useTransform(spread, [0, 1], [0, 60]);
  const baseY = useTransform(spread, [0, 1], [0, -14]);
  const rotateZ = useTransform(spread, [0, 1], [0, -22]);
  const scale = useTransform(spread, [0, 1], [1, 0.8]);
  const rotateX = useTransform([baseX, tiltX ?? baseX], ([b, t]) => (tiltX ? (b as number) + (t as number) : (b as number)));
  const rotateY = useTransform([baseY, tiltY ?? baseY], ([b, t]) => (tiltY ? (b as number) + (t as number) : (b as number)));

  return (
    <div className={className} style={{ perspective: 1500 }}>
      <motion.div
        style={{ rotateX, rotateY, rotateZ, scale, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        <Layer depth={DEPTHS[0]} spread={spread}><StrapLayer id={id} v={variant} /></Layer>
        <Layer depth={DEPTHS[1]} spread={spread}><CaseLayer id={id} v={variant} /></Layer>
        <Layer depth={DEPTHS[2]} spread={spread}><MovementLayer id={id} v={variant} /></Layer>
        <Layer depth={DEPTHS[3]} spread={spread}><DialLayer id={id} v={variant} time={time} /></Layer>
        <Layer depth={DEPTHS[4]} spread={spread}><BezelLayer id={id} v={variant} /></Layer>
      </motion.div>
    </div>
  );
}

/** Assembled, flat watch for catalogue cards. */
export function WatchFlat({ variant, className, live = false }: { variant: Variant; className?: string; live?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const time = useClock(live);
  return (
    <div className={`relative ${className ?? ""}`}>
      <StrapLayer id={id} v={variant} />
      <CaseLayer id={id} v={variant} />
      <MovementLayer id={id} v={variant} />
      <DialLayer id={id} v={variant} time={time} />
      <BezelLayer id={id} v={variant} />
    </div>
  );
}

export { MovementLayer };
