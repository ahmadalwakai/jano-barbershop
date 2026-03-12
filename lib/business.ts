export const BUSINESS_INFO = {
  companyName: "Jan Istanbul",
  shopName: "Jano",
  address: "178 Cumbernauld Road, G69 9NB, Glasgow, Scotland",
  shortAddress: "178 Cumbernauld Road, G69 9NB",
  phoneDisplay: "+44 141 737 5705",
  phoneRaw: "+441417375705",
  email: "joansaleh82@gmail.com",
  currency: "GBP",
  currencySymbol: "£",
  tagline: "Premium Cuts. Classic Style. Glasgow's Finest.",
};

export type ServiceKey =
  | "Gents Skin Fade"
  | "Kids Skin Fade"
  | "Hot Towel Shave + Hard Shave"
  | "Hair Cut"
  | "Beard Trim";

export type Service = {
  name: ServiceKey;
  description: string;
  walkInPrice: number;
  appointmentPrice: number;
  durationMinutes: 30 | 45;
  icon: "scissors" | "child" | "razor" | "hair" | "beard";
};

export const SERVICES: Service[] = [
  {
    name: "Gents Skin Fade",
    description: "Precision fade with clean finishing for a sharp modern look.",
    walkInPrice: 15,
    appointmentPrice: 20,
    durationMinutes: 45,
    icon: "scissors",
  },
  {
    name: "Kids Skin Fade",
    description: "Comfortable, stylish skin fade tailored for younger clients.",
    walkInPrice: 12,
    appointmentPrice: 16,
    durationMinutes: 30,
    icon: "child",
  },
  {
    name: "Hot Towel Shave + Hard Shave",
    description: "Classic hot towel treatment with a smooth traditional shave.",
    walkInPrice: 28,
    appointmentPrice: 35,
    durationMinutes: 45,
    icon: "razor",
  },
  {
    name: "Hair Cut",
    description: "Tailored haircut with professional styling and detailing.",
    walkInPrice: 12,
    appointmentPrice: 18,
    durationMinutes: 30,
    icon: "hair",
  },
  {
    name: "Beard Trim",
    description: "Defined beard shaping and trim for a clean, polished finish.",
    walkInPrice: 10,
    appointmentPrice: 15,
    durationMinutes: 30,
    icon: "beard",
  },
];

export const OPENING_HOURS = {
  mondayToSaturday: { open: "09:00", close: "18:00" },
  sunday: { open: "09:00", close: "17:00" },
};

export const TESTIMONIALS = [
  {
    name: "Adam M.",
    quote:
      "Best skin fade in the area. Clean shop, great atmosphere, and always consistent.",
  },
  {
    name: "Yusuf K.",
    quote:
      "Booked online and everything was smooth. Friendly team and top-class beard trim.",
  },
  {
    name: "Liam R.",
    quote:
      "Took my son for a kids fade and he loved it. Professional and welcoming every time.",
  },
];

export const FAQS = [
  {
    q: "How much is a skin fade in Glasgow?",
    a: "A skin fade at Jano Barbershop starts from £15 for walk-ins and £20 for appointments.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "Yes, we welcome walk-ins 7 days a week. Mon–Sat 9AM–6PM, Sunday 9AM–5PM.",
  },
  {
    q: "Where is Jano Barbershop located?",
    a: "We're at 178 Cumbernauld Road, Muirhead, Glasgow G69 9NB, near Chryston and Stepps.",
  },
  {
    q: "Can I book a kids haircut online?",
    a: "Yes, kids skin fades are available from £12 walk-in or £16 by appointment.",
  },
  {
    q: "Do you offer beard trims?",
    a: "Yes, beard trims start from £10 walk-in. Hot towel shave packages also available from £28.",
  },
];
