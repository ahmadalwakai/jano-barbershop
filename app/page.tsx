import type { Metadata } from "next";
import Script from "next/script";
import { Box, Container, Grid, Heading } from "@chakra-ui/react";
import { GoldDivider } from "@/components/GoldDivider";
import { PageTransition } from "@/components/PageTransition";
import { HeroSection } from "@/components/HeroSection";
import { ServicesPreview } from "@/components/ServicesPreview";
import { VisitUs } from "@/components/VisitUs";
import { FAQ } from "@/components/FAQ";
import { FAQS } from "@/lib/business";

const testimonials = [
  { text: "Best skin fade in the area. Clean shop, great atmosphere, and always consistent.", author: "Adam M." },
  { text: "Booked online and everything was smooth. Friendly team and top-class beard trim.", author: "Yusuf K." },
  { text: "Took my son for a kids fade and he loved it. Professional and welcoming every time.", author: "Liam R." },
];

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
          {/* Server-rendered H1 for SEO */}
          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "white",
            margin: 0,
            marginBottom: "1rem"
          }}>
            Premium Cuts. Classic Style. Glasgow&apos;s Finest.
          </h1>
          <HeroSection />
          <GoldDivider />
          <ServicesPreview />
          <GoldDivider />
          {/* Server-rendered testimonials for SEO */}
          <Box mt={16}>
            <Heading size="3xl" mb={6}>Testimonials</Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
              {testimonials.map((review, index) => (
                <Box
                  key={index}
                  p={6}
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  borderRadius="xl"
                  bg="whiteAlpha.100"
                >
                  <Box
                    as="span"
                    fontSize="5xl"
                    lineHeight={1}
                    color="brand.400"
                    fontFamily="serif"
                    display="block"
                    mb={-2}
                  >
                    &ldquo;
                  </Box>
                  <Box as="p" color="whiteAlpha.800" fontSize="lg" mb={3}>
                    {review.text}
                  </Box>
                  <Box as="p" color="brand.300" fontWeight="700">
                    {review.author}
                  </Box>
                </Box>
              ))}
            </Grid>
          </Box>
          <GoldDivider />
          <VisitUs />
          <GoldDivider />
          <FAQ />
        </Container>
      </Box>
    </PageTransition>
  );
}
