import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Heading, Text, VStack, List, Button } from "@chakra-ui/react";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Beard Trim Glasgow G69 | Jano Barbershop",
  description:
    "Professional beard trimming and shaping in Glasgow. Hot towel treatment included. From £10 walk-in. Book at Jano Barbershop.",
  alternates: { canonical: "/services/beard-trim" },
  openGraph: {
    title: "Beard Trim Glasgow G69 | Jano Barbershop",
    description: "Expert beard grooming in Glasgow from £10. Book online.",
    url: "https://www.jan-o.com/services/beard-trim",
  },
};

export default function BeardTrimPage() {
  return (
    <PageTransition>
      <Box as="main" py={16}>
        <Container maxW="3xl" px={{ base: 4, md: 6 }}>
          <VStack gap={8} align="stretch">
            <Heading as="h1" size="4xl">
              Beard Trim in Glasgow
            </Heading>
            
            <Text color="whiteAlpha.800" fontSize="lg">
              Keep your beard sharp and well-groomed with our professional beard trim service at 
              Jano Barbershop. We shape, line up, and style your beard to perfection. Visit us in 
              Glasgow G69 for the best beard grooming experience.
            </Text>

            <Box>
              <Heading as="h2" size="xl" mb={4}>
                Our Beard Services
              </Heading>
              <List.Root color="whiteAlpha.800" gap={2}>
                <List.Item>Beard trim and shape</List.Item>
                <List.Item>Hot towel treatment</List.Item>
                <List.Item>Beard line-up and edge work</List.Item>
                <List.Item>Beard oil and balm finish</List.Item>
              </List.Root>
            </Box>

            <Box>
              <Heading as="h2" size="xl" mb={4}>
                Pricing
              </Heading>
              <Text color="whiteAlpha.800" mb={2}>
                <strong>Walk-in:</strong> From £10
              </Text>
              <Text color="whiteAlpha.800">
                <strong>With Haircut Combo:</strong> Great value packages available
              </Text>
            </Box>

            <Button asChild bg="brand.400" color="black" size="lg" _hover={{ bg: "brand.300" }}>
              <Link href="/book?service=Beard%20Trim">Book Your Beard Trim</Link>
            </Button>
          </VStack>
        </Container>
      </Box>
    </PageTransition>
  );
}
