"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Badge,
  Box,
  Button,
  Grid,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Grid templateColumns={{ base: "1fr", lg: "1.1fr 1fr" }} gap={8} alignItems="center">
      <Stack gap={5}>
        <Badge alignSelf="flex-start" bg="brand.400" color="black" px={3} py={1} borderRadius="full">
          Jan Istanbul • Jano
        </Badge>

        <motion.h1
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 1.1, color: "white" }}
        >
          Premium Cuts. Classic Style. Glasgow&apos;s Finest.
        </motion.h1>

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
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
        >
          {["Open 7 Days", "Walk-ins Welcome", "Expert Barbers"].map((label) => (
            <Badge key={label}>{label}</Badge>
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
