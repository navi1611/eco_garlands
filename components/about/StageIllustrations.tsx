import React from 'react';

/*
 * Spot illustrations for the eight process stages, in the brand palette.
 * Elements with an `art-*` class move gently once their stage is active
 * (see the "About: stage illustrations" block in globals.css); all motion
 * is off for reduced-motion visitors.
 */

const C = {
  disc: '#EEF2E8',
  discEdge: '#DCE6D2',
  forest: '#245845',
  forestDeep: '#173828',
  leaf: '#6E9A4F',
  leafLight: '#9CC27A',
  pod: '#8FA556',
  podDark: '#5E7A3E',
  gold: '#C9A462',
  goldDeep: '#8A6C3E',
  sun: '#E6B85C',
  soil: '#B08A5A',
  soilDeep: '#8A6C3E',
  cream: '#FBF8F1',
  ink: '#173828',
};

// Rounded so server and browser floating point always agree (no hydration mismatch)
const n = (v: number) => Number(v.toFixed(2));

// A small cardamom pod, centred on (x, y), rotated `r` degrees
function Pod({ x, y, r = 0, s = 1, className }: { x: number; y: number; r?: number; s?: number; className?: string }) {
  return (
    <g transform={`translate(${n(x)} ${n(y)}) rotate(${n(r)}) scale(${n(s)})`} className={className}>
      <ellipse rx="3.6" ry="6.4" fill={C.pod} />
      <path d="M0 -6 Q-1.6 0 0 6" stroke={C.podDark} strokeWidth=".7" fill="none" opacity=".7" />
      <ellipse cx="-1.3" cy="-1.8" rx=".9" ry="2.4" fill="#fff" opacity=".35" />
    </g>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <circle cx="60" cy="60" r="56" fill={C.disc} />
      <circle cx="60" cy="60" r="55.5" fill="none" stroke={C.discEdge} />
      {children}
    </>
  );
}

// 01 · A seedling rising from soil sown with cardamom seeds
function SeedSelection() {
  return (
    <Frame>
      <path d="M14 86 Q60 64 106 86 L104 98 Q60 112 16 98 Z" fill={C.soil} />
      <path d="M22 92 Q60 80 98 92" stroke={C.soilDeep} strokeWidth="1" fill="none" opacity=".5" />
      {[30, 44, 76, 90].map((x, i) => (
        <circle key={x} cx={x} cy={92 + (i % 2) * 3} r="1.3" fill={C.soilDeep} opacity=".7" />
      ))}
      <Pod x={36} y={86} r={-70} s={0.8} />
      <Pod x={84} y={87} r={64} s={0.8} />
      <g className="art-sway">
        <path d="M60 80 C60 68 59 58 61 46" stroke={C.forest} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M60 60 C48 60 40 52 39 42 C50 43 58 50 60 60 Z" fill={C.leafLight} />
        <path d="M61 52 C72 50 81 42 83 30 C70 31 62 40 61 52 Z" fill={C.leaf} />
        <path d="M61 52 C68 46 74 40 80 33" stroke={C.forest} strokeWidth=".8" fill="none" opacity=".5" />
      </g>
    </Frame>
  );
}

// 02 · Cardamom plants growing in the dappled shade of a forest canopy
function Cultivation() {
  return (
    <Frame>
      <rect x="54" y="34" width="6" height="64" rx="2" fill={C.soilDeep} />
      <g fill={C.forest}>
        <circle cx="34" cy="34" r="17" />
        <circle cx="58" cy="24" r="19" />
        <circle cx="84" cy="34" r="17" />
      </g>
      <g fill={C.forestDeep} opacity=".55">
        <circle cx="46" cy="40" r="10" />
        <circle cx="74" cy="40" r="11" />
      </g>
      {/* Filtered light */}
      <g className="art-shimmer" fill={C.sun} opacity=".35">
        <path d="M36 48 L42 48 L32 92 L26 92 Z" />
        <path d="M76 50 L81 50 L92 92 L86 92 Z" />
      </g>
      <path d="M18 98 Q60 90 102 98" stroke={C.soil} strokeWidth="3" strokeLinecap="round" fill="none" />
      <g className="art-sway">
        {[-58, -30, -8, 14, 40, 62].map((deg, i) => (
          <path
            key={deg}
            d="M0 0 C-4 -12 -3 -26 0 -34 C3 -26 4 -12 0 0 Z"
            transform={`translate(${30 + (i % 2) * 2} 96) rotate(${deg})`}
            fill={i % 2 ? C.leaf : C.leafLight}
          />
        ))}
        {[-50, -20, 10, 36, 60].map((deg, i) => (
          <path
            key={deg}
            d="M0 0 C-4 -11 -3 -24 0 -31 C3 -24 4 -11 0 0 Z"
            transform={`translate(${88 - (i % 2) * 2} 96) rotate(${deg})`}
            fill={i % 2 ? C.leafLight : C.leaf}
          />
        ))}
      </g>
    </Frame>
  );
}

