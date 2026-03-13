import type { Metadata } from "next";
import Script from "next/script";
import { Box, Container } from "@chakra-ui/react";
import { GoldDivider } from "@/components/GoldDivider";
import { PageTransition } from "@/components/PageTransition";
import { HeroSection } from "@/components/HeroSection";
import { ServicesPreview } from "@/components/ServicesPreview";
import { VisitUs } from "@/components/VisitUs";

const testimonials = [
  { text: "Best skin fade in the area. Clean shop, great atmosphere, and always consistent.", author: "Adam M." },
  { text: "Booked online and everything was smooth. Friendly team and top-class beard trim.", author: "Yusuf K." },
  { text: "Took my son for a kids fade and he loved it. Professional and welcoming every time.", author: "Liam R." },
];

const faqs = [
  { q: "How much is a skin fade in Glasgow?", a: "A skin fade at Jano Barbershop starts from £15 for walk-ins and £20 for appointments." },
  { q: "Do you accept walk-ins?", a: "Yes, we welcome walk-ins 7 days a week. Mon–Sat 9AM–6PM, Sunday 9AM–5PM." },
  { q: "Where is Jano Barbershop located?", a: "We're at 178 Cumbernauld Road, Muirhead, Glasgow G69 9NB, near Chryston and Stepps." },
  { q: "Can I book a kids haircut online?", a: "Yes, kids skin fades are available from £12 walk-in or £16 by appointment." },
  { q: "Do you offer beard trims?", a: "Yes, beard trims start from £10 walk-in. Hot towel shave packages also available from £28." },
];

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
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
        </Container>

        {/* Static Testimonials Section */}
        <section style={{ padding: "4rem 1.5rem", background: "#111" }}>
          <h2 style={{ textAlign: "center", color: "white", marginBottom: "2rem" }}>What Our Clients Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "900px", margin: "0 auto" }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: "12px", padding: "1.5rem" }}>
                <p style={{ color: "#ccc", marginBottom: "1rem" }}>&quot;{t.text}&quot;</p>
                <p style={{ color: "#c9a84c", fontWeight: 600 }}>— {t.author}</p>
              </div>
            ))}
          </div>
        </section>

        <Container maxW="7xl" px={{ base: 4, md: 6 }} py={10}>
          <VisitUs />
        </Container>

        {/* Static FAQ Section */}
        <section style={{ padding: "4rem 1.5rem", background: "#0a0a0a" }}>
          <h2 style={{ textAlign: "center", color: "white", marginBottom: "2rem" }}>Frequently Asked Questions</h2>
          <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: "1px solid #222", paddingBottom: "1rem" }}>
                <p style={{ color: "#c9a84c", fontWeight: 600, marginBottom: "0.4rem" }}>{f.q}</p>
                <p style={{ color: "#aaa" }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </Box>
    </PageTransition>
  );
}
