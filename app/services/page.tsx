import type { Metadata } from "next";
import { Box, Container, Grid, Heading, Text } from "@chakra-ui/react";
import { ServiceCard } from "@/components/ServiceCard";
import { PageTransition } from "@/components/PageTransition";
import { SERVICES } from "@/lib/business";

export const metadata: Metadata = {
  title: "Barbershop Services & Prices Glasgow G69 | Jano",
  description: "View all services and prices at Jano Barbershop Glasgow. Skin fades from £15, beard trims from £10, kids cuts from £12. Walk-ins welcome.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <Box as="main" py={10}>
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <Heading size="4xl" mb={3}>
            Our Services
          </Heading>
          <Text color="brand.300" mb={8}>
            Appointment bookings include a £5–£7 convenience fee.
          </Text>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={5}>
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.name} service={service} showBookingButton index={index} />
            ))}
          </Grid>
        </Container>
      </Box>
    </PageTransition>
  );
}