// 03 · A pod cluster on its stem, one pod dropping into a woven basket
function Harvesting() {
  return (
    <Frame>
      <path d="M60 14 C58 24 54 30 48 36" stroke={C.forest} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M60 14 C62 26 68 32 74 36" stroke={C.forest} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <Pod x={46} y={42} r={20} />
      <Pod x={54} y={40} r={-6} />
      <Pod x={70} y={41} r={8} />
      <Pod x={77} y={43} r={-22} />
      <g className="art-drop">
        <Pod x={62} y={56} r={14} s={1.05} />
        <path d="M56 46 L56 50 M68 46 L68 50" stroke={C.forest} strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
      </g>
      {/* Basket */}
      <path d="M30 76 L90 76 L84 102 Q60 108 36 102 Z" fill={C.gold} />
      <path d="M28 74 Q60 80 92 74 L92 78 Q60 84 28 78 Z" fill={C.goldDeep} />
      <g stroke={C.goldDeep} strokeWidth="1" opacity=".55">
        <path d="M33 86 L87 86" />
        <path d="M35 95 L85 95" />
        {[40, 50, 60, 70, 80].map((x) => (
          <path key={x} d={`M${x} 79 L${x + (x - 60) * 0.1} 104`} />
        ))}
      </g>
      <Pod x={46} y={74} r={-60} s={0.85} />
      <Pod x={58} y={73} r={80} s={0.85} />
      <Pod x={71} y={74} r={-75} s={0.85} />
    </Frame>
  );
}

// 04 · Pods sun-curing on a tray, then graded through a sieve
function Preparation() {
  return (
    <Frame>
      <g className="art-spin">
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            d="M0 -17 L0 -22"
            transform={`translate(84 32) rotate(${i * 45})`}
            stroke={C.sun}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        ))}
      </g>
      <circle cx="84" cy="32" r="11" fill={C.sun} />
      {/* Drying tray in perspective */}
      <path d="M16 72 L92 72 L104 88 L28 88 Z" fill={C.gold} />
      <path d="M28 88 L104 88 L104 92 L28 92 Z" fill={C.goldDeep} />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4, 5].map((col) => (
          <Pod key={`${row}-${col}`} x={30 + col * 11 + row * 4} y={76 + row * 4.5} r={70 + ((row + col) % 3) * 12} s={0.62} />
        )),
      )}
      {/* Sieve */}
      <circle cx="34" cy="44" r="14" fill={C.cream} stroke={C.goldDeep} strokeWidth="2.5" />
      <g stroke={C.goldDeep} strokeWidth=".7" opacity=".55">
        {[-8, -4, 0, 4, 8].map((d) => (
          <React.Fragment key={d}>
            <path d={`M${34 + d} 32 L${34 + d} 56`} />
            <path d={`M22 ${44 + d} L46 ${44 + d}`} />
          </React.Fragment>
        ))}
      </g>
      <Pod x={30} y={42} r={30} s={0.6} />
      <Pod x={38} y={47} r={-40} s={0.6} />
    </Frame>
  );
}

// 05 · A garland being threaded, a star anise at its centre
function Craftsmanship() {
  const pods = Array.from({ length: 11 }, (_, i) => {
    const a = Math.PI * (0.08 + (i / 10) * 0.84);
    return { x: 60 - Math.cos(a) * 34, y: 40 + Math.sin(a) * 34, r: (a * 180) / Math.PI };
  });
  return (
    <Frame>
      <path d="M26 40 A34 34 0 0 0 94 40" stroke={C.goldDeep} strokeWidth="1.2" fill="none" strokeDasharray="2 2" />
      {pods.map((p, i) => (
        <Pod key={i} x={p.x} y={p.y} r={p.r} s={0.95} />
      ))}
      {/* Star anise pendant */}
      <g transform="translate(60 80)">
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d="M0 0 C-3 -4 -3 -9 0 -12 C3 -9 3 -4 0 0 Z" transform={`rotate(${i * 45})`} fill="#8A4A2A" />
        ))}
        <circle r="2.2" fill="#4E2614" />
      </g>
      {/* Needle and trailing thread */}
      <g className="art-sway">
        <path d="M94 40 C100 30 96 22 88 18" stroke={C.goldDeep} strokeWidth="1.2" fill="none" />
        <path d="M86 14 L96 26" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="87" cy="15.2" rx="1.2" ry=".6" fill={C.cream} transform="rotate(50 87 15.2)" />
      </g>
    </Frame>
  );
}

