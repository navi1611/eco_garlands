'use client';

import React from 'react';
import { MAP_DOTS, MAP_HEIGHT, MAP_PINS, MAP_WIDTH } from '@/components/home/worldMapData';

type Point = readonly [number, number];

type Route = {
  key: keyof typeof MAP_PINS;
  label: string;
  // Label placement relative to the pin
  align: 'left' | 'right' | 'above' | 'below';
  duration: number;
  // Negative offsets so every plane is already mid-cycle on first paint
  begin: number;
  lift: number;
  // Where the plane rests along the route when motion is reduced
  still?: number;
};

const ROUTES: Route[] = [
  { key: 'usa', label: 'USA / Canada', align: 'below', duration: 7.5, begin: -0.6, lift: 0.32 },
  { key: 'uk', label: 'UK / Europe', align: 'above', duration: 6, begin: -3.4, lift: 0.3 },
  { key: 'uae', label: 'UAE / GCC', align: 'left', duration: 4.4, begin: -1.8, lift: 0.45 },
  { key: 'sg', label: 'Singapore / SE Asia', align: 'right', duration: 4.8, begin: -0.2, lift: 0.45 },
  { key: 'au', label: 'Australia', align: 'left', duration: 6.2, begin: -4.2, lift: 0.28, still: 0.78 },
];

const ORIGIN = MAP_PINS.origin;

// Quadratic arc from the origin, always bowed upwards like a great-circle route
function arcFor(dest: Point, lift: number) {
  const [x1, y1] = ORIGIN;
  const [x2, y2] = dest;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);
  let nx = dy / dist;
  let ny = -dx / dist;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const cx = (x1 + x2) / 2 + nx * dist * lift;
  const cy = (y1 + y2) / 2 + ny * dist * lift;
  return {
    d: `M${x1} ${y1} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`,
    // Point and heading at t, used for the static (reduced-motion) plane
    at(t: number) {
      const mt = 1 - t;
      const x = mt * mt * x1 + 2 * mt * t * cx + t * t * x2;
      const y = mt * mt * y1 + 2 * mt * t * cy + t * t * y2;
      const tx = 2 * mt * (cx - x1) + 2 * t * (x2 - cx);
      const ty = 2 * mt * (cy - y1) + 2 * t * (y2 - cy);
      return { x, y, angle: (Math.atan2(ty, tx) * 180) / Math.PI };
    },
  };
}

// Plane silhouette pointing along +x, centred on its wings
const PLANE_PATH =
  'M10 0 C10 -1 8.6 -1.5 7 -1.5 L2.6 -1.5 L-2.4 -8.2 L-4.6 -8.2 L-1.6 -1.5 L-5.6 -1.5 L-7.6 -4.2 L-9.2 -4.2 L-8 0 L-9.2 4.2 L-7.6 4.2 L-5.6 1.5 L-1.6 1.5 L-4.6 8.2 L-2.4 8.2 L2.6 1.5 L7 1.5 C8.6 1.5 10 1 10 0 Z';

// Flight occupies the first 78% of each cycle; the rest is a short pause
const FLY_END = 0.78;
const EASE = '0.45 0 0.4 1';
const TRAIL = 0.18;

function Plane() {
  return (
    <path
      d={PLANE_PATH}
      fill="#133B2D"
      stroke="#FFFFFF"
      strokeWidth={1.2}
      strokeLinejoin="round"
      paintOrder="stroke"
    />
  );
}

function AnimatedFlight({ route, d }: { route: Route; d: string }) {
  const id = `route-${route.key}`;
  const timing = {
    dur: `${route.duration}s`,
    begin: `${route.begin}s`,
    repeatCount: 'indefinite',
  } as const;
  const dest = MAP_PINS[route.key];

  return (
    <>
      <g>
        <animate
          attributeName="opacity"
          values="0;1;1;0;0"
          keyTimes={`0;0.06;${FLY_END - 0.04};${FLY_END};1`}
          {...timing}
        />
        {/* Comet trail that follows the plane */}
        <path
          d={d}
          pathLength={1}
          stroke="url(#trail-gradient)"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeDasharray={`${TRAIL} 2`}
        >
          <animate
            attributeName="stroke-dashoffset"
            values={`${TRAIL};${TRAIL - 1};${TRAIL - 1}`}
            keyTimes={`0;${FLY_END};1`}
            calcMode="spline"
            keySplines={`${EASE};0 0 1 1`}
            {...timing}
          />
        </path>
        <g>
          <animateMotion
            keyPoints="0;1;1"
            keyTimes={`0;${FLY_END};1`}
            calcMode="spline"
            keySplines={`${EASE};0 0 1 1`}
            rotate="auto"
            {...timing}
          >
            <mpath href={`#${id}`} />
          </animateMotion>
          <Plane />
        </g>
      </g>

      {/* Touchdown ripple at the destination */}
      <circle cx={dest[0]} cy={dest[1]} r={4} fill="none" stroke="#133B2D" strokeWidth={1.2} opacity={0}>
        <animate
          attributeName="r"
          values="4;4;20;20"
          keyTimes={`0;${FLY_END - 0.02};${FLY_END + 0.16};1`}
          {...timing}
        />
        <animate
          attributeName="opacity"
          values="0;0;0.7;0;0"
          keyTimes={`0;${FLY_END - 0.021};${FLY_END - 0.02};${FLY_END + 0.16};1`}
          {...timing}
        />
      </circle>
    </>
  );
}

