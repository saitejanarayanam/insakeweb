import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms",
  description: "inSAKE terms of service.",
};

export default function TermsPage() {
  return (
    <div>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <div className="prose-sm mx-auto max-w-3xl space-y-4 px-4 py-12 text-sm text-(--color-muted)">
        <p>
          This is placeholder terms-of-service content — replace with your final,
          legally reviewed terms before launch.
        </p>
        <h2 className="text-base font-semibold text-(--foreground)">Use of the platform</h2>
        <p>
          By enrolling in a course, you agree to use course materials for personal,
          non-commercial learning purposes only.
        </p>
        <h2 className="text-base font-semibold text-(--foreground)">Payments</h2>
        <p>
          All course fees are processed securely via Razorpay. Prices are listed in
          Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.
        </p>
        <h2 className="text-base font-semibold text-(--foreground)">Certification</h2>
        <p>
          Certificates are issued upon successful completion of course requirements, as
          defined on each course&apos;s detail page.
        </p>
      </div>
    </div>
  );
}
