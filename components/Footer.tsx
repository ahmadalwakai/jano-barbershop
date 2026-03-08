"use client";

import { Box, Container, HStack, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BUSINESS_INFO } from "@/lib/business";

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.footer
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ borderTop: "1px solid rgba(255,255,255,0.2)", marginTop: 64 }}
    >
      <Box py={8}>
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <Stack direction={{ base: "column", md: "row" }} justify="space-between" gap={6}>
            <Box>
              <Text fontFamily="heading" fontSize="2xl" color="brand.400">
                {BUSINESS_INFO.shopName}
              </Text>
              <Text color="whiteAlpha.800">{BUSINESS_INFO.companyName}</Text>
              <Text color="whiteAlpha.700" fontSize="sm" mt={2}>
                {BUSINESS_INFO.address}
              </Text>
            </Box>

            <HStack gap={4} alignSelf={{ base: "flex-start", md: "center" }}>
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Book", href: "/book" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <ChakraLink
                  key={item.href}
                  asChild
                  _hover={{ color: "brand.400" }}
                  transition="color 0.2s"
                >
                  <Link href={item.href}>{item.label}</Link>
                </ChakraLink>
              ))}
            </HStack>
          </Stack>

          <Text mt={6} fontSize="sm" color="whiteAlpha.700">
            © {new Date().getFullYear()} {BUSINESS_INFO.companyName}. All rights reserved.
          </Text>
        </Container>
      </Box>
    </motion.footer>
  );
}
