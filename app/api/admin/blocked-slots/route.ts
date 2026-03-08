import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { blockSlotSchema } from "@/lib/validators";

export async function GET() {
  const slots = await prisma.blockedSlot.findMany({
    orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
  });

  return NextResponse.json({ slots });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  let payload: { date?: string; timeSlot?: string; reason?: string };

  if (contentType.includes("application/json")) {
    payload = await request.json();
  } else {
    const formData = await request.formData();
    payload = {
      date: String(formData.get("date") ?? ""),
      timeSlot: String(formData.get("timeSlot") ?? ""),
      reason: String(formData.get("reason") ?? ""),
    };
  }

  const parseResult = blockSlotSchema.safeParse(payload);

  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid blocked-slot payload." }, { status: 400 });
  }

  const { date, timeSlot, reason } = parseResult.data;

  await prisma.blockedSlot.create({
    data: {
      date: new Date(`${date}T00:00:00.000Z`),
      timeSlot,
      reason: reason || null,
    },
  });

  if (contentType.includes("application/json")) {
    return NextResponse.json({ message: "Blocked slot saved." }, { status: 201 });
  }

  return NextResponse.redirect(new URL("/admin", request.url), 303);
}
