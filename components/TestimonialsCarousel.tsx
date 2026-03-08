"use client";

import { useCallback, useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { TESTIMONIALS } from "@/lib/business";

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, prefersReducedMotion]);

  const review = TESTIMONIALS[current];

  return (
    <SectionReveal mt={16}>
      <Heading size="3xl" mb={6}>
        Testimonials
      </Heading>
      <Box
        position="relative"
        overflow="hidden"
        minH="180px"
        p={6}
        border="1px solid"
        borderColor="whiteAlpha.300"
        borderRadius="xl"
        bg="whiteAlpha.100"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={prefersReducedMotion ? undefined : { x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { x: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.span
              style={{
                fontSize: 80,
                lineHeight: 1,
                color: "#C9A84C",
                fontFamily: "serif",
                display: "block",
                marginBottom: -16,
              }}
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              &ldquo;
            </motion.span>
            <Text color="whiteAlpha.800" fontSize="lg" mb={3}>
              {review.quote}
            </Text>
            <Text color="brand.300" fontWeight="700">
              {review.name}
            </Text>
          </motion.div>
        </AnimatePresence>

        <Box display="flex" justifyContent="center" gap={2} mt={4}>
          {TESTIMONIALS.map((_, i) => (
            <Box
              key={i}
              as="button"
              w={2}
              h={2}
              borderRadius="full"
              bg={i === current ? "brand.400" : "whiteAlpha.400"}
              transition="background 0.3s"
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </Box>
      </Box>
    </SectionReveal>
  );
}
