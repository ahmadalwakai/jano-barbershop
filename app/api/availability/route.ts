import { NextResponse } from "next/server";
import {
  generateSlots,
  getBookingsAndBlocks,
  getServiceDuration,
  hasBlockedConflict,
  hasBookingConflict,
} from "@/lib/availability";
import { availabilityQuerySchema } from "@/lib/validators";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parseResult = availabilityQuerySchema.safeParse({
    date: url.searchParams.get("date"),
    service: url.searchParams.get("service"),
  });

  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid query parameters." }, { status: 400 });
  }

  const { date, service } = parseResult.data;
  const duration = getServiceDuration(service);
  const allSlots = generateSlots(date, service);
  const { bookings, blockedSlots } = await getBookingsAndBlocks(date);

  console.log("Availability request:", { date, service, duration, totalSlots: allSlots.length, bookings: bookings.length, blockedSlots: blockedSlots.length });

  const slots = allSlots.map((slot) => {
    if (hasBlockedConflict(date, slot, duration, blockedSlots)) {
      return { time: slot, status: "blocked" as const };
    }

    if (hasBookingConflict(date, slot, duration, bookings)) {
      return { time: slot, status: "booked" as const };
    }

    return { time: slot, status: "open" as const };
  });

  return NextResponse.json({ slots });
}
