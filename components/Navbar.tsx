"use client";

import Link from "next/link";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { BUSINESS_INFO } from "@/lib/business";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Book", href: "/book" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="50"
      bg="rgba(26, 26, 26, 0.92)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.300"
      backdropFilter="blur(8px)"
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
            <Link key={item.href} href={item.href}>
              <Text fontWeight="600" _hover={{ color: "brand.400" }}>
                {item.label}
              </Text>
            </Link>
          ))}
        </HStack>

        <Button asChild bg="brand.400" color="black" _hover={{ bg: "brand.300" }} size={{ base: "sm", md: "md" }}>
          <Link href="/book">Book Now</Link>
        </Button>
      </Flex>
    </Box>
  );
}
