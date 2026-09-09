"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { VARIANTS } from "@/lib/variants";
import { MovementLayer } from "@/components/watch/Watch";
import { Rise, Words } from "@/components/ui/Reveal";

export function Maison() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const zoom = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);

  return (
    <section ref={ref} className="relative bg-cream text-ink">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-14 px-6 py-28 sm:px-10 lg:grid-cols-12 lg:py-40">
        <div className="lg:col-span-6 lg:pr-10">
          <Rise>
            <p className="eyebrow flex items-center gap-4 text-ink-2">
              <span>01</span>
              <span className="h-4 w-px bg-ink/30" />
              <span>The Maison</span>
            </p>
          </Rise>
          <h2 className="display mt-14 text-6xl leading-[0.95] sm:text-7xl lg:text-[5.4rem]">
            <Words text="The rarest thing" />
            <br />
            <Words text="is" italic="your time." delay={0.15} />
          </h2>
          <Rise delay={0.35} className="mt-10 max-w-md space-y-5 text-[15px] leading-relaxed text-ink-2">
            <p>There is the time the world asks of you. And there is the time you keep for yourself.</p>
            <p>Ondine belongs to the latter. An expression of quiet individuality, where every curve, surface, and shade invites a closer look.</p>
          </Rise>
          <Rise delay={0.5} className="mt-10">
            <a href="#inner" className="group inline-flex items-center gap-3 text-sm text-ink">
              Look a little closer <span className="text-[0.7rem] transition group-hover:translate-x-1">↗</span>
            </a>
          </Rise>
        </div>

        {/* Macro study: the movement, cropped tight */}
        <div className="lg:col-span-6">
          <Rise delay={0.2}>
            <motion.figure style={{ y }} className="relative mx-auto max-w-[520px]">
              <div className="vignette relative aspect-square overflow-hidden bg-[radial-gradient(ellipse_at_40%_35%,#5a1a26,#1a070b_70%)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]">
                <motion.div style={{ scale: zoom }} className="absolute inset-0">
                  <MovementLayer id="macro" v={VARIANTS.nocturne} cropped />
                </motion.div>
                {/* a loupe-like tool tip */}
                <div className="absolute right-[18%] top-[14%] h-[46%] w-[3px] origin-top rotate-[28deg] bg-gradient-to-b from-[#e8e8e6] via-[#9a9a98] to-[#3a3a38]" />
              </div>
              <figcaption className="mt-4 flex items-center justify-between">
                <span className="eyebrow text-ink-2">A study in detail</span>
                <span className="eyebrow text-ink-2">Ondine</span>
              </figcaption>
            </motion.figure>
          </Rise>
        </div>
      </div>
    </section>
  );
}
