"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, Button, Container, Heading, Input, Stack, Text } from "@chakra-ui/react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Invalid credentials");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box as="main" py={20} minH="100vh" bg="charcoal.500" color="white">
      <Container maxW="md">
        <Box border="1px solid" borderColor="whiteAlpha.300" borderRadius="xl" bg="whiteAlpha.100" p={8}>
          <Stack gap={5}>
            <Heading size="3xl">Admin Login</Heading>
            <Text color="whiteAlpha.800">Sign in to access the Jano admin dashboard.</Text>

            {errorMessage ? (
              <Alert.Root status="error" borderRadius="md">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>{errorMessage}</Alert.Title>
                </Alert.Content>
              </Alert.Root>
            ) : null}

            <form onSubmit={handleSubmit}>
              <Stack gap={3}>
                <Input
                  type="email"
                  placeholder="Admin email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <Button
                  type="submit"
                  bg="brand.400"
                  color="black"
                  _hover={{ bg: "brand.300" }}
                  loading={loading}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
