import type { Metadata } from "next";
import { Box, Container, Heading } from "@chakra-ui/react";
import { BookingForm } from "@/components/BookingForm";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Book a Skin Fade in Glasgow G69 | Jano Barbershop",
  description: "Book your haircut online at Jano Barbershop Glasgow. Expert skin fades, beard trims & kids cuts. Same day slots available. Open 7 days.",
  alternates: { canonical: "/book" },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const service = typeof params.service === "string" ? params.service : undefined;

  return (
    <PageTransition>
      <Box as="main" py={10}>
        <Container maxW="3xl" px={{ base: 4, md: 6 }}>
          <Heading size="4xl" mb={6}>
            Book Your Appointment
          </Heading>
          <BookingForm initialService={service} />
        </Container>
      </Box>
    </PageTransition>
  );
}
