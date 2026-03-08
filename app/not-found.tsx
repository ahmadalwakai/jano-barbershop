import Link from "next/link";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";

export default function NotFoundPage() {
  return (
    <Box as="main" py={20}>
      <Container maxW="2xl" textAlign="center">
        <Stack gap={4}>
          <Heading size="5xl">404</Heading>
          <Text color="whiteAlpha.800">The page you’re looking for doesn’t exist.</Text>
          <Button asChild bg="brand.400" color="black" _hover={{ bg: "brand.300" }} alignSelf="center">
            <Link href="/">Back to Home</Link>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
