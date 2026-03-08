import { format, startOfDay } from "date-fns";
import { NextResponse } from "next/server";
import { isSlotAvailable } from "@/lib/availability";
import { prisma } from "@/lib/prisma";
import { bookingRequestSchema } from "@/lib/validators";

function isAuthorized(request: Request): boolean {
  const auth = request.headers.get("authorization");

  if (!auth?.startsWith("Basic ")) {
    return false;
  }

  const decoded = Buffer.from(auth.replace("Basic ", ""), "base64").toString();
  const [, password] = decoded.split(":");

  return password === process.env.ADMIN_PASSWORD;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const formatType = url.searchParams.get("format");

  const bookings = await prisma.booking.findMany({
    where: {
      date: {
        gte: startOfDay(new Date()),
      },
    },
    orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
  });

  if (formatType === "csv") {
    const headers = [
      "id",
      "date",
      "timeSlot",
      "service",
      "customerName",
      "phone",
      "email",
      "paid",
      "stripeId",
      "createdAt",
    ];

    const rows = bookings.map((booking) => [
      booking.id,
      format(booking.date, "yyyy-MM-dd"),
      booking.timeSlot,
      booking.service,
      booking.customerName,
      booking.phone,
      booking.email,
      String(booking.paid),
      booking.stripeId ?? "",
      booking.createdAt.toISOString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=bookings.csv",
      },
    });
  }

  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parseResult = bookingRequestSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid booking payload." }, { status: 400 });
  }

  const { service, date, timeSlot, customerName, phone, email } = parseResult.data;
  const available = await isSlotAvailable(date, timeSlot, service);

  if (!available) {
    return NextResponse.json({ error: "Selected slot is not available." }, { status: 409 });
  }

  const booking = await prisma.booking.create({
    data: {
      service,
      date: new Date(`${date}T00:00:00.000Z`),
      timeSlot,
      customerName,
      phone,
      email,
      paid: false,
    },
  });

  return NextResponse.json({ booking }, { status: 201 });
}
