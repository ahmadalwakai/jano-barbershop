"use client";

import Link from "next/link";
import { Box, Button, Card, HStack, Text } from "@chakra-ui/react";
import { FaChild, FaCut, FaRegSmileBeam } from "react-icons/fa";
import { GiRazor } from "react-icons/gi";
import { motion, useReducedMotion } from "framer-motion";
import type { Service } from "@/lib/business";

const iconMap = {
  scissors: FaCut,
  child: FaChild,
  razor: GiRazor,
  hair: FaCut,
  beard: FaRegSmileBeam,
};

export function ServiceCard({
  service,
  showBookingButton = false,
  index = 0,
}: {
  service: Service;
  showBookingButton?: boolean;
  index?: number;
}) {
  const Icon = iconMap[service.icon];
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -6, boxShadow: "0 12px 40px rgba(201,168,76,0.25)" }
      }
      style={{ borderRadius: 12 }}
    >
      <Card.Root
        bg="whiteAlpha.100"
        border="1px solid"
        borderColor="whiteAlpha.300"
        borderRadius="xl"
        overflow="hidden"
        position="relative"
        height="100%"
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 3,
            background: "#C9A84C",
            height: "0%",
          }}
          whileHover={prefersReducedMotion ? undefined : { height: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <Card.Body gap={3}>
          <HStack>
            <Box color="brand.400" fontSize="lg">
              <Icon />
            </Box>
            <Text fontWeight="700">{service.name}</Text>
          </HStack>

          <Text color="whiteAlpha.800" fontSize="sm">
            {service.description}
          </Text>

          <HStack justify="space-between" mt={2}>
            <Text fontSize="sm">Walk-in: £{service.walkInPrice}</Text>
            <Text fontSize="sm" color="brand.300">
              Appointment: £{service.appointmentPrice}
            </Text>
          </HStack>

          {showBookingButton ? (
            <Button asChild mt={3} bg="brand.400" color="black" _hover={{ bg: "brand.300" }}>
              <Link href={`/book?service=${encodeURIComponent(service.name)}`}>Book This Service</Link>
            </Button>
          ) : null}
        </Card.Body>
      </Card.Root>
    </motion.div>
  );
}
