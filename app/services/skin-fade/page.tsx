import type { Metadata } from "next";
import Link from "next/link";
import { Box, Container, Heading, Text, VStack, List, Button } from "@chakra-ui/react";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Skin Fade Glasgow G69 | Jano Barbershop",
  description:
    "Get the best skin fade in Glasgow at Jano Barbershop. Clean fades, sharp lines, and expert barbers. From £15 walk-in. Book your appointment online today.",
  alternates: { canonical: "/services/skin-fade" },
  openGraph: {
    title: "Skin Fade Glasgow G69 | Jano Barbershop",
    description: "Expert skin fades in Glasgow from £15. Book online now.",
    url: "https://www.jan-o.com/services/skin-fade",
  },
};

export default function SkinFadePage() {
  return (
    <PageTransition>
      <Box as="main" py={16}>
        <Container maxW="3xl" px={{ base: 4, md: 6 }}>
          <VStack gap={8} align="stretch">
            <Heading as="h1" size="4xl">
              Skin Fade in Glasgow
            </Heading>
            
            <Text color="whiteAlpha.800" fontSize="lg">
              The skin fade is our most popular service at Jano Barbershop. Our expert barbers deliver
              clean, precise fades tailored to your style — from low skin fades to high tops and 
              everything in between. Located in Glasgow G69, we serve clients from Chryston, Stepps, 
              Muirhead and beyond.
            </Text>

            <Box>
              <Heading as="h2" size="xl" mb={4}>
                What to Expect
              </Heading>
              <List.Root color="whiteAlpha.800" gap={2}>
                <List.Item>Consultation on your preferred fade style</List.Item>
                <List.Item>Precision clipper work with seamless blending</List.Item>
                <List.Item>Hot towel finish and styling</List.Item>
                <List.Item>Aftercare advice for maintaining your fade</List.Item>
              </List.Root>
            </Box>

            <Box>
              <Heading as="h2" size="xl" mb={4}>
                Pricing
              </Heading>
              <Text color="whiteAlpha.800" mb={2}>
                <strong>Walk-in:</strong> From £15
              </Text>
              <Text color="whiteAlpha.800">
                <strong>Appointment:</strong> From £20
              </Text>
            </Box>

            <Button asChild bg="brand.400" color="black" size="lg" _hover={{ bg: "brand.300" }}>
              <Link href="/book?service=Gents%20Skin%20Fade">Book Your Skin Fade</Link>
            </Button>
          </VStack>
        </Container>
      </Box>
    </PageTransition>
  );
}
