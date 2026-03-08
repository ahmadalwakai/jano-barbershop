"use client";

import { LocalBusinessJsonLd } from "next-seo";

export function SeoDefaults() {
  return (
    <LocalBusinessJsonLd
      scriptId="jano-seo-defaults"
      type="HairSalon"
      name="Jan Istanbul – Jano Barbershop"
      url={process.env.NEXT_PUBLIC_SITE_URL ?? "https://janistanbul.co.uk"}
      telephone="+441417375705"
      address={{
        streetAddress: "178 Cumbernauld Road",
        addressLocality: "Glasgow",
        postalCode: "G69 9NB",
        addressCountry: "GB",
      }}
      geo={{ latitude: 55.884, longitude: -4.087 }}
    />
  );
}
