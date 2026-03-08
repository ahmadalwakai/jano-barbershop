"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          y: { duration: 8, ease: "easeInOut", repeat: Infinity },
          opacity: { duration: 6, repeat: Infinity },
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          y: { duration: 8, ease: "easeInOut", repeat: Infinity },
          opacity: { duration: 6, repeat: Infinity },
        }}
      />
    </div>
  );
}
