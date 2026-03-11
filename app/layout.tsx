import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { LocalBusinessJsonLd } from "next-seo";
import { Box } from "@chakra-ui/react";
import { Providers } from "@/components/Providers";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BUSINESS_INFO } from "@/lib/business";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://janistanbul.co.uk";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Jan Istanbul – Jano Barbershop",
  address: "178 Cumbernauld Road, G69 9NB",
  telephone: "+441417375705",
  email: "joansaleh82@gmail.com",
  openingHours: ["Mo-Sa 09:00-18:00", "Su 09:00-17:00"],
  currenciesAccepted: "GBP",
  priceRange: "££",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jano Barbershop Glasgow | Jan Istanbul – Book a Haircut in G69",
  description:
    "Expert skin fades, beard trims & kids cuts in Glasgow. Open 7 days. Walk-ins welcome. Book online at Jan Istanbul Barbershop.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Jano Barbershop Glasgow | Jan Istanbul – Book a Haircut in G69",
    description:
      "Expert skin fades, beard trims & kids cuts in Glasgow. Open 7 days. Walk-ins welcome. Book online at Jan Istanbul Barbershop.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Premium barbershop styling station and mirrors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jano Barbershop Glasgow | Jan Istanbul – Book a Haircut in G69",
    description:
      "Expert skin fades, beard trims & kids cuts in Glasgow. Open 7 days. Walk-ins welcome. Book online at Jan Istanbul Barbershop.",
    images: ["https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <AmbientBackground />
          <Box position="relative" zIndex={1} minH="100vh" bg="charcoal.500" color="white">
            <Navbar />
            {children}
            <Footer />
          </Box>
        </Providers>

        <LocalBusinessJsonLd
          type="HairSalon"
          scriptId="jano-localbusiness"
          name="Jan Istanbul – Jano Barbershop"
          description={metadata.description as string}
          url={siteUrl}
          telephone={BUSINESS_INFO.phoneRaw}
          email={BUSINESS_INFO.email}
          address={{
            streetAddress: "178 Cumbernauld Road",
            addressLocality: "Glasgow",
            postalCode: "G69 9NB",
            addressCountry: "GB",
          }}
          geo={{
            latitude: 55.884,
            longitude: -4.087,
          }}
        />

        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(localBusinessJsonLd)}
        </Script>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
              async
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        <Script id="facebook-pixel-placeholder" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js'); if ('${process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? ""}') { fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? ""}'); fbq('track', 'PageView'); }`}
        </Script>
      </body>
    </html>
  );
}
