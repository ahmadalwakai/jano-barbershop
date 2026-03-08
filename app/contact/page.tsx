import type { Metadata } from "next";
import { Box, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { ContactForm } from "@/components/ContactForm";
import { BUSINESS_INFO, OPENING_HOURS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact | Jano Barbershop",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Box as="main" py={10}>
      <Container maxW="7xl" px={{ base: 4, md: 6 }}>
        <Heading size="4xl" mb={8}>
          Contact Us
        </Heading>

        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
          <Stack gap={4}>
            <Text fontWeight="700">Phone: {BUSINESS_INFO.phoneDisplay}</Text>
            <Text fontWeight="700">Email: {BUSINESS_INFO.email}</Text>
            <Text>{BUSINESS_INFO.address}</Text>
            <Text>
              Opening Hours: Monday to Saturday {OPENING_HOURS.mondayToSaturday.open}–{OPENING_HOURS.mondayToSaturday.close}, Sunday {OPENING_HOURS.sunday.open}–{OPENING_HOURS.sunday.close}
            </Text>
            <Box border="1px solid" borderColor="whiteAlpha.300" borderRadius="xl" overflow="hidden" minH="320px">
              <iframe
                title="Jano Barbershop location map"
                src="https://www.google.com/maps?q=178%20Cumbernauld%20Road%20G69%209NB&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </Box>
          </Stack>

          <ContactForm />
        </Grid>
      </Container>
    </Box>
  );
}
