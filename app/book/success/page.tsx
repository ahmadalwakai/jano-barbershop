import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Booking Confirmed | Jano Barbershop",
  alternates: { canonical: "/book/success" },
};

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : "";

  return (
    <PageTransition>
    <Box as="main" py={16}>
      <Container maxW="2xl" textAlign="center">
        <Stack gap={4}>
          <Heading size="4xl">Payment Successful</Heading>
          <Text>Your booking has been received. You will get a confirmation email shortly.</Text>
          {sessionId ? <Text color="whiteAlpha.700">Session ID: {sessionId}</Text> : null}
          <Button asChild bg="brand.400" color="black" _hover={{ bg: "brand.300" }} alignSelf="center">
            <Link href="/">Return Home</Link>
          </Button>
        </Stack>
      </Container>
    </Box>

    {process.env.NEXT_PUBLIC_GA_ID && (
      <Script id="gtag-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': '${process.env.NEXT_PUBLIC_GA_ID}',
            'event_category': 'booking',
            'event_label': 'booking_confirmed'
          });
        `}
      </Script>
    )}
    </PageTransition>
  );
}
