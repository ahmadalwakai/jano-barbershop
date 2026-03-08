"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { BUSINESS_INFO } from "@/lib/business";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Book", href: "/book" },
  { label: "Contact", href: "/contact" },
];

function NavLink({ label, href }: { label: string; href: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link href={href}>
      <Box position="relative" display="inline-block">
        <Text fontWeight="600" _hover={{ color: "brand.400" }} transition="color 0.2s">
          {label}
        </Text>
        {!prefersReducedMotion && (
          <motion.div
            style={{
              position: "absolute",
              bottom: -2,
              left: 0,
              right: 0,
              height: 2,
              background: "#C9A84C",
              transformOrigin: "left",
              scaleX: 0,
            }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        )}
      </Box>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid rgba(255,255,255,0.2)",
      }}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              backgroundColor: scrolled ? "rgba(26,26,26,0.95)" : "rgba(26,26,26,0.6)",
              backdropFilter: scrolled ? "blur(12px)" : "blur(4px)",
            }
      }
      transition={{ duration: 0.3 }}
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={3}
        align="center"
        justify="space-between"
      >
        <Link href="/" aria-label="Jano Barbershop home">
          <Text fontFamily="heading" fontWeight="700" fontSize={{ base: "xl", md: "2xl" }} color="brand.400">
            {BUSINESS_INFO.shopName}
          </Text>
        </Link>

        <HStack gap={5} display={{ base: "none", md: "flex" }}>
          {links.map((item) => (
            <NavLink key={item.href} label={item.label} href={item.href} />
          ))}
        </HStack>

        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  boxShadow: [
                    "0 0 0px #C9A84C",
                    "0 0 18px rgba(201,168,76,0.27)",
                    "0 0 0px #C9A84C",
                  ],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ borderRadius: 8 }}
        >
          <Button asChild bg="brand.400" color="black" _hover={{ bg: "brand.300" }} size={{ base: "sm", md: "md" }}>
            <Link href="/book">Book Now</Link>
          </Button>
        </motion.div>
      </Flex>
    </motion.header>
  );
}
