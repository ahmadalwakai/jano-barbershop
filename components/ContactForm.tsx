"use client";

import { useState } from "react";
import { Alert, Button, Input, Stack, Textarea } from "@chakra-ui/react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function submitForm(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Could not send message.");
      }

      setResponseMessage(data.message ?? "Message sent successfully.");
      setIsError(false);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setIsError(true);
      setResponseMessage(error instanceof Error ? error.message : "Could not send message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submitForm}>
      <Stack gap={3}>
        <Input placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} required />
        <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <Textarea placeholder="Message" value={message} onChange={(event) => setMessage(event.target.value)} minH="140px" required />
        <Button type="submit" bg="brand.400" color="black" _hover={{ bg: "brand.300" }} loading={loading}>
          Send Message
        </Button>

        {responseMessage ? (
          <Alert.Root status={isError ? "error" : "success"}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{responseMessage}</Alert.Title>
            </Alert.Content>
          </Alert.Root>
        ) : null}
      </Stack>
    </form>
  );
}
