import { NextResponse } from "next/server";
import { SERVICES } from "@/lib/business";
import { isSlotAvailable } from "@/lib/availability";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { checkoutRequestSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseResult = checkoutRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid checkout payload." }, { status: 400 });
    }

    const { service, date, timeSlot, customerName, phone, email } = parseResult.data;

    const serviceData = SERVICES.find((item) => item.name === service);
    if (!serviceData) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 });
    }

    const available = await isSlotAvailable(date, timeSlot, service);
    if (!available) {
      return NextResponse.json({ error: "Selected slot is no longer available." }, { status: 409 });
    }

    const requireFullPayment = (process.env.REQUIRE_DEPOSIT ?? "true") === "true";
    const amountInPence = (requireFullPayment ? serviceData.appointmentPrice : 5) * 100;
    const stripe = getStripe();

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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      success_url: `${siteUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/book`,
      metadata: {
        bookingId: booking.id,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Jano Appointment - ${service}`,
              description: `${date} at ${timeSlot}`,
            },
            unit_amount: amountInPence,
          },
        },
      ],
    });

    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        stripeId: session.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout creation failed", error);
    return NextResponse.json({ error: "Unable to create checkout session." }, { status: 500 });
  }
}
