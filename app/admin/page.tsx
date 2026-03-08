import type { Metadata } from "next";
import Link from "next/link";
import { addDays, format, startOfDay } from "date-fns";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { AdminTable } from "@/components/AdminTable";
import { getBookingsAndBlocks, generateSlots, getServiceDuration } from "@/lib/availability";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Admin Dashboard | Jano Barbershop",
  alternates: { canonical: "/admin" },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const bookings = await prisma.booking.findMany({
    where: {
      date: {
        gte: startOfDay(new Date()),
      },
    },
    orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
    select: {
      id: true,
      date: true,
      timeSlot: true,
      service: true,
      customerName: true,
      phone: true,
      paid: true,
    },
  });

  const weekStart = startOfDay(new Date());

  const week = await Promise.all(
    Array.from({ length: 7 }).map(async (_, index) => {
      const date = addDays(weekStart, index);
      const dateString = format(date, "yyyy-MM-dd");
      const { bookings: dayBookings, blockedSlots } = await getBookingsAndBlocks(dateString);
      const daySlots = generateSlots(dateString, "Hair Cut");

      const slots = daySlots.map((slot) => {
        const slotStart = new Date(`${dateString}T${slot}:00`);
        const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000);

        const blocked = blockedSlots.some((blockedSlot) => {
          if (blockedSlot.timeSlot === "all") return true;
          return blockedSlot.timeSlot === slot;
        });

        const booked = dayBookings.some((booking) => {
          const bookingStart = new Date(`${dateString}T${booking.timeSlot}:00`);
          const bookingDuration = getServiceDuration(booking.service);
          const bookingEnd = new Date(bookingStart.getTime() + bookingDuration * 60 * 1000);
          return slotStart < bookingEnd && bookingStart < slotEnd;
        });

        if (blocked) return { time: slot, status: "blocked" as const };
        if (booked) return { time: slot, status: "booked" as const };
        return { time: slot, status: "open" as const };
      });

      return {
        dateLabel: format(date, "EEE dd MMM"),
        slots,
      };
    }),
  );

  return (
    <Box as="main" py={10}>
      <Container maxW="7xl" px={{ base: 4, md: 6 }}>
        <Heading size="4xl" mb={8}>
          Admin Dashboard
        </Heading>

        <HStack justify="flex-end" mb={6}>
          <Button asChild variant="outline" borderColor="whiteAlpha.500">
            <Link href="/api/admin/logout">Logout</Link>
          </Button>
        </HStack>

        <Grid templateColumns={{ base: "1fr", xl: "2fr 1fr" }} gap={8}>
          <Stack gap={8}>
            <Box>
              <HStack justify="space-between" mb={4}>
                <Text fontWeight="700">Upcoming Bookings</Text>
                <Button asChild bg="brand.400" color="black" _hover={{ bg: "brand.300" }}>
                  <Link href="/api/bookings?format=csv">Export CSV</Link>
                </Button>
              </HStack>
              <AdminTable
                bookings={bookings.map((booking) => ({
                  id: booking.id,
                  date: format(booking.date, "yyyy-MM-dd"),
                  timeSlot: booking.timeSlot,
                  service: booking.service,
                  customerName: booking.customerName,
                  phone: booking.phone,
                  paid: booking.paid,
                }))}
              />
            </Box>

            <Box>
              <Text fontWeight="700" mb={4}>
                Weekly Availability
              </Text>
              <AvailabilityCalendar week={week} />
            </Box>
          </Stack>

          <Box border="1px solid" borderColor="whiteAlpha.300" borderRadius="xl" p={5} h="fit-content">
            <Text fontWeight="700" mb={3}>
              Block Slot / Day
            </Text>
            <form action="/api/admin/blocked-slots" method="post">
              <Stack gap={3}>
                <Input type="date" name="date" required min={format(new Date(), "yyyy-MM-dd")} />
                <Input name="timeSlot" placeholder="HH:mm or all" required />
                <Textarea name="reason" placeholder="Reason (optional)" minH="100px" />
                <Button type="submit" bg="brand.400" color="black" _hover={{ bg: "brand.300" }}>
                  Save Block
                </Button>
              </Stack>
            </form>

            <Text fontSize="sm" color="whiteAlpha.700" mt={4}>
              Use <strong>all</strong> to block the full day.
            </Text>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
