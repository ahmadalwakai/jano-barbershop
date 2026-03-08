"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  HStack,
  Input,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { format } from "date-fns";
import { SERVICES, type ServiceKey } from "@/lib/business";

type SlotStatus = "open" | "booked" | "blocked";

type SlotItem = {
  time: string;
  status: SlotStatus;
};

type BookingFormProps = {
  initialService?: string;
};

const TOTAL_STEPS = 5;

const stepVariants = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
};

function StepDots({ current, total }: { current: number; total: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <HStack justify="center" gap={2} mb={4}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: i + 1 === current ? "#C9A84C" : "rgba(255,255,255,0.3)",
          }}
          animate={
            i + 1 === current && !prefersReducedMotion
              ? { scale: [1, 1.3, 1], background: ["#C9A84C", "#d7b560", "#C9A84C"] }
              : undefined
          }
          transition={
            i + 1 === current && !prefersReducedMotion
              ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />
      ))}
    </HStack>
  );
}

export function BookingForm({ initialService }: BookingFormProps) {
  const serviceNames = SERVICES.map((service) => service.name);
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceKey>(
    (serviceNames.includes(initialService as ServiceKey)
      ? initialService
      : SERVICES[0].name) as ServiceKey,
  );
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [timeSlot, setTimeSlot] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedService = useMemo(
    () => SERVICES.find((item) => item.name === service) ?? SERVICES[0],
    [service],
  );

  useEffect(() => {
    if (step !== 3) return;

    let active = true;
    setLoadingSlots(true);
    setTimeSlot("");
    setErrorMessage("");

    fetch(`/api/availability?date=${date}&service=${encodeURIComponent(service)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error ?? "Failed to load availability.");
        }
        return data;
      })
      .then((data: { slots: SlotItem[] }) => {
        if (active) {
          setSlots(data.slots);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          const message = error instanceof Error ? error.message : "Failed to load availability.";
          setErrorMessage(message);
          setSlots([]);
        }
      })
      .finally(() => {
        if (active) {
          setLoadingSlots(false);
        }
      });

    return () => {
      active = false;
    };
  }, [date, service, step]);

  const canGoNextFromStep4 = customerName.length > 1 && phone.length > 5 && email.includes("@");

  async function handlePayment() {
    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service,
          date,
          timeSlot,
          customerName,
          phone,
          email,
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Could not create checkout session.");
      }

      window.location.href = data.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected payment error.";
      setErrorMessage(message);
      setSubmitting(false);
    }
  }

  const dateMax = format(new Date(Date.now() + 1000 * 60 * 60 * 24 * 90), "yyyy-MM-dd");

  return (
    <Stack gap={6}>
      <Text color="brand.300" fontWeight="600">
        Appointment bookings include a £5–£7 convenience fee.
      </Text>

      <StepDots current={step} total={TOTAL_STEPS} />

      {errorMessage ? (
        <Alert.Root status="error" borderRadius="md">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{errorMessage}</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      ) : null}

      <Box position="relative" minH="160px" overflow="hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={prefersReducedMotion ? undefined : stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Text mb={2} fontWeight="700">
                Step 1: Select service
              </Text>
              <select
                value={service}
                onChange={(event) => setService(event.target.value as ServiceKey)}
                style={{
                  width: "100%",
                  background: "#1A1A1A",
                  color: "white",
                  border: "1px solid #C9A84C",
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                {SERVICES.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name} — Walk-in £{item.walkInPrice} / Appointment £{item.appointmentPrice}
                  </option>
                ))}
              </select>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={prefersReducedMotion ? undefined : stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Text mb={2} fontWeight="700">
                Step 2: Select date
              </Text>
              <Input
                type="date"
                value={date}
                min={format(new Date(), "yyyy-MM-dd")}
                max={dateMax}
                onChange={(event) => setDate(event.target.value)}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={prefersReducedMotion ? undefined : stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Text mb={2} fontWeight="700">
                Step 3: Select time slot
              </Text>
              {loadingSlots ? (
                <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={3}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} h="42px" borderRadius="md" />
                  ))}
                </Grid>
              ) : slots.length === 0 ? (
                <Text color="yellow.300">No available slots for this date. Please choose another day.</Text>
              ) : (
                <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={3}>
                  {slots.map((slot, index) => (
                    <motion.div
                      key={slot.time}
                      initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <Button
                        w="100%"
                        variant={slot.status === "open" ? "solid" : "outline"}
                        bg={slot.time === timeSlot ? "brand.400" : slot.status === "open" ? "whiteAlpha.200" : "transparent"}
                        color={slot.time === timeSlot ? "black" : "white"}
                        borderColor="whiteAlpha.400"
                        disabled={slot.status !== "open"}
                        onClick={() => setTimeSlot(slot.time)}
                      >
                        {slot.time} {slot.status !== "open" ? `(${slot.status})` : ""}
                      </Button>
                    </motion.div>
                  ))}
                </Grid>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              variants={prefersReducedMotion ? undefined : stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Text mb={2} fontWeight="700">
                Step 4: Your details
              </Text>
              <Stack gap={3}>
                <Input placeholder="Full name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} />
                <Input placeholder="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
                <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </Stack>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              variants={prefersReducedMotion ? undefined : stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Text mb={2} fontWeight="700">
                Step 5: Checkout
              </Text>
              <Stack gap={2} mb={4}>
                <Text>Service: {selectedService.name}</Text>
                <Text>Date: {date}</Text>
                <Text>Time: {timeSlot}</Text>
                <Text>Price: £{selectedService.appointmentPrice}</Text>
              </Stack>
              <Button
                bg="brand.400"
                color="black"
                _hover={{ bg: "brand.300" }}
                onClick={handlePayment}
                loading={submitting}
              >
                Proceed to Stripe Payment
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      <HStack justify="space-between">
        <Button variant="outline" borderColor="whiteAlpha.400" disabled={step === 1} onClick={() => setStep((prev) => prev - 1)}>
          Back
        </Button>

        {step < 5 ? (
          <Button
            bg="brand.400"
            color="black"
            _hover={{ bg: "brand.300" }}
            disabled={
              (step === 3 && !timeSlot) ||
              (step === 4 && !canGoNextFromStep4)
            }
            onClick={() => setStep((prev) => prev + 1)}
          >
            Next
          </Button>
        ) : null}
      </HStack>
    </Stack>
  );
}
