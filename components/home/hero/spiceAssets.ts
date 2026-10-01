/**
 * Spice cutouts used by the hero garland.
 *
 * Every asset is a transparent image whose long axis points UP, lit from
 * the top-left, with its soft contact shadow baked in. To swap in real
 * photography or renders of 3D models, export cutouts that follow the same
 * rules (WebP/PNG with alpha, roughly 3–4× the largest display size) and
 * replace the `src` entries below. Several variants per spice are picked
 * at random so repeated pods don't look stamped.
 *
 * `width` is the display width in garland units (the hero stage is 1000
 * units wide) and `aspect` is the image's height / width. Keep `aspect`
 * in sync with the new artwork so nothing is stretched.
 */
export type SpiceKind =
  | 'cardamom'
  | 'clove'
  | 'cinnamon'
  | 'cinnamonBundle'
  | 'starAnise'
  | 'peppercorns'
  | 'chilli'
  | 'bayLeaf'
  | 'greenLeaf'
  | 'turmeric';

export type SpiceAsset = {
  src: readonly string[];
  width: number;
  aspect: number;
};

export const SPICES: Record<SpiceKind, SpiceAsset> = {
  cardamom: {
    src: ['/spices/cardamom-1.svg', '/spices/cardamom-2.svg', '/spices/cardamom-3.svg'],
    width: 20,
    aspect: 86 / 40,
  },
  clove: { src: ['/spices/clove.svg'], width: 13, aspect: 70 / 30 },
  cinnamon: { src: ['/spices/cinnamon.svg'], width: 14, aspect: 150 / 30 },
  cinnamonBundle: { src: ['/spices/cinnamon-bundle.svg'], width: 34, aspect: 150 / 60 },
  starAnise: { src: ['/spices/star-anise.svg'], width: 62, aspect: 1 },
  peppercorns: { src: ['/spices/peppercorns.svg'], width: 30, aspect: 52 / 60 },
  chilli: { src: ['/spices/chilli.svg'], width: 18, aspect: 150 / 40 },
  bayLeaf: { src: ['/spices/bay-leaf.svg'], width: 26, aspect: 132 / 50 },
  greenLeaf: { src: ['/spices/green-leaf.svg'], width: 17, aspect: 80 / 36 },
  turmeric: { src: ['/spices/turmeric.svg'], width: 22, aspect: 124 / 50 },
};
