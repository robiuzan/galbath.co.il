import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { locations, type LocationSlug, siteConfig } from "@/lib/site-config";
import { serviceCards } from "@/lib/content";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { BeforeAfterGrid, galleryHint } from "@/components/marketing/BeforeAfterGallery";
import { FinalCta } from "@/components/marketing/FinalCta";

export function generateStaticParams(): { city: LocationSlug }[] {
  return locations.map((c) => ({ city: c.slug }));
}

/** Match the route param against a slug, tolerant of URL-encoding + Unicode normalization
 *  (Hebrew dynamic segments arrive percent-encoded during static export). */
function findLocation(param: string) {
  const target = decodeURIComponent(param).normalize("NFC");
  return locations.find((c) => c.slug.normalize("NFC") === target);
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const loc = findLocation(params.city);
  if (!loc) return {};
  return {
    alternates: { canonical: `/locations/${loc.slug}/` },
    title: `ציפוי אמבטיה ב${loc.name} | ${siteConfig.name}`,
    description: `ציפוי, חידוש ושיפוץ אמבטיות ב${loc.name} — מהיום להיום, בלי לשבור קירות, עם אחריות בכתב ומחיר הוגן. מעל 25 שנות ניסיון.`,
  };
}

export default function LocationPage({ params }: { params: { city: string } }) {
  const loc = findLocation(params.city);
  if (!loc) notFound();

  return (
    <>
      <PageHeader
        title={`ציפוי אמבטיה ב${loc.name}`}
        subtitle={`חידוש, ציפוי ושיפוץ אמבטיות ב${loc.name} והסביבה — מהיום להיום, בגימור חלק כמו חדש ועם אחריות בכתב.`}
        crumbs={[
          { label: "בית", href: "/" },
          { label: "אזורי שירות", href: "/איזורי-שירות" },
          { label: loc.name },
        ]}
      />

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-gray-700">
            מחפשים ציפוי אמבטיה מקצועי ב{loc.name}? ב{siteConfig.name} מחדשים את האמבטיה
            הישנה והמוכתמת ומחזירים לה מראה חלק ומבריק כמו חדש — בלי לפרק, בלי לשבור קירות
            ובלי לכלוך. עבודה מהירה, חומרים איכותיים ואחריות בכתב.
          </p>
          <p className="mt-4 text-gray-700">
            אנחנו נותנים שירות ללקוחות פרטיים, ועדי בתים ועסקים ב{loc.name} ובכל אזור
            המרכז, לרוב מהיום להיום. התהליך אורך כ-3–6 שעות והאמבטיה מוכנה לשימוש תוך כ-24
            שעות.
          </p>

          {/* Two across, not three: this column is max-w-3xl, so thirds would leave the
              before/after halves too small to tell apart. */}
          <h2 className="mt-10 font-heading text-xl font-bold text-primary">לפני ואחרי</h2>
          <p className="mt-2 text-gray-700">{galleryHint}</p>
          <BeforeAfterGrid columns={2} className="mt-6" />

          <h2 className="mt-10 font-heading text-xl font-bold text-primary">
            השירותים שלנו ב{loc.name}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {serviceCards.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex items-center justify-between gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 hover:border-secondary hover:text-secondary"
                >
                  {s.name}
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
