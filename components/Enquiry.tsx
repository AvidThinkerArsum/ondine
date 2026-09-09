"use client";

import { Rise, Words } from "@/components/ui/Reveal";

export function Enquiry() {
  return (
    <section id="enquiry" className="grain relative overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,#3a0f18_0%,#1a070b_50%,#0c0304_100%)] text-cream">
      <div className="mx-auto max-w-[1500px] px-6 py-32 sm:px-10 lg:py-44">
        <Rise>
          <p className="eyebrow text-gold-light/70">03 / By appointment</p>
        </Rise>
        <h2 className="display mt-8 max-w-4xl text-6xl leading-[0.95] sm:text-8xl lg:text-[7rem]">
          <Words text="Time," italic="kept for you." />
        </h2>
        <Rise delay={0.3} className="mt-10 flex flex-wrap items-center gap-6">
          <a href="mailto:atelier@example.com" className="rounded-full border border-gold/60 px-7 py-4 text-sm text-cream transition hover:bg-gold hover:text-bordeaux-deep">
            Private enquiry ↗
          </a>
          <span className="max-w-xs text-[13px] leading-relaxed text-cream/60">
            Each Ondine is finished to order. Allow twelve weeks; the calibre alone takes six.
          </span>
        </Rise>
      </div>
      <footer className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-6 py-6 text-[11px] text-cream/45 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span>Ondine is a fictional maison built as a design study.</span>
          <span className="eyebrow">The art of the slow hour</span>
        </div>
      </footer>
    </section>
  );
}
