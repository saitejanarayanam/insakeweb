import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "inSAKE refund policy.",
};

export default function RefundPolicyPage() {
  return (
    <div>
      <PageHero eyebrow="Legal" title="Refund Policy" />
      <div className="prose-sm mx-auto max-w-3xl space-y-4 px-4 py-12 text-sm text-(--color-muted)">
        <p>
          This is placeholder refund-policy content — replace with your final, legally
          reviewed policy before launch.
        </p>
        <h2 className="text-base font-semibold text-(--foreground)">Eligibility</h2>
        <p>
          Refund requests submitted within 7 days of enrollment, and before any course
          content has been accessed, are eligible for a full refund.
        </p>
        <h2 className="text-base font-semibold text-(--foreground)">How to request a refund</h2>
        <p>
          Email team@insake.in with your order ID and reason for the refund request.
        </p>
        <h2 className="text-base font-semibold text-(--foreground)">Processing time</h2>
        <p>Approved refunds are processed within 7–10 business days to the original payment method.</p>
      </div>
    </div>
  );
}
