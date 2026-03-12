import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { SectionReveal } from "@/components/SectionReveal";
import { TESTIMONIALS } from "@/lib/business";

export function TestimonialsCarousel() {
  return (
    <SectionReveal mt={16}>
      <Heading size="3xl" mb={6}>
        Testimonials
      </Heading>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={6}
      >
        {TESTIMONIALS.map((review, index) => (
          <Box
            key={index}
            p={6}
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="xl"
            bg="whiteAlpha.100"
          >
            <Text
              as="span"
              fontSize="5xl"
              lineHeight={1}
              color="brand.400"
              fontFamily="serif"
              display="block"
              mb={-2}
            >
              &ldquo;
            </Text>
            <Text color="whiteAlpha.800" fontSize="lg" mb={3}>
              {review.quote}
            </Text>
            <Text color="brand.300" fontWeight="700">
              {review.name}
            </Text>
          </Box>
        ))}
      </Grid>
    </SectionReveal>
  );
}
