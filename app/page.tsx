import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { SectionReveal } from "@/components/SectionReveal";
import { ServiceCard } from "@/components/ServiceCard";
import { BUSINESS_INFO, OPENING_HOURS, SERVICES, TESTIMONIALS } from "@/lib/business";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <Box as="main">
      <Container maxW="7xl" px={{ base: 4, md: 6 }} py={10}>
        <SectionReveal>
          <Grid templateColumns={{ base: "1fr", lg: "1.1fr 1fr" }} gap={8} alignItems="center">
            <Stack gap={5}>
              <Badge alignSelf="flex-start" bg="brand.400" color="black" px={3} py={1} borderRadius="full">
                Jan Istanbul • Jano
              </Badge>
              <Heading as="h1" size="5xl" lineHeight="1.1">
                {BUSINESS_INFO.tagline}
              </Heading>
              <Text color="whiteAlpha.800" fontSize="lg">
                Premium barbershop experience in Glasgow for sharp skin fades, traditional shaves, and modern styling.
              </Text>
              <HStack gap={3}>
                <Button asChild bg="brand.400" color="black" _hover={{ bg: "brand.300" }}>
                  <Link href="/book">Book Now</Link>
                </Button>
                <Button asChild variant="outline" borderColor="whiteAlpha.500">
                  <Link href="/services">View Services</Link>
                </Button>
              </HStack>
              <HStack gap={3} flexWrap="wrap">
                <Badge>Open 7 Days</Badge>
                <Badge>Walk-ins Welcome</Badge>
                <Badge>Expert Barbers</Badge>
              </HStack>
            </Stack>

            <Box borderRadius="2xl" overflow="hidden" border="1px solid" borderColor="whiteAlpha.300">
              <Image
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80"
                alt="Barber giving a precision skin fade haircut"
                width={1200}
                height={900}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
        </SectionReveal>

        <SectionReveal mt={16}>
          <Heading size="3xl" mb={6}>
            Services Preview
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={5}>
            {SERVICES.slice(0, 4).map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </Grid>
        </SectionReveal>

        <SectionReveal mt={16}>
          <Heading size="3xl" mb={6}>
            Testimonials
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={5}>
            {TESTIMONIALS.map((review) => (
              <Box key={review.name} p={5} border="1px solid" borderColor="whiteAlpha.300" borderRadius="xl" bg="whiteAlpha.100">
                <Text color="whiteAlpha.800" mb={3}>
                  “{review.quote}”
                </Text>
                <Text color="brand.300" fontWeight="700">
                  {review.name}
                </Text>
              </Box>
            ))}
          </Grid>
        </SectionReveal>

        <SectionReveal mt={16}>
          <Heading size="3xl" mb={6}>
            Visit Us
          </Heading>
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
            <Box borderRadius="xl" overflow="hidden" border="1px solid" borderColor="whiteAlpha.300" minH="360px">
              <iframe
                title="Google Maps location for Jano Barbershop"
                src="https://www.google.com/maps?q=178%20Cumbernauld%20Road%20G69%209NB&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
            <Stack gap={5}>
              <Box>
                <Text fontWeight="700" mb={2}>
                  Opening Hours
                </Text>
                <Table.Root size="sm" variant="outline">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Monday - Saturday</Table.Cell>
                      <Table.Cell>{OPENING_HOURS.mondayToSaturday.open} - {OPENING_HOURS.mondayToSaturday.close}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Sunday</Table.Cell>
                      <Table.Cell>{OPENING_HOURS.sunday.open} - {OPENING_HOURS.sunday.close}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </Box>
              <Box>
                <Text fontWeight="700" mb={1}>
                  Contact
                </Text>
                <Text>{BUSINESS_INFO.phoneDisplay}</Text>
                <Text>{BUSINESS_INFO.email}</Text>
                <Text>{BUSINESS_INFO.address}</Text>
              </Box>
            </Stack>
          </Grid>
        </SectionReveal>
      </Container>
    </Box>
  );
}
