import { NextResponse } from "next/server";
import { format } from "date-fns";
import Stripe from "stripe";
import { sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const stripe = getStripe();

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing webhook configuration." }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error("Invalid Stripe webhook signature", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: { paid: true, stripeId: session.id },
      });

      await sendEmail({
        to: booking.email,
        subject: "Your Jano Booking Confirmation",
        html: `<p>Hello ${booking.customerName},</p><p>Your booking for <strong>${booking.service}</strong> on <strong>${format(booking.date, "yyyy-MM-dd")}</strong> at <strong>${booking.timeSlot}</strong> is confirmed.</p><p>Thank you for choosing Jano.</p>`,
      });
    }
  }

  return NextResponse.json({ received: true });
}
