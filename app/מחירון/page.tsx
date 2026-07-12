import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { PricingTeaser } from "@/components/marketing/PricingTeaser";

export const metadata: Metadata = {
  title: "מחירון ציפוי ושיפוץ אמבטיות",
  description:
    "מחירון ציפוי, חידוש ושיפוץ אמבטיות להתרשמות: ציפוי אמבטיה, הלבשה, צביעה, תיקונים וציפוי כיורים. מחירים הוגנים ושקופים — המחיר הסופי לפי בדיקה.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="מחירון ציפוי ושיפוץ אמבטיות"
        subtitle="מחירים הוגנים ושקופים. הטווחים מובאים להתרשמות; המחיר הסופי נקבע לאחר בדיקה — תמיד ברור מראש."
        crumbs={[{ label: "בית", href: "/" }, { label: "מחירון" }]}
      />
      <PricingTeaser />
      <Section tone="muted">
        <p className="mx-auto max-w-2xl text-center text-sm text-gray-500">
          הטווחים מובאים להתרשמות בלבד ועשויים להשתנות לפי סוג האמבטיה, מצבה, גודלה
          והגוון הנבחר. לכל המחירים מתווספים דמי קריאה בסך 70 ₪. המחיר המחייב יינתן רק
          לאחר בדיקה.
        </p>
      </Section>
    </>
  );
}
