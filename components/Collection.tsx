"use client";

import { motion } from "framer-motion";
import { VARIANTS } from "@/lib/variants";
import { WatchFlat } from "@/components/watch/Watch";
import { Rise, Words } from "@/components/ui/Reveal";

const ORDER = [VARIANTS.nocturne, VARIANTS.ivoire, VARIANTS.celeste];

export function Collection() {
  return (
    <section id="collection" className="relative bg-cream text-ink">
      <div className="mx-auto max-w-[1500px] px-6 py-28 sm:px-10 lg:py-36">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display text-6xl leading-[0.95] sm:text-7xl lg:text-[5.6rem]">
            <Words text="Three expressions." />
            <br />
            <Words text="One" italic="sensibility." delay={0.15} />
          </h2>
          <Rise delay={0.3} className="max-w-xs text-[14px] leading-relaxed text-ink-2 lg:text-right">
            A different shade of the same conviction. Choose the one that feels like you.
          </Rise>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ORDER.map((v, i) => (
            <Rise key={v.key} delay={i * 0.12}>
              <motion.a
                href="#enquiry"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group relative block overflow-hidden bg-[linear-gradient(180deg,#e9e2d6,#d9d0c1)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
              >
                <div className="absolute left-5 top-5 z-10 text-[11px] text-ink-2">{String(i + 1).padStart(2, "0")}</div>
                <div className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-ink/20 text-[0.65rem] text-ink-2 transition group-hover:bg-ink group-hover:text-cream">
                  ↗
                </div>
                {/* soft contact shadow under the watch */}
                <div aria-hidden className="absolute inset-x-[22%] bottom-[10%] top-[8%] rounded-[50%] bg-black/25 blur-2xl" />
                <div className="relative aspect-[3/4] p-[10%]">
                  <div className="relative mx-auto h-full w-auto" style={{ aspectRatio: "400 / 640" }}>
                    <WatchFlat variant={v} className="h-full w-full transition duration-700 group-hover:scale-[1.03]" />
                  </div>
                </div>
                <div className="flex items-end justify-between border-t border-ink/10 px-6 py-5">
                  <div>
                    <p className="display text-3xl">{v.name}</p>
                    <p className="mt-1 text-[11px] text-ink-2">{v.line}</p>
                  </div>
                  <span className="text-xs text-ink-2">Discover</span>
                </div>
              </motion.a>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
