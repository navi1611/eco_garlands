import { BadgeCheck, Flower2, Hand, Package, Plane, Sprout, Sun, Trees, type LucideIcon } from 'lucide-react';

export type ProcessPhase = 'Grow' | 'Prepare' | 'Craft' | 'Deliver';

export interface TimelineStage {
  step: string;
  title: string;
  subtitle: string;
  // One line for the quick view
  summary: string;
  description: string;
  details: string[];
  transformation?: string;
  badge?: string;
  phase: ProcessPhase;
  icon: LucideIcon;
}

// The four phases the eight stages fall into, in order
export const PROCESS_PHASES: ProcessPhase[] = ['Grow', 'Prepare', 'Craft', 'Deliver'];

export const PROCESS_STAGES: TimelineStage[] = [
  {
    step: '01',
    title: 'Seed Selection',
    subtitle: 'The Beginning of the Botanical Journey',
    summary: 'Healthy parent crops are chosen in shaded valley microclimates for uniform, three-ribbed pods.',
    description:
      'Identifying healthy parent crops from shaded tropical valley microclimates, selecting dense botanical varietals that yield uniform three-ribbed cardamom pods.',
    details: ['Highland altitude selection', 'Viable heirloom seeds', 'Soil mineral monitoring'],
    transformation: 'Raw Seed → Germination Nursery',
    badge: 'Origin',
    phase: 'Grow',
    icon: Sprout,
  },
  {
    step: '02',
    title: 'Cultivation',
    subtitle: 'Nurtured in Tropical Shaded Canopies',
    summary: 'Plants grow beneath layered forest foliage, with filtered sunlight, moisture and natural biodiversity.',
    description:
      'Cultivated beneath layered forest foliage where moisture, gentle filtered sunlight, and natural biodiversity support steady root development.',
    details: ['Organic soil stewardship', 'Shade-grown canopy', 'Naturally pollinated'],
    transformation: 'Seed → Sprouting Plant → Mature Fruiting Crop',
    badge: 'Growth',
    phase: 'Grow',
    icon: Trees,
  },
  {
    step: '03',
    title: 'Harvesting',
    subtitle: 'Selective Hand Harvesting',
    summary: 'Pod clusters are picked by hand at peak plumpness and firmness, with no mechanical bruising.',
    description:
      'Pod clusters are carefully harvested individually by hand precisely as they reach optimal plumpness and firmness, avoiding mechanical bruising.',
    details: ['Hand-plucked by experienced harvesters', 'Stem preservation', 'Zero mechanical bruising'],
    transformation: 'Mature Cluster → Gentle Harvest',
    badge: 'Harvest',
    phase: 'Grow',
    icon: Hand,
  },
  {
    step: '04',
    title: 'Material Preparation',
    subtitle: 'Grading, Cleaning & Gentle Sun Curing',
    summary: 'Pods are cleaned, gently sun-cured to lock in colour and aroma, then sieve-graded by diameter.',
    description:
      'Harvested pods undergo multiple cleaning stages, separation of loose husks, gentle curing to lock in color and aromatics, followed by sieve-grading by millimeter diameter.',
    details: ['Hand sorting & screening', 'Aroma preservation drying', 'Uniform diameter sizing'],
    transformation: 'Raw Pods → Cleaned & Graded Botanicals',
    badge: 'Preparation',
    phase: 'Prepare',
    icon: Sun,
  },
  {
    step: '05',
    title: 'Garland Craftsmanship',
    subtitle: 'Artisan Assembly & Traditional Weaving',
    summary: 'Artisans thread graded pods onto natural cotton cord with nutmeg, star anise and spice rosettes.',
    description:
      'Skilled garland makers thread graded pods onto natural unbleached cotton cord, integrating whole nutmeg, star anise, and spice rosettes in harmonious symmetry.',
    details: ['Generational knotting', 'Structural tensile strength', 'Artisanal spice patterns'],
    transformation: 'Cardamom & Spices → Handcrafted Garland',
    badge: 'Craft',
    phase: 'Craft',
    icon: Flower2,
  },
  {
    step: '06',
    title: 'Quality Control',
    subtitle: 'Inspection, Symmetry & Presentation Checks',
    summary: 'Every garland is checked for weight balance, pod alignment, cracked pods and overall symmetry.',
    description:
      'Each finished garland is inspected for weight balance, pod alignment, absence of cracked pods, and overall visual balance prior to packaging.',
    details: ['Visual symmetry review', 'Aroma integrity audit', 'Tension & flexibility check'],
    transformation: 'Artisan Bench → Verified Piece',
    badge: 'Verification',
    phase: 'Craft',
    icon: BadgeCheck,
  },
  {
    step: '07',
    title: 'Packaging',
    subtitle: 'Rigid Transport Preparation',
    summary: 'Garlands are cushioned against moisture in sturdy boxes that prevent crushing in transit.',
    description:
      'Encased in moisture-resistant protective cushions within sturdy presentation or shipping boxes designed to prevent crushing during domestic or overseas transit.',
    details: ['Bespoke cushioned cradles', 'Desiccant moisture guard', 'Presentation-ready encasement'],
    transformation: 'Finished Garland → Transit Ready',
    badge: 'Protection',
    phase: 'Deliver',
    icon: Package,
  },
  {
    step: '08',
    title: 'Global Export',
    subtitle: 'From India to Global Celebrations',
    summary: 'Dispatched to weddings, temples, festivals and hospitality venues around the world.',
    description:
      'Coordinated dispatch for weddings, temples, cultural festivals, and hospitality venues across international regions, bringing natural Indian craftsmanship to the world.',
    details: ['Phytosanitary documentation', 'Air freight priority', 'Worldwide destination reach'],
    transformation: 'India → The World',
    badge: 'Delivery',
    phase: 'Deliver',
    icon: Plane,
  },
];
