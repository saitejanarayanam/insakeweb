import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ConditionalChrome } from "@/components/ConditionalChrome";
import { JsonLd } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "inSAKE — Certify, Upskill, Grow",
    template: "%s | inSAKE",
  },
  description:
    "inSAKE offers expert-led certification courses, finance & analytics training, and career-skills programs to help you build real-world, job-ready skills.",
  openGraph: {
    title: "inSAKE — Certify, Upskill, Grow",
    description:
      "inSAKE offers expert-led certification courses, finance & analytics training, and career-skills programs to help you build real-world, job-ready skills.",
    siteName: "inSAKE Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "inSAKE — Certify, Upskill, Grow",
    description:
      "inSAKE offers expert-led certification courses, finance & analytics training, and career-skills programs to help you build real-world, job-ready skills.",
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "inSAKE Academy",
  url: BASE_URL,
  logo: `${BASE_URL}/insake-logo.png`,
  description:
    "inSAKE offers expert-led certification courses, finance & analytics training, and career-skills programs to help you build real-world, job-ready skills.",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "House No. 02, Ground floor, Borewell Rd, Whitefield",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560066",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "213 Decatur Ln",
      addressRegion: "GA",
      postalCode: "30033",
      addressCountry: "US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={ORGANIZATION_JSON_LD} />
        <Providers>
          <ConditionalChrome>{children}</ConditionalChrome>
        </Providers>
      </body>
    </html>
  );
}
