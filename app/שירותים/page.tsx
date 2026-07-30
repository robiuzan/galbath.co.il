import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesGrid } from "@/components/marketing/ServicesGrid";
import { FinalCta } from "@/components/marketing/FinalCta";

export const metadata: Metadata = {
  alternates: { canonical: "/שירותים/" },
  title: "השירותים שלנו",
  description:
    "שירותי ציפוי, חידוש ושיפוץ אמבטיות: ציפוי אמבטיה, הלבשה, צביעה, תיקון אמבטיות, ציפוי כיורים, תיקון חלודה ואינסטלציה — עם אחריות בכתב ומחיר הוגן.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="השירותים שלנו"
        subtitle="פתרון לכל אמבטיה וכיור — מציפוי וחידוש ועד תיקון נקודתי, בגימור חלק כמו חדש ועם אחריות בכתב."
        crumbs={[{ label: "בית", href: "/" }, { label: "השירותים שלנו" }]}
      />
      <ServicesGrid />
      <FinalCta />
    </>
  );
}
