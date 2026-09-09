"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { LAYERS, VARIANTS } from "@/lib/variants";
import { Watch3D } from "@/components/watch/Watch";
import { Gears } from "@/components/Gears";
import { Words, Rise } from "@/components/ui/Reveal";

// Callout anchor positions (% of the watch column) once the layers are spread.
const CALLOUTS: Record<string, { side: "left" | "right"; top: string }> = {
  bezel: { side: "left", top: "9%" },
  dial: { side: "right", top: "24%" },
  movement: { side: "left", top: "44%" },
  case: { side: "right", top: "60%" },
  strap: { side: "left", top: "80%" },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // apart → hold → together
  const raw = useTransform(scrollYProgress, [0.06, 0.42, 0.66, 0.96], [0, 1, 1, 0]);
  const spread = useSpring(raw, { stiffness: 70, damping: 22, mass: 0.7 });
  const callouts = useTransform(spread, [0.7, 1], [0, 1]);
  // Opacity ranges span the full 0→1 (see vesper/portfolio Hero for why).
  const copyFade = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.62, 0.62]);
  const cueApart = useTransform(scrollYProgress, [0, 0.1, 0.92, 1], [1, 0, 0, 1]);
  const cueTogether = useTransform(scrollYProgress, [0, 0.28, 0.4, 0.78, 0.88, 1], [0, 0, 1, 1, 0, 0]);

  // Mouse → gentle tilt on the object and parallax on the gears.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 80, damping: 20 });
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 80, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }

  function scrollToProgress(p: number) {
    const el = ref.current;
    if (!el) return;
    const top = el.offsetTop + p * (el.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section id="top" ref={ref} onMouseMove={onMove} className="relative" style={{ height: reduce ? "auto" : "400vh" }}>
      <div className={`grain vignette relative overflow-hidden bg-[radial-gradient(ellipse_at_62%_40%,#4a1520_0%,#2a0e15_45%,#150508_100%)] ${reduce ? "min-h-screen" : "sticky top-0 h-screen"}`}>
        <Gears progress={scrollYProgress} mx={mx} my={my} />

        <div className="relative mx-auto grid h-full max-w-[1500px] grid-cols-1 items-center gap-6 px-6 pt-24 sm:px-10 lg:grid-cols-12 lg:pt-20">
          {/* Copy */}
          <motion.div style={{ opacity: copyFade }} className="relative z-10 lg:col-span-5">
            <Rise>
              <p className="eyebrow text-gold-light/70">The world within Ondine</p>
            </Rise>
            <h1 className="display mt-6 text-[4.6rem] leading-[0.92] text-cream sm:text-8xl lg:text-[7.4rem]">
              <Words text="Time," />
              <br />
              <Words italic="taken apart." delay={0.2} />
            </h1>
            <Rise delay={0.45} className="mt-8 max-w-xs text-[15px] leading-relaxed text-cream/75">
              An extraordinary world of detail. Every layer hand-finished, then brought together by you.
            </Rise>
            <Rise delay={0.6} className="mt-8">
              <a href="#collection" className="group inline-flex items-center gap-3 border-b border-gold/40 pb-2 text-sm text-cream transition hover:border-gold">
                Discover the collection <span className="text-[0.7rem] transition group-hover:translate-x-1">↗</span>
              </a>
            </Rise>
          </motion.div>

          {/* The object */}
          <div className="relative mx-auto h-[62vh] w-full max-w-[440px] lg:col-span-7 lg:h-[86vh] lg:max-w-none">
            <Watch3D
              spread={spread}
              variant={VARIANTS.nocturne}
              tiltX={tiltX}
              tiltY={tiltY}
              className="mx-auto h-full w-[min(100%,calc(86vh*0.625))]"
            />

            {/* Callouts */}
            {LAYERS.map((l) => {
              const c = CALLOUTS[l.key];
              return (
                <motion.div
                  key={l.key}
                  style={{ opacity: callouts, top: c.top }}
                  className={`absolute hidden w-[210px] lg:block ${c.side === "left" ? "left-0 text-right" : "right-0 text-left"}`}
                >
                  <div className={`flex items-start gap-4 ${c.side === "left" ? "flex-row-reverse" : ""}`}>
                    <span className="mt-2 h-px w-10 shrink-0 bg-gold/60" />
                    <div>
                      <p className="eyebrow text-gold">{l.label}</p>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-cream/70">{l.spec}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 hidden sm:block">
          <div className="mx-auto flex max-w-[1500px] items-end justify-between px-6 pb-7 sm:px-10">
            <div className="flex items-center gap-4 text-cream/70">
              <span className="h-px w-8 bg-gold/60" />
              <span className="eyebrow">Every detail, together.</span>
            </div>
            <div className="relative hidden h-12 w-64 sm:block">
              <motion.button
                style={{ opacity: cueApart }}
                onClick={() => scrollToProgress(0.5)}
                className="absolute right-0 top-0 flex items-center gap-3 text-xs text-cream/80 transition hover:text-cream"
              >
                Explore the layers
                <span className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-[0.7rem]">↘</span>
              </motion.button>
              <motion.button
                style={{ opacity: cueTogether }}
                onClick={() => scrollToProgress(1)}
                className="absolute right-0 top-0 flex items-center gap-3 text-xs text-cream/80 transition hover:text-cream"
              >
                Bring it together
                <span className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-[0.7rem]">↘</span>
              </motion.button>
            </div>
            <div className="text-right">
              <p className="eyebrow text-cream/80">Nocturne</p>
              <p className="eyebrow mt-1 text-[0.5rem] text-cream/45">An exploration in depth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
