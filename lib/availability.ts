import {
  addMinutes,
  endOfDay,
  format,
  isBefore,
  parse,
  startOfDay,
  startOfToday,
} from "date-fns";
import { SERVICES } from "@/lib/business";
import { prisma } from "@/lib/prisma";

type TimeInterval = { start: Date; end: Date };

type ExistingBooking = {
  service: string;
  timeSlot: string;
};

type ExistingBlockedSlot = {
  timeSlot: string;
};

export function getServiceByName(serviceName: string) {
  return SERVICES.find((service) => service.name === serviceName);
}

export function getServiceDuration(serviceName: string): number {
  const service = getServiceByName(serviceName);
  return service?.durationMinutes ?? 30;
}

export function parseDateAtTime(dateString: string, timeSlot: string): Date {
  return parse(`${dateString} ${timeSlot}`, "yyyy-MM-dd HH:mm", new Date());
}

function getOperatingTimes(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`);
  const day = date.getDay();

  if (day === 0) {
    return { open: "09:00", close: "17:00" };
  }

  return { open: "09:00", close: "18:00" };
}

function toInterval(dateString: string, timeSlot: string, durationMinutes: number): TimeInterval {
  const start = parseDateAtTime(dateString, timeSlot);
  return {
    start,
    end: addMinutes(start, durationMinutes),
  };
}

function intervalsOverlap(a: TimeInterval, b: TimeInterval): boolean {
  return a.start < b.end && b.start < a.end;
}

export function isWithinOpeningHours(
  dateString: string,
  timeSlot: string,
  durationMinutes: number,
): boolean {
  const { open, close } = getOperatingTimes(dateString);
  const openTime = parseDateAtTime(dateString, open);
  const closeTime = parseDateAtTime(dateString, close);
  const requested = toInterval(dateString, timeSlot, durationMinutes);

  return requested.start >= openTime && requested.end <= closeTime;
}

export function generateSlots(dateString: string, serviceName: string): string[] {
  const durationMinutes = getServiceDuration(serviceName);
  const { open, close } = getOperatingTimes(dateString);

  const slots: string[] = [];
  let cursor = parseDateAtTime(dateString, open);
  const closeTime = parseDateAtTime(dateString, close);

  while (!isBefore(closeTime, addMinutes(cursor, durationMinutes))) {
    slots.push(format(cursor, "HH:mm"));
    cursor = addMinutes(cursor, durationMinutes);
  }

  return slots;
}

export function hasBookingConflict(
  dateString: string,
  timeSlot: string,
  durationMinutes: number,
  existingBookings: ExistingBooking[],
): boolean {
  const requested = toInterval(dateString, timeSlot, durationMinutes);

  return existingBookings.some((booking) => {
    const bookedDuration = getServiceDuration(booking.service);
    const booked = toInterval(dateString, booking.timeSlot, bookedDuration);
    return intervalsOverlap(requested, booked);
  });
}

export function hasBlockedConflict(
  dateString: string,
  timeSlot: string,
  durationMinutes: number,
  blockedSlots: ExistingBlockedSlot[],
): boolean {
  const hasFullDayBlock = blockedSlots.some((slot) => slot.timeSlot === "all");

  if (hasFullDayBlock) {
    return true;
  }

  const requested = toInterval(dateString, timeSlot, durationMinutes);

  return blockedSlots.some((blockedSlot) => {
    if (blockedSlot.timeSlot === "all") {
      return true;
    }

    const blocked = toInterval(dateString, blockedSlot.timeSlot, 30);
    return intervalsOverlap(requested, blocked);
  });
}

export async function getBookingsAndBlocks(dateString: string) {
  const dayStart = startOfDay(new Date(`${dateString}T00:00:00`));
  const dayEnd = endOfDay(new Date(`${dateString}T00:00:00`));

  const [bookings, blockedSlots] = await Promise.all([
    prisma.booking.findMany({
      where: {
        date: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      select: {
        service: true,
        timeSlot: true,
      },
      orderBy: {
        timeSlot: "asc",
      },
    }),
    prisma.blockedSlot.findMany({
      where: {
        date: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      select: {
        timeSlot: true,
      },
      orderBy: {
        timeSlot: "asc",
      },
    }),
  ]);

  return { bookings, blockedSlots };
}

export async function isSlotAvailable(
  dateString: string,
  timeSlot: string,
  service: string,
): Promise<boolean> {
  if (isBefore(new Date(`${dateString}T00:00:00`), startOfToday())) {
    return false;
  }

  const durationMinutes = getServiceDuration(service);

  if (!isWithinOpeningHours(dateString, timeSlot, durationMinutes)) {
    return false;
  }

  const { bookings, blockedSlots } = await getBookingsAndBlocks(dateString);

  return !(
    hasBookingConflict(dateString, timeSlot, durationMinutes, bookings) ||
    hasBlockedConflict(dateString, timeSlot, durationMinutes, blockedSlots)
  );
}
