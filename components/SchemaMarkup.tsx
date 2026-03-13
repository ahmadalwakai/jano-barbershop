export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: "Jan Istanbul – Jano Barbershop",
    url: "https://www.jan-o.com",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80",
    telephone: "+441417375705",
    email: "joansaleh82@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "178 Cumbernauld Road",
      addressLocality: "Glasgow",
      addressRegion: "Scotland",
      postalCode: "G69 9NB",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 55.884,
      longitude: -4.087,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
    priceRange: "££",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "85",
    },
    sameAs: [
      "https://www.instagram.com/janistanbul_barber",
      "https://www.facebook.com/janistanbulbarber",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Barbering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Skin Fade",
            description: "Precision fade with clean finishing for a sharp modern look",
          },
          priceCurrency: "GBP",
          price: "15",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Beard Trim",
            description: "Professional beard shaping and trimming",
          },
          priceCurrency: "GBP",
          price: "10",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hot Towel Shave",
            description: "Classic hot towel treatment with traditional shave",
          },
          priceCurrency: "GBP",
          price: "28",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a skin fade cost in Glasgow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A skin fade at Jano Barbershop starts from £15 for walk-ins and £20 for appointments. We offer the best value skin fades in Glasgow G69.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to book an appointment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We recommend booking online at jan-o.com/book to guarantee your slot, but walk-ins are welcome 7 days a week when available.",
        },
      },
      {
        "@type": "Question",
        name: "What services does Jano Barbershop offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer skin fades, beard trims, hot towel shaves, kids cuts, and hair designs in Glasgow. All services performed by expert barbers.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Jano Barbershop located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are located at 178 Cumbernauld Road, Glasgow G69 9NB, near Chryston and Stepps. Easy parking available.",
        },
      },
      {
        "@type": "Question",
        name: "What are your opening hours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We're open Monday to Saturday 9AM–6PM and Sunday 9AM–5PM. Walk-ins welcome all week.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