// 06 · A pod under the magnifier, with an approval mark
function QualityControl() {
  return (
    <Frame>
      <Pod x={54} y={58} r={-24} s={2.6} />
      <g className="art-scan">
        <circle cx="56" cy="56" r="21" fill="#fff" fillOpacity=".25" stroke={C.forest} strokeWidth="4.5" />
        <path d="M71 71 L86 86" stroke={C.forest} strokeWidth="7" strokeLinecap="round" />
        <path d="M44 46 Q48 41 54 40" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".7" />
      </g>
      <g transform="translate(86 32)">
        <g className="art-pop">
          <circle r="11" fill={C.leaf} />
          <path d="M-5 0 L-1.5 3.6 L5 -3.6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </g>
    </Frame>
  );
}

// 07 · A garland nested in a cushioned box, guarded against moisture
function Packaging() {
  return (
    <Frame>
      <path d="M26 54 L60 46 L94 54 L60 62 Z" fill="#D9BC7E" />
      {/* Garland peeking out */}
      <g className="art-sway">
        {Array.from({ length: 9 }, (_, i) => {
          const a = Math.PI * (1.05 + (i / 8) * 0.9);
          return <Pod key={i} x={60 + Math.cos(a) * 22} y={56 + Math.sin(a) * 12} r={(a * 180) / Math.PI + 90} s={0.8} />;
        })}
      </g>
      <path d="M26 54 L60 62 L60 100 L26 90 Z" fill={C.gold} />
      <path d="M94 54 L60 62 L60 100 L94 90 Z" fill={C.goldDeep} />
      <path d="M26 54 L14 44 L48 38 L60 46 Z" fill="#E2C994" />
      <path d="M94 54 L106 44 L72 38 L60 46 Z" fill="#CDAE70" />
      <path d="M38 74 L50 77" stroke={C.cream} strokeWidth="2" strokeLinecap="round" opacity=".7" />
      {/* Moisture guard badge */}
      <g transform="translate(88 82)">
        <circle r="11" fill={C.cream} stroke={C.forest} strokeWidth="1.5" />
        <path d="M0 -6 C3 -2 5 1 5 3 A5 5 0 0 1 -5 3 C-5 1 -3 -2 0 -6 Z" fill="#8DB5C9" />
        <path d="M-6 6 L6 -6" stroke={C.forest} strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </Frame>
  );
}

// 08 · A globe with a flight path leaving India
function GlobalExport() {
  return (
    <Frame>
      <circle cx="60" cy="68" r="30" fill="#DCE7D3" stroke={C.forest} strokeWidth="1.5" />
      <g stroke={C.forest} strokeWidth=".8" fill="none" opacity=".35">
        <ellipse cx="60" cy="68" rx="14" ry="30" />
        <path d="M30 68 L90 68 M34 54 L86 54 M34 82 L86 82" />
      </g>
      <g fill={C.leaf} opacity=".85">
        <path d="M44 52 C50 48 58 50 60 56 C58 62 52 62 48 66 C44 64 40 58 44 52 Z" />
        <path d="M66 62 C72 60 78 64 80 70 C76 76 70 78 68 86 C64 82 64 70 66 62 Z" />
      </g>
      <circle cx="66" cy="66" r="2.4" fill={C.goldDeep} />
      <path d="M66 66 C64 40 80 22 100 26" stroke={C.goldDeep} strokeWidth="1.4" strokeDasharray="3 3" fill="none" />
      <g transform="translate(100 26) rotate(-12)">
        <g className="art-fly">
          <path
            d="M7 0 L2 -1.2 L-2 -6 L-3.6 -6 L-1.4 -1.2 L-4.6 -1 L-6 -3 L-7 -3 L-6.2 0 L-7 3 L-6 3 L-4.6 1 L-1.4 1.2 L-3.6 6 L-2 6 L2 1.2 Z"
            fill={C.ink}
          />
        </g>
      </g>
    </Frame>
  );
}

const ART: Record<string, () => React.ReactElement> = {
  '01': SeedSelection,
  '02': Cultivation,
  '03': Harvesting,
  '04': Preparation,
  '05': Craftsmanship,
  '06': QualityControl,
  '07': Packaging,
  '08': GlobalExport,
};

export default function StageIllustration({
  step,
  active = false,
  className,
}: {
  step: string;
  active?: boolean;
  className?: string;
}) {
  const Art = ART[step];
  if (!Art) return null;
  return (
    <svg viewBox="0 0 120 120" className={`stage-art ${className ?? ''}`} data-active={active} aria-hidden="true">
      <Art />
    </svg>
  );
}
