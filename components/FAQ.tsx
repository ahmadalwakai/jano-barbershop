"use client";

import { useState } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { SectionReveal } from "@/components/SectionReveal";
import { FAQS } from "@/lib/business";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionReveal mt={16}>
      <Heading size="3xl" mb={6}>
        Frequently Asked Questions
      </Heading>
      <VStack gap={3} align="stretch">
        {FAQS.map((faq, index) => (
          <Box
            key={index}
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="xl"
            bg="whiteAlpha.100"
            overflow="hidden"
          >
            <Box
              as="button"
              w="100%"
              p={4}
              textAlign="left"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              cursor="pointer"
              _hover={{ bg: "whiteAlpha.200" }}
              transition="background 0.2s"
            >
              <Text fontWeight="600" color="white" pr={4}>
                {faq.q}
              </Text>
              <Text
                color="brand.400"
                fontSize="xl"
                fontWeight="bold"
                transform={openIndex === index ? "rotate(45deg)" : "rotate(0)"}
                transition="transform 0.2s"
              >
                +
              </Text>
            </Box>
            <Box
              maxH={openIndex === index ? "200px" : "0"}
              overflow="hidden"
              transition="max-height 0.3s ease"
            >
              <Text color="whiteAlpha.800" px={4} pb={4}>
                {faq.a}
              </Text>
            </Box>
          </Box>
        ))}
      </VStack>
    </SectionReveal>
  );
}
