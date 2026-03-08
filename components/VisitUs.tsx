"use client";

import { Box, Grid, Heading, Stack, Table, Text } from "@chakra-ui/react";
import { SectionReveal } from "@/components/SectionReveal";
import { BUSINESS_INFO, OPENING_HOURS } from "@/lib/business";

export function VisitUs() {
  return (
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
  );
}
