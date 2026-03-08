import { Badge, Box, Grid, HStack, Text } from "@chakra-ui/react";

type WeeklyDay = {
  dateLabel: string;
  slots: Array<{ time: string; status: "open" | "booked" | "blocked" }>;
};

export function AvailabilityCalendar({ week }: { week: WeeklyDay[] }) {
  return (
    <Box border="1px solid" borderColor="whiteAlpha.300" borderRadius="xl" p={4}>
      <HStack gap={4} mb={4}>
        <Badge colorPalette="green">Open</Badge>
        <Badge colorPalette="red">Booked</Badge>
        <Badge colorPalette="orange">Blocked</Badge>
      </HStack>

      <Grid templateColumns={{ base: "1fr", lg: "repeat(7, 1fr)" }} gap={3}>
        {week.map((day) => (
          <Box key={day.dateLabel} border="1px solid" borderColor="whiteAlpha.300" borderRadius="md" p={3}>
            <Text fontWeight="700" mb={2} fontSize="sm">
              {day.dateLabel}
            </Text>
            {day.slots.slice(0, 8).map((slot) => (
              <HStack key={`${day.dateLabel}-${slot.time}`} justify="space-between" fontSize="xs" mb={1}>
                <Text>{slot.time}</Text>
                <Badge
                  colorPalette={
                    slot.status === "open"
                      ? "green"
                      : slot.status === "booked"
                        ? "red"
                        : "orange"
                  }
                >
                  {slot.status}
                </Badge>
              </HStack>
            ))}
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
