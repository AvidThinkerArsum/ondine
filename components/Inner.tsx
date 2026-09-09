"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { VARIANTS } from "@/lib/variants";
import { Watch3D } from "@/components/watch/Watch";
import { Rise, Words } from "@/components/ui/Reveal";

// The watch resting on a pedestal, lit from above, tilting with the mouse. Hands run live.
export function Inner() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const zero = useMotionValue(0);
  const pedestalY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const watchY = useTransform(scrollYProgress, [0, 1], [90, -90]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 4]), { stiffness: 70, damping: 18 });
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [30, 44]), { stiffness: 70, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section id="inner" ref={ref} onMouseMove={onMove} className="grain relative overflow-hidden bg-[radial-gradient(ellipse_at_70%_30%,#3a0f18_0%,#1a070b_50%,#0c0304_100%)] text-cream">
      {/* light beam */}
      <div aria-hidden className="pointer-events-none absolute right-[18%] top-0 h-[70%] w-[38%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,214,150,0.16),transparent_70%)]" />

      <div className="mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 items-center gap-10 px-6 py-28 sm:px-10 lg:grid-cols-12 lg:py-32">
        <div className="relative z-10 lg:col-span-5">
          <Rise>
            <p className="eyebrow text-gold-light/70">02 / An inner world</p>
          </Rise>
          <h2 className="display mt-8 text-6xl leading-[0.95] sm:text-7xl lg:text-[5.6rem]">
            <Words text="Beauty runs" />
            <br />
            <Words italic="deeper." delay={0.15} />
          </h2>
          <Rise delay={0.35} className="mt-8 max-w-sm text-[15px] leading-relaxed text-cream/70">
            A quiet face. An extraordinary world beneath. The seconds you see here are the real ones — the calibre keeps your time, not ours.
          </Rise>
        </div>

        <div className="relative lg:col-span-7" style={{ perspective: 1400 }}>
          {/* pedestal */}
          <motion.div style={{ y: pedestalY }} className="absolute inset-x-[8%] bottom-[-6%] top-[38%]">
            <div className="absolute inset-x-0 top-0 h-[38%] origin-bottom bg-gradient-to-b from-[#3a1b1a] to-[#1e0c0c]" style={{ transform: "perspective(900px) rotateX(58deg)", transformOrigin: "bottom" }} />
            <div className="absolute inset-x-0 bottom-0 top-[38%] bg-gradient-to-b from-[#17090a] via-[#0e0505] to-transparent" />
            <div className="absolute inset-x-[6%] top-[36%] h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </motion.div>

          <motion.div style={{ y: watchY }} className="relative mx-auto h-[70vh] w-[min(100%,calc(70vh*0.625))] lg:h-[82vh] lg:w-[calc(82vh*0.625)]">
            <Watch3D spread={zero} variant={VARIANTS.nocturne} tiltX={tiltX} tiltY={tiltY} className="h-full w-full drop-shadow-[0_60px_50px_rgba(0,0,0,0.6)]" />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 text-right sm:right-10">
        <p className="eyebrow text-cream/70">The invisible,</p>
        <p className="eyebrow mt-1 text-cream/70">made unforgettable.</p>
      </div>
    </section>
  );
}
