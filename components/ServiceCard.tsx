import Link from "next/link";
import { Box, Button, Card, HStack, Text } from "@chakra-ui/react";
import { FaChild, FaCut, FaRegSmileBeam } from "react-icons/fa";
import { GiRazor } from "react-icons/gi";
import type { Service } from "@/lib/business";

const iconMap = {
  scissors: FaCut,
  child: FaChild,
  razor: GiRazor,
  hair: FaCut,
  beard: FaRegSmileBeam,
};

export function ServiceCard({ service, showBookingButton = false }: { service: Service; showBookingButton?: boolean }) {
  const Icon = iconMap[service.icon];

  return (
    <Card.Root bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.300" borderRadius="xl" overflow="hidden">
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
  );
}
