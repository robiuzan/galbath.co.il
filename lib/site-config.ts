/**
 * site-config.ts — single source of truth for business data (NAP, services, locations).
 *
 * Derived from the live-site audit of galbath.co.il. Components import these values
 * rather than hardcoding the phone number, service names, or location slugs.
 *
 * Slugs are the EXACT Hebrew slugs from the live sitemap (SEO fidelity — do not "fix" them;
 * e.g. the כפר סבא page ships under the live slug "כפס-סבא").
 */

import siteManifest from "@/site.config.json";
import {
  telHref as kitTelHref,
  whatsappHref as kitWhatsappHref,
  type SiteManifest,
} from "@ishub/site-kit";

/** Normalized per-site manifest (single source of truth for NAP/identity/schema). */
export const manifest = siteManifest as unknown as SiteManifest;

export const siteConfig = {
  name: manifest.brandName ?? "",
  nameEn: manifest.brandNameEn ?? "",
  /** One-line elevator pitch. */
  tagline: manifest.tagline ?? "",
  domain: manifest.url,
  founded: manifest.foundedYear ?? 0,

  // ── Contact ──────────────────────────────────────────────────────────────
  phone: manifest.contact.phoneDisplay,
  /** E.164 form for `tel:` links. */
  phoneE164: manifest.contact.phoneE164,
  whatsapp: manifest.contact.whatsappE164.replace(/\D/g, ""),
  email: manifest.contact.email,
  /** Web3Forms PUBLIC access key (per-site UUID). Delivery inbox = email. null until provisioned. */
  formAccessKey: (manifest.contact as { formAccessKey?: string | null }).formAccessKey ?? null,
  serviceArea: manifest.schema.areaServed ?? "",

  /** Business hours (live-site audit). */
  hours: {
    weekday: "ראשון–חמישי 08:00–18:00",
    friday: "שישי 08:00–15:00",
    emergency: "שירות מהיום להיום", // same-day service
  },

  // ── Social / listings — fill when available ──────────────────────────────
  social: {
    facebook: "",
    instagram: "",
    googleBusiness: "",
  },
} as const;

/**
 * Services (live-site services silo), flagship first.
 * `slug` = Hebrew route segment (`app/services/[service]`); `name` = Hebrew display name.
 * Marketing descriptions live with the page content (lib/content.ts), not here.
 */
export const services = [
  { slug: "ציפוי-אמבטיה", name: "ציפוי אמבטיה" },
  { slug: "חידוש-אמבטיה", name: "חידוש אמבטיה" },
  { slug: "שיפוץ-אמבטיה", name: "שיפוץ אמבטיה" },
  { slug: "הלבשת-אמבטיה", name: "הלבשת אמבטיה" },
  { slug: "צביעת-אמבטיה", name: "צביעת אמבטיה" },
  { slug: "תיקון-אמבטיות", name: "תיקון אמבטיות" },
  { slug: "תיקון-אינסטלציה-באמבט", name: "תיקון אינסטלציה באמבט" },
  { slug: "תיקון-אמבטיה-אקרילית", name: "תיקון אמבטיה אקרילית" },
  { slug: "ציפוי-כיורים", name: "ציפוי כיורים" },
  { slug: "תיקון-חלודה-באמבטיה", name: "תיקון חלודה באמבטיה" },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

/**
 * Local-SEO location matrix (live-site locations silo) — תל אביב והמרכז + ארצי.
 * Drives `app/locations/[city]` (`ציפוי אמבטיה ב[עיר]`).
 * NOTE: "כפר סבא" ships under the live (misspelled) slug "כפס-סבא" for URL/SEO fidelity.
 */
export const locations = [
  { slug: "תל-אביב", name: "תל אביב" },
  { slug: "חיפה", name: "חיפה" },
  { slug: "ירושלים", name: "ירושלים" },
  { slug: "ראשון-לציון", name: "ראשון לציון" },
  { slug: "פתח-תקווה", name: "פתח תקווה" },
  { slug: "נתניה", name: "נתניה" },
  { slug: "אשדוד", name: "אשדוד" },
  { slug: "אשקלון", name: "אשקלון" },
  { slug: "באר-שבע", name: "באר שבע" },
  { slug: "חולון", name: "חולון" },
  { slug: "רחובות", name: "רחובות" },
  { slug: "כפס-סבא", name: "כפר סבא" },
  { slug: "יבנה", name: "יבנה" },
  { slug: "מודיעין", name: "מודיעין" },
  { slug: "קריות", name: "קריות" },
  { slug: "שרון", name: "שרון" },
  { slug: "צפון", name: "צפון" },
  { slug: "דרום", name: "דרום" },
] as const;

export type LocationSlug = (typeof locations)[number]["slug"];

// ── Link helpers ───────────────────────────────────────────────────────────

/** `tel:` href for click-to-call (shared @ishub/site-kit, bound to the manifest). */
export const telHref = kitTelHref(manifest);

/** WhatsApp click-to-chat href, with an optional pre-filled message (shared kit). */
export function whatsappHref(message?: string): string {
  return kitWhatsappHref(manifest, message);
}
