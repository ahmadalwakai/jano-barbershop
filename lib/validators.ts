import { z } from "zod";
import { SERVICES } from "@/lib/business";

const serviceNames = SERVICES.map((service) => service.name) as [string, ...string[]];

export const bookingRequestSchema = z.object({
  service: z.enum(serviceNames),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().regex(/^\d{2}:\d{2}$/),
  customerName: z.string().min(2).max(80),
  phone: z.string().min(6).max(30),
  email: z.string().email(),
});

export const checkoutRequestSchema = bookingRequestSchema.extend({
  requireDeposit: z.boolean().optional(),
});

export const availabilityQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  service: z.enum(serviceNames),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});

export const blockSlotSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().regex(/^(all|\d{2}:\d{2})$/),
  reason: z.string().max(200).optional(),
});

export const sendConfirmationSchema = z.object({
  to: z.string().email(),
  customerName: z.string().min(2),
  service: z.string().min(2),
  date: z.string(),
  timeSlot: z.string(),
});
