import { NextResponse } from "next/server";
import { BUSINESS_INFO } from "@/lib/business";
import { sendEmail } from "@/lib/email";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parseResult = contactSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid contact payload." }, { status: 400 });
  }

  const { name, email, message } = parseResult.data;

  await sendEmail({
    to: BUSINESS_INFO.email,
    subject: `New contact form message from ${name}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
  });

  return NextResponse.json({ message: "Your message has been sent." });
}
