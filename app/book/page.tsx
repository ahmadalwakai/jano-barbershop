import type { Metadata } from "next";
import { Box, Container, Heading } from "@chakra-ui/react";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book Appointment | Jano Barbershop",
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
    <Box as="main" py={10}>
      <Container maxW="3xl" px={{ base: 4, md: 6 }}>
        <Heading size="4xl" mb={6}>
          Book Your Appointment
        </Heading>
        <BookingForm initialService={service} />
      </Container>
    </Box>
  );
}
