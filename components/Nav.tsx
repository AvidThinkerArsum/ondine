"use client";

export function Nav() {
  return (
    <header className="nav-blend pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 sm:h-20 sm:px-10">
        <a href="#collection" className="pointer-events-auto flex items-center gap-3 text-xs tracking-wide">
          <span className="flex flex-col gap-[5px]">
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-6 bg-current" />
          </span>
          <span className="hidden sm:inline">Explore</span>
        </a>
        <a href="#top" className="pointer-events-auto text-center">
          <span className="display block text-2xl tracking-[0.26em] sm:text-3xl sm:tracking-[0.28em]">ONDINE</span>
          <span className="eyebrow mt-1 hidden text-[0.55rem] opacity-80 sm:block">The art of the slow hour</span>
        </a>
        <a href="#enquiry" className="pointer-events-auto whitespace-nowrap text-xs tracking-wide">
          <span className="hidden sm:inline">Private enquiry</span>
          <span className="sm:hidden">Enquire</span>
          <span className="ml-1 inline-block text-[0.6rem]">↗</span>
        </a>
      </nav>
    </header>
  );
}
