import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

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
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
