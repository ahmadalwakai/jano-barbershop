import type { Metadata } from "next";
import Script from "next/script";
import { Box, Container } from "@chakra-ui/react";
import { GoldDivider } from "@/components/GoldDivider";
import { PageTransition } from "@/components/PageTransition";
import { HeroSection } from "@/components/HeroSection";
import { ServicesPreview } from "@/components/ServicesPreview";
import { VisitUs } from "@/components/VisitUs";

const testimonials = [
  {
    name: "Bob McCallum",
    avatar: "BM",
    rating: 5,
    text: "Good Turkish barbers very friendly staff and reasonable priced haircuts.",
    badge: "Local Guide · 214 reviews"
  },
  {
    name: "Brian Clayton",
    avatar: "BC",
    rating: 5,
    text: "Friendly staff, a fair price, and great attention to detail — I wouldn't take my hair anywhere else!",
    badge: "Local Guide · 14 reviews"
  },
  {
    name: "James McLoone",
    avatar: "JM",
    rating: 5,
    text: "So good and so professional — masters of their art. Nothing but praise, keep up the great work and you will always be busy.",
    badge: "5 reviews"
  },
  {
    name: "Jamielee King",
    avatar: "JK",
    rating: 5,
    text: "My wee boy just got the best comb over he's ever had. The guy was lovely, took his time and was very patient. Would deffo recommend and we will certainly be back!",
    badge: "2 reviews"
  },
  {
    name: "alan ross",
    avatar: "AR",
    rating: 5,
    text: "Staff are friendly and helpful with the kids and you get a good haircut as well.",
    badge: "Local Guide · 16 reviews"
  },
  {
    name: "Ruben Arnez",
    avatar: "RA",
    rating: 5,
    text: "Great haircut — they took a lot of time and care and listened to what I wanted.",
    badge: "Local Guide · 10 reviews"
  },
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

        {/* Google Reviews Section */}
        <section style={{ padding: "5rem 1.5rem", background: "#111111" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ color: "#c9a84c", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem", margin: "0 0 0.5rem" }}>
              Google Reviews
            </p>
            <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 700, margin: "0 0 1rem" }}>
              What Our Clients Say
            </h2>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "999px", padding: "0.5rem 1.2rem" }}>
              <span style={{ color: "#fbbc04", fontSize: "1rem" }}>★★★★★</span>
              <span style={{ color: "white", fontWeight: 700, fontSize: "0.95rem" }}>4.3</span>
              <span style={{ color: "#666", fontSize: "0.85rem" }}>· 94 Reviews on Google</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1.25rem", maxWidth: "1050px", margin: "0 auto" }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "16px", padding: "1.5rem", display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
                <div style={{ color: "#fbbc04", fontSize: "0.9rem", letterSpacing: "2px" }}>
                  {"★".repeat(t.rating)}
                </div>
                <p style={{ color: "#cccccc", lineHeight: 1.65, margin: 0, fontSize: "0.93rem", flexGrow: 1 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #2a2a2a" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#c9a84c", display: "flex", alignItems: "center", justifyContent: "center", color: "#111", fontWeight: 700, fontSize: "0.78rem", flexShrink: 0 }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ color: "white", fontWeight: 600, margin: 0, fontSize: "0.88rem" }}>{t.name}</p>
                    <p style={{ color: "#555", margin: 0, fontSize: "0.75rem" }}>{t.badge} · Google</p>
                  </div>
                  <div style={{ marginLeft: "auto", color: "#4285f4", fontWeight: 700, fontSize: "1rem" }}>G</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a
              href="https://www.google.com/maps/place/Jano+Barber"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#c9a84c", border: "1px solid #c9a84c", borderRadius: "999px", padding: "0.6rem 1.6rem", fontSize: "0.85rem", textDecoration: "none", display: "inline-block", transition: "all 0.2s" }}
            >
              See All 94 Reviews on Google →
            </a>
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
