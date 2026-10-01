import React, { useId } from 'react';

/**
 * Brand mark: the letter J drawn as a bamboo culm, with nodes, a cut top
 * and fresh leaves sprouting from the upper node, set in a roundel.
 *
 * The artwork is fixed; `variant` only recolours it, so every option the
 * client compares is the same mark. `app/icon.svg` and `app/apple-icon.png`
 * are exports of the default variant; regenerate them if the default changes.
 */

type Palette = {
  disc: [string, string] | null;
  ring: string | null;
  ringOpacity?: number;
  doubleRing?: boolean;
  culm: string;
  shadow: string;
  light: string;
  nodeDark: string;
  nodeLight: string;
  cut: [string, string];
  leaf: [string, string];
  vein: string;
};

export const LOGO_VARIANTS = {
  // Parchment disc, gold ring, rich bamboo-green J
  grove: {
    disc: ['#FBF8F1', '#EFE5D2'],
    ring: '#B39260',
    ringOpacity: 0.8,
    culm: '#5E8A45',
    shadow: '#2E5228',
    light: '#B9D58E',
    nodeDark: '#2B4A24',
    nodeLight: '#D5E8B4',
    cut: ['#3F6B35', '#1F3A1C'],
    leaf: ['#9CC27A', '#3F6B35'],
    vein: '#E6F0D6',
  },
  // Deep emerald disc, fresh young-bamboo J
  emerald: {
    disc: ['#1D4A39', '#0B2219'],
    ring: '#C9A96B',
    ringOpacity: 0.5,
    culm: '#8DB565',
    shadow: '#4C7A3A',
    light: '#D3EAB0',
    nodeDark: '#3B6330',
    nodeLight: '#E8F4D2',
    cut: ['#5E8A45', '#2B4A24'],
    leaf: ['#C3DDA0', '#6E9E55'],
    vein: '#F0F7E4',
  },
  // Soft sage disc, deep forest J: tonal and calm
  sage: {
    disc: ['#EEF2E8', '#D9E3CF'],
    ring: '#5B7765',
    ringOpacity: 0.55,
    culm: '#2F5D40',
    shadow: '#173828',
    light: '#7FA88A',
    nodeDark: '#0F2A1D',
    nodeLight: '#A9C7B0',
    cut: ['#245845', '#0B2219'],
    leaf: ['#7FA36B', '#2F5D40'],
    vein: '#DCEBD2',
  },
  // Forest-green disc, ivory ring, celadon J (site default, chosen by the client)
  forest: {
    disc: ['#2F5D40', '#173828'],
    ring: '#F4EDE0',
    ringOpacity: 0.55,
    culm: '#B7D39A',
    shadow: '#6E9A5C',
    light: '#ECF6DC',
    nodeDark: '#55804A',
    nodeLight: '#F6FBEE',
    cut: ['#7FA36B', '#3B6330'],
    leaf: ['#D8EBBF', '#86B06A'],
    vein: '#FFFFFF',
  },
  // No disc: the green J alone, for light backgrounds
  mono: {
    disc: null,
    ring: null,
    culm: '#4E7F3E',
    shadow: '#24461F',
    light: '#A9CC80',
    nodeDark: '#1F3A1C',
    nodeLight: '#D5E8B4',
    cut: ['#3F6B35', '#1F3A1C'],
    leaf: ['#8DB565', '#2F5D2C'],
    vein: '#E6F0D6',
  },
  // Ivory disc, double gold ring, emerald J
  heritage: {
    disc: ['#FFFFFF', '#F4EDE0'],
    ring: '#B39260',
    ringOpacity: 1,
    doubleRing: true,
    culm: '#1F5A43',
    shadow: '#0B2E22',
    light: '#6FA58A',
    nodeDark: '#08201A',
    nodeLight: '#9CC7B2',
    cut: ['#174A37', '#0B2219'],
    leaf: ['#6E9E55', '#245845'],
    vein: '#DCEBD2',
  },
} satisfies Record<string, Palette>;

export type LogoVariant = keyof typeof LOGO_VARIANTS;

