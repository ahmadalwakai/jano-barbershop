"use client";

import { Grid, Heading } from "@chakra-ui/react";
import { SectionReveal } from "@/components/SectionReveal";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/lib/business";

export function ServicesPreview() {
  return (
    <SectionReveal mt={16}>
      <Heading size="3xl" mb={6}>
        Services Preview
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={5}>
        {SERVICES.slice(0, 4).map((service, index) => (
          <ServiceCard key={service.name} service={service} index={index} />
        ))}
      </Grid>
    </SectionReveal>
  );
}
