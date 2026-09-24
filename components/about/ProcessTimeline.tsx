'use client';

import React from 'react';
import TimelineItem, { TimelineStage } from './TimelineItem';

const TIMELINE_STAGES: TimelineStage[] = [
  {
    step: '01',
    title: 'Seed Selection',
    subtitle: 'The Beginning of the Botanical Journey',
    description:
      'Identifying healthy parent crops from shaded tropical valley microclimates, selecting dense botanical varietals that yield uniform three-ribbed cardamom pods.',
    details: ['Highland altitude selection', 'Viable heirloom seeds', 'Soil mineral monitoring'],
    transformation: 'Raw Seed → Germination Nursery',
    badge: 'Origin',
  },
  {
    step: '02',
    title: 'Cultivation',
    subtitle: 'Nurtured in Tropical Shaded Canopies',
    description:
      'Cultivated beneath layered forest foliage where moisture, gentle filtered sunlight, and natural biodiversity support steady root development.',
    details: ['Organic soil stewardship', 'Shade-grown canopy', 'Naturally pollinated'],
    transformation: 'Seed → Sprouting Plant → Mature Fruiting Crop',
    badge: 'Growth',
  },
  {
    step: '03',
    title: 'Harvesting',
    subtitle: 'Selective Hand Harvesting',
    description:
      'Pod clusters are carefully harvested individually by hand precisely as they reach optimal plumpness and firmness, avoiding mechanical bruising.',
    details: ['Hand-plucked by experienced harvesters', 'Stem preservation', 'Zero mechanical bruising'],
    transformation: 'Mature Cluster → Gentle Harvest',
    badge: 'Harvest',
  },
  {
    step: '04',
    title: 'Material Preparation',
    subtitle: 'Grading, Cleaning & Gentle Sun Curing',
    description:
      'Harvested pods undergo multiple cleaning stages, separation of loose husks, gentle curing to lock in color and aromatics, followed by sieve-grading by millimeter diameter.',
    details: ['Hand sorting & screening', 'Aroma preservation drying', 'Uniform diameter sizing'],
    transformation: 'Raw Pods → Cleaned & Graded Botanicals',
    badge: 'Preparation',
  },
  {
    step: '05',
    title: 'Garland Craftsmanship',
    subtitle: 'Artisan Assembly & Traditional Weaving',
    description:
      'Skilled garland makers thread graded pods onto natural unbleached cotton cord, integrating whole nutmeg, star anise, and spice rosettes in harmonious symmetry.',
    details: ['Generational knotting', 'Structural tensile strength', 'Artisanal spice patterns'],
    transformation: 'Cardamom & Spices → Handcrafted Garland',
    badge: 'Craft',
  },
  {
    step: '06',
    title: 'Quality Control',
    subtitle: 'Inspection, Symmetry & Presentation Checks',
    description:
      'Each finished garland is inspected for weight balance, pod alignment, absence of cracked pods, and overall visual balance prior to packaging.',
    details: ['Visual symmetry review', 'Aroma integrity audit', 'Tension & flexibility check'],
    transformation: 'Artisan Bench → Verified Piece',
    badge: 'Verification',
  },
  {
    step: '07',
    title: 'Packaging',
    subtitle: 'Rigid Transport Preparation',
    description:
      'Encased in moisture-resistant protective cushions within sturdy presentation or shipping boxes designed to prevent crushing during domestic or overseas transit.',
    details: ['Bespoke cushioned cradles', 'Desiccant moisture guard', 'Presentation-ready encasement'],
    transformation: 'Finished Garland → Transit Ready',
    badge: 'Protection',
  },
  {
    step: '08',
    title: 'Global Export',
    subtitle: 'From India to Global Celebrations',
    description:
      'Coordinated dispatch for weddings, temples, cultural festivals, and hospitality venues across international regions, bringing natural Indian craftsmanship to the world.',
    details: ['Phytosanitary documentation', 'Air freight priority', 'Worldwide destination reach'],
    transformation: 'India → The World',
    badge: 'Delivery',
  },
];

export default function ProcessTimeline() {
  return (
    <div className="relative py-8">
      {/* Central continuous progress line */}
      <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-linear-to-b from-gold via-botanical to-emerald-dark -translate-x-1/2 z-0" />

      {/* Render 01 - 08 stages */}
      <div className="relative z-10">
        {TIMELINE_STAGES.map((stage, idx) => (
          <TimelineItem
            key={stage.step}
            stage={stage}
            index={idx}
            isLast={idx === TIMELINE_STAGES.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
