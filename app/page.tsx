import type { Metadata } from "next";
import Script from "next/script";
import { Box, Container } from "@chakra-ui/react";
import { GoldDivider } from "@/components/GoldDivider";
import { PageTransition } from "@/components/PageTransition";
import { HeroSection } from "@/components/HeroSection";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { ServicesPreview } from "@/components/ServicesPreview";
import { VisitUs } from "@/components/VisitUs";
import { FAQ } from "@/components/FAQ";
import { FAQS } from "@/lib/business";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <PageTransition>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Box as="main">
        <Container maxW="7xl" px={{ base: 4, md: 6 }} py={10}>
          <HeroSection />
          <GoldDivider />
          <ServicesPreview />
          <GoldDivider />
          <TestimonialsCarousel />
          <GoldDivider />
          <VisitUs />
          <GoldDivider />
          <FAQ />
        </Container>
      </Box>
    </PageTransition>
  );
}
