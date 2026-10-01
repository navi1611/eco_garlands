'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ParallaxScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-gold-light via-gold to-emerald origin-left z-50 pointer-events-none"
    />
  );
}
