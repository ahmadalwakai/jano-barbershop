"use client";

import { Box, type BoxProps } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

export function SectionReveal(props: BoxProps) {
  const { children, ...rest } = props;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Box {...rest}>{children}</Box>
    </motion.div>
  );
}
