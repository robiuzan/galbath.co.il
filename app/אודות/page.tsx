import type { Metadata } from "next";
import { Check } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { TrustBar } from "@/components/marketing/TrustBar";
import { FinalCta } from "@/components/marketing/FinalCta";

export const metadata: Metadata = {
  title: "אודות גל אמבטיות",
  description:
    "גל אמבטיות — מומחים בציפוי ושיפוץ אמבטיות עם מעל 25 שנות ניסיון. חומרים איכותיים, אחריות בכתב, שירות מהיום להיום ומחירים הוגנים ושקופים.",
};

const values = [
  "מצוינות בכל עבודה",
  "שביעות רצון הלקוחות",
  "יושרה ושקיפות",
  "מומחיות וניסיון של מעל 25 שנה",
  "שירות אישי ומותאם",
  "תיקונים עמידים לאורך זמן",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="אודות גל אמבטיות"
        subtitle="מומחים בציפוי ושיפוץ אמבטיות — לאמבטיה כמו חדשה, בקלות ובמהירות."
        crumbs={[{ label: "בית", href: "/" }, { label: "אודות" }]}
      />

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-gray-700">
            ב{siteConfig.name} אנחנו מתמחים בציפוי, חידוש ושיפוץ אמבטיות — עם מעל 25 שנות
            ניסיון בתחום. במקום להחליף אמבטיה שלמה על כל הלכלוך והעלות, אנחנו מחדשים את
            האמבטיה הקיימת ומחזירים לה מראה חלק ומבריק כמו חדש, בלי לשבור קירות ובלי לכלוך.
          </p>
          <p className="mt-4 text-gray-700">
            אנחנו מלווים לקוחות פרטיים, ועדי בתים ועסקים בתל אביב והמרכז ובפריסה ארצית,
            לרוב מהיום להיום — עם חומרים איכותיים, אחריות בכתב ומחירים הוגנים ושקופים.
          </p>

          <h2 className="mt-10 font-heading text-xl font-bold text-primary">
            הערכים שלנו
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {values.map((v) => (
              <li key={v} className="flex items-start gap-2 text-gray-700">
                <Check className="mt-1 h-4 w-4 shrink-0 text-accent-600" aria-hidden />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <TrustBar />
      <FinalCta />
    </>
  );
}
