import type { Metadata } from "next";
import { Box, Container } from "@chakra-ui/react";
import { GoldDivider } from "@/components/GoldDivider";
import { PageTransition } from "@/components/PageTransition";
import { HeroSection } from "@/components/HeroSection";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { ServicesPreview } from "@/components/ServicesPreview";
import { VisitUs } from "@/components/VisitUs";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <PageTransition>
      <Box as="main">
        <Container maxW="7xl" px={{ base: 4, md: 6 }} py={10}>
          <HeroSection />
          <GoldDivider />
          <ServicesPreview />
          <GoldDivider />
          <TestimonialsCarousel />
          <GoldDivider />
          <VisitUs />
        </Container>
      </Box>
    </PageTransition>
  );
}
