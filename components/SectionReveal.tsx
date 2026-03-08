"use client";

import { Box, type BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

export function SectionReveal(props: BoxProps) {
  const { children, ...rest } = props;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Box {...rest}>{children}</Box>
    </MotionDiv>
  );
}
