"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Badge,
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BUSINESS_INFO } from "@/lib/business";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const badgeContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
};

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const words = BUSINESS_INFO.tagline.split(" ");

  return (
    <Grid templateColumns={{ base: "1fr", lg: "1.1fr 1fr" }} gap={8} alignItems="center">
      <Stack gap={5}>
        <Badge alignSelf="flex-start" bg="brand.400" color="black" px={3} py={1} borderRadius="full">
          Jan Istanbul • Jano
        </Badge>

        <Heading as="h1" size="5xl" lineHeight="1.1">
          <motion.span
            style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
            variants={containerVariants}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
          >
            {words.map((word, i) => (
              <motion.span key={i} variants={wordVariants}>
                {word}{i < words.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </motion.span>
        </Heading>

        <Text color="whiteAlpha.800" fontSize="lg">
          Premium barbershop experience in Glasgow for sharp skin fades, traditional shaves, and modern styling.
        </Text>

        <motion.div
          style={{ height: 2, background: "#C9A84C", borderRadius: 1 }}
          initial={prefersReducedMotion ? { width: "100%" } : { width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        />

        <HStack gap={3}>
          <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }} transition={{ type: "spring", stiffness: 300 }}>
            <Button asChild bg="brand.400" color="black" _hover={{ bg: "brand.300" }}>
              <Link href="/book">Book Now</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }} transition={{ type: "spring", stiffness: 300 }}>
            <Button asChild variant="outline" borderColor="whiteAlpha.500">
              <Link href="/services">View Services</Link>
            </Button>
          </motion.div>
        </HStack>

        <motion.div
          variants={badgeContainerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
        >
          {["Open 7 Days", "Walk-ins Welcome", "Expert Barbers"].map((label) => (
            <motion.div key={label} variants={badgeVariants}>
              <Badge>{label}</Badge>
            </motion.div>
          ))}
        </motion.div>
      </Stack>

      <Box borderRadius="2xl" overflow="hidden" border="1px solid" borderColor="whiteAlpha.300">
        <motion.div
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.06] }}
          transition={prefersReducedMotion ? undefined : { duration: 12, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80"
            alt="Barber giving a precision skin fade haircut"
            width={1200}
            height={900}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </motion.div>
      </Box>
    </Grid>
  );
}