const LABEL_POSITION: Record<Route['align'], string> = {
  left: '-translate-x-[calc(100%+12px)] -translate-y-1/2',
  right: 'translate-x-3 -translate-y-1/2',
  above: '-translate-x-1/2 -translate-y-[calc(100%+12px)]',
  below: '-translate-x-1/2 translate-y-3',
};

export default function ExportRouteMap() {
  const routes = ROUTES.map((route) => ({ route, arc: arcFor(MAP_PINS[route.key], route.lift) }));

  return (
    <div>
      <div className="relative w-full" style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}>
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="absolute inset-0 w-full h-full"
          fill="none"
          role="img"
          aria-label="Export routes from Coimbatore, India to North America, Europe, the Gulf, South-East Asia and Australia"
        >
          <defs>
            <linearGradient id="trail-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={MAP_WIDTH} y2="0">
              <stop offset="0" stopColor="#A9884F" />
              <stop offset="1" stopColor="#5B7765" />
            </linearGradient>
            {routes.map(({ route, arc }) => (
              <path key={route.key} id={`route-${route.key}`} d={arc.d} />
            ))}
          </defs>

          {/* Land */}
          <path d={MAP_DOTS} stroke="#CCD4C3" strokeWidth={3.4} strokeLinecap="round" />

          {/* Route lines */}
          {routes.map(({ route, arc }) => (
            <path
              key={route.key}
              d={arc.d}
              stroke="#A9884F"
              strokeWidth={1.3}
              strokeDasharray="3 5"
              strokeLinecap="round"
              opacity={0.55}
              className="route-flow"
            />
          ))}

          {/* Destinations */}
          {routes.map(({ route }) => {
            const [x, y] = MAP_PINS[route.key];
            return (
              <g key={route.key}>
                <circle cx={x} cy={y} r={7} fill="#FFFFFF" stroke="#D6D2C8" />
                <circle cx={x} cy={y} r={3.6} fill="#133B2D" />
              </g>
            );
          })}

          {/* Planes: both versions are rendered and CSS picks one, so the
              server and client markup always match */}
          <g className="motion-reduce:hidden">
            {routes.map(({ route, arc }) => (
              <AnimatedFlight key={route.key} route={route} d={arc.d} />
            ))}
            {[0, 1.3].map((delay) => (
              <circle key={delay} cx={ORIGIN[0]} cy={ORIGIN[1]} r={8} fill="none" stroke="#A9884F" strokeWidth={1.4}>
                <animate attributeName="r" values="8;30" dur="2.6s" begin={`${delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0" dur="2.6s" begin={`${delay}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
          <g className="hidden motion-reduce:inline">
            {routes.map(({ route, arc }) => {
              const p = arc.at(route.still ?? 0.55);
              return (
                <g key={route.key} transform={`translate(${p.x} ${p.y}) rotate(${p.angle})`}>
                  <Plane />
                </g>
              );
            })}
          </g>
          <circle cx={ORIGIN[0]} cy={ORIGIN[1]} r={13} fill="#A9884F" opacity={0.18} />
          <circle cx={ORIGIN[0]} cy={ORIGIN[1]} r={6.5} fill="#A9884F" stroke="#FFFFFF" strokeWidth={2} />
        </svg>

        {/* Labels as HTML so they stay crisp and readable at any width */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          {routes.map(({ route }) => {
            const [x, y] = MAP_PINS[route.key];
            return (
              <span
                key={route.key}
                className={`absolute whitespace-nowrap rounded-full bg-white/90 border border-line px-2.5 py-1 text-[10px] tracking-[0.04em] text-emerald-dark shadow-[var(--shadow-soft)] ${LABEL_POSITION[route.align]}`}
                style={{ left: `${(x / MAP_WIDTH) * 100}%`, top: `${(y / MAP_HEIGHT) * 100}%` }}
              >
                {route.label}
              </span>
            );
          })}
          <span
            className="absolute whitespace-nowrap -translate-x-[calc(100%+14px)] translate-y-2 font-serif text-xs tracking-[0.18em] uppercase text-gold-dark"
            style={{ left: `${(ORIGIN[0] / MAP_WIDTH) * 100}%`, top: `${(ORIGIN[1] / MAP_HEIGHT) * 100}%` }}
          >
            Coimbatore, India
          </span>
        </div>
      </div>

      {/* Compact destination list for small screens */}
      <ul className="sm:hidden mt-4 flex flex-wrap gap-2">
        {ROUTES.map((route) => (
          <li
            key={route.key}
            className="rounded-full border border-line bg-white px-2.5 py-1 text-[11px] text-emerald-dark"
          >
            {route.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
