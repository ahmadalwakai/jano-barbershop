import { Box, Container, HStack, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/business";

export function Footer() {
  return (
    <Box as="footer" borderTop="1px solid" borderColor="whiteAlpha.300" py={8} mt={16}>
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
            <ChakraLink asChild>
              <Link href="/">Home</Link>
            </ChakraLink>
            <ChakraLink asChild>
              <Link href="/services">Services</Link>
            </ChakraLink>
            <ChakraLink asChild>
              <Link href="/book">Book</Link>
            </ChakraLink>
            <ChakraLink asChild>
              <Link href="/contact">Contact</Link>
            </ChakraLink>
          </HStack>
        </Stack>

        <Text mt={6} fontSize="sm" color="whiteAlpha.700">
          © {new Date().getFullYear()} {BUSINESS_INFO.companyName}. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
