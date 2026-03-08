"use client";

import Link from "next/link";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Box as="main" py={20}>
      <Container maxW="2xl" textAlign="center">
        <Stack gap={4}>
          <Heading size="4xl">Something went wrong</Heading>
          <Text color="whiteAlpha.800">{error.message}</Text>
          <Button onClick={reset} bg="brand.400" color="black" _hover={{ bg: "brand.300" }}>
            Try Again
          </Button>
          <Button asChild variant="outline" borderColor="whiteAlpha.400">
            <Link href="/">Back to Home</Link>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
