import React from 'react';

// Fine paper grain, generated once by the browser
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .35 0 0 0 0 .28 0 0 0 0 .18 0 0 0 .5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * The home screen's atmosphere: warm parchment, slowly drifting sunlight
 * and paper grain. The home hero uses it inside its own fixed layer; inner
 * pages pin it behind their content with `fixed inset-0 z-0`.
 */
export default function ParchmentBackground({ className = 'fixed inset-0 z-0' }: { className?: string }) {
  return (
    <div aria-hidden className={`${className} overflow-hidden pointer-events-none`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_44%,#FBF8F1_0%,#F4EDE0_52%,#E8DCC6_100%)]" />
      <div className="hero-light absolute -top-[30%] -left-[20%] w-[90vmax] h-[90vmax] rounded-full bg-[radial-gradient(circle,rgba(226,186,110,0.28)_0%,rgba(226,186,110,0)_62%)]" />
      <div className="hero-light-alt absolute -bottom-[35%] -right-[25%] w-[80vmax] h-[80vmax] rounded-full bg-[radial-gradient(circle,rgba(91,119,101,0.16)_0%,rgba(91,119,101,0)_60%)]" />
      <div className="absolute inset-0 opacity-[0.28]" style={{ backgroundImage: GRAIN }} />
    </div>
  );
}