export default function LogoMark({
  className,
  title = 'J The Divine Eco Valley',
  variant = 'forest',
}: {
  className?: string;
  title?: string;
  variant?: LogoVariant;
}) {
  const p: Palette = LOGO_VARIANTS[variant];
  // Unique ids so several marks on one page don't share gradients or masks
  const id = useId().replace(/:/g, '');
  const leaf = `${id}-leaf`;
  const disc = `${id}-disc`;
  const culm = `${id}-culm`;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      // An empty title marks the logo as decorative (e.g. beside the brand name)
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
    >
      <defs>
        <linearGradient id={leaf} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.leaf[0]} />
          <stop offset="1" stopColor={p.leaf[1]} />
        </linearGradient>
        {p.disc && (
          <radialGradient id={disc} cx="0.35" cy="0.3" r="0.85">
            <stop offset="0" stopColor={p.disc[0]} />
            <stop offset="1" stopColor={p.disc[1]} />
          </radialGradient>
        )}
        <mask id={culm} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <path
            d="M36 13 L36 39.5 C36 49.5 23 51.5 20 42.6"
            stroke="#fff"
            strokeWidth="6.6"
            strokeLinecap="round"
            fill="none"
          />
        </mask>
      </defs>

      {p.disc && <circle cx="32" cy="32" r="31" fill={`url(#${disc})`} />}
      {p.ring && (
        <circle cx="32" cy="32" r="28.2" fill="none" stroke={p.ring} strokeOpacity={p.ringOpacity} strokeWidth=".6" />
      )}
      {p.ring && p.doubleRing && (
        <circle cx="32" cy="32" r="30.2" fill="none" stroke={p.ring} strokeOpacity=".7" strokeWidth=".9" />
      )}

      {/* Leaves sprouting from the upper node */}
      <path d="M39 21.6 C42 16 46.4 12.8 51.4 11.8 C48 16 43.8 20 39 21.6 Z" fill={`url(#${leaf})`} />
      <path d="M39 21.6 C44 15.6 47.8 13 51.4 11.8" stroke={p.vein} strokeWidth=".4" fill="none" opacity=".7" />
      <path
        d="M39.2 23.2 C43 21.2 47.2 21.1 51 22.8 C46.8 24.3 42.8 24.5 39.2 23.2 Z"
        fill={`url(#${leaf})`}
        opacity=".92"
      />
      <path
        d="M32.8 17.2 C30.2 13.8 27 12.1 23.8 11.8 C26.2 14.8 29.4 16.8 32.8 17.2 Z"
        fill={`url(#${leaf})`}
        opacity=".85"
      />

      {/* The J: a bamboo culm bending into a hook, shaded as a cylinder */}
      <g mask={`url(#${culm})`}>
        <rect width="64" height="64" fill={p.culm} />
        <path
          d="M38.6 12 L38.6 39.5 C38.6 52.5 21.4 54.6 17.4 43.4"
          stroke={p.shadow}
          strokeWidth="3"
          fill="none"
          opacity=".75"
        />
        <path
          d="M34.2 12 L34.2 39.5 C34.2 46.6 26.6 48.4 22.6 42"
          stroke={p.light}
          strokeWidth="1.6"
          fill="none"
          opacity=".8"
        />
        {/* Nodes: a dark ring with a pale lip above it */}
        <g strokeLinecap="round" fill="none">
          <path d="M32 22.6 Q36 23.8 40 22.6" stroke={p.nodeDark} strokeWidth="1.2" />
          <path d="M32 21.5 Q36 22.7 40 21.5" stroke={p.nodeLight} strokeWidth=".55" opacity=".85" />
          <path d="M32 32 Q36 33.2 40 32" stroke={p.nodeDark} strokeWidth="1.2" />
          <path d="M32 30.9 Q36 32.1 40 30.9" stroke={p.nodeLight} strokeWidth=".55" opacity=".85" />
          <path d="M28.2 44.2 Q30.2 47.8 29.6 51.6" stroke={p.nodeDark} strokeWidth="1.2" />
          <path d="M29.3 44 Q31.3 47.6 30.8 51.4" stroke={p.nodeLight} strokeWidth=".55" opacity=".75" />
        </g>
      </g>

      {/* Cut top of the culm */}
      <ellipse cx="36" cy="13" rx="3.3" ry="1.1" fill={p.cut[0]} />
      <ellipse cx="36" cy="12.85" rx="2.3" ry=".66" fill={p.cut[1]} />
    </svg>
  );
}
