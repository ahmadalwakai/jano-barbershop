import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Heading, Text, VStack, List, Button } from "@chakra-ui/react";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Hot Towel Shave Glasgow G69 | Jano Barbershop",
  description:
    "Experience a traditional hot towel shave in Glasgow at Jano Barbershop. Relaxing, smooth, and precise. From £28. Book now.",
  alternates: { canonical: "/services/hot-towel-shave" },
  openGraph: {
    title: "Hot Towel Shave Glasgow G69 | Jano Barbershop",
    description: "Traditional hot towel shave in Glasgow from £28.",
    url: "https://www.jan-o.com/services/hot-towel-shave",
  },
};

export default function HotTowelShavePage() {
  return (
    <PageTransition>
      <Box as="main" py={16}>
        <Container maxW="3xl" px={{ base: 4, md: 6 }}>
          <VStack gap={8} align="stretch">
            <Heading as="h1" size="4xl">
              Hot Towel Shave in Glasgow
            </Heading>
            
            <Text color="whiteAlpha.800" fontSize="lg">
              Relax and enjoy a traditional hot towel shave at Jano Barbershop. Our expert barbers 
              use straight razors and premium products for the smoothest finish possible. The ultimate 
              grooming experience in Glasgow G69.
            </Text>

            <Box>
              <Heading as="h2" size="xl" mb={4}>
                The Experience
              </Heading>
              <List.Root color="whiteAlpha.800" gap={2}>
                <List.Item>Pre-shave hot towel treatment to open pores</List.Item>
                <List.Item>Premium shaving cream lather</List.Item>
                <List.Item>Straight razor shave by skilled barbers</List.Item>
                <List.Item>Cold towel and aftershave balm finish</List.Item>
              </List.Root>
            </Box>

            <Box>
              <Heading as="h2" size="xl" mb={4}>
                Pricing
              </Heading>
              <Text color="whiteAlpha.800" mb={2}>
                <strong>Hot Towel Shave + Hard Shave:</strong> From £28
              </Text>
              <Text color="whiteAlpha.800">
                <strong>Duration:</strong> Approximately 30 minutes
              </Text>
            </Box>

            <Button asChild bg="brand.400" color="black" size="lg" _hover={{ bg: "brand.300" }}>
              <Link href="/book?service=Hot%20Towel%20Shave%20%2B%20Hard%20Shave">Book Your Hot Towel Shave</Link>
            </Button>
          </VStack>
        </Container>
      </Box>
    </PageTransition>
  );
}
