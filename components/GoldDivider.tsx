"use client";

import { motion, useReducedMotion } from "framer-motion";

export function GoldDivider() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div style={{ padding: "2rem 0" }}>
      <motion.div
        style={{
          height: 1,
          background: "rgba(201,168,76,0.3)",
          transformOrigin: "left",
        }}
        initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
