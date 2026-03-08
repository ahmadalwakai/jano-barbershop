import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { sendConfirmationSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parseResult = sendConfirmationSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid confirmation payload." }, { status: 400 });
  }

  const { to, customerName, service, date, timeSlot } = parseResult.data;

  await sendEmail({
    to,
    subject: "Your Jano Booking Confirmation",
    html: `<p>Hello ${customerName},</p><p>Your booking for <strong>${service}</strong> on <strong>${date}</strong> at <strong>${timeSlot}</strong> is confirmed.</p>`,
  });

  return NextResponse.json({ message: "Confirmation email sent." });
}
