import type { MetadataRoute } from "next";
import { siteConfig, services, locations } from "@/lib/site-config";

/**
 * Generates /sitemap.xml from the static routes + the service and location matrices.
 * Paths mirror the live galbath.co.il Hebrew URL scheme. Extend `staticPaths` when new
 * top-level pages are added.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain;
  const now = new Date();

  /**
   * next.config.mjs sets `trailingSlash: true`, so every page is served at `/path/` and a
   * slashless URL 301s. A sitemap must list the final destination, never the redirect —
   * so every `loc` here (and the per-page canonicals) carries the trailing slash.
   *
   * `encodeURI` percent-escapes the Hebrew slugs. The sitemap protocol requires escaped
   * URLs, and Cloudflare Pages only matches the escaped asset key — it 404s a path sent
   * as raw UTF-8 bytes. Escaping also makes `loc` byte-identical to the page's canonical.
   */
  const absolute = (path: string) =>
    encodeURI(path ? `${base}/${path}/` : `${base}/`);

  const staticPaths = [
    "",
    "שירותים",
    "איזורי-שירות",
    "מחירון",
    "אודות",
    "צור-קשר",
    "מדיניות-פרטיות",
    "הצהרת-נגישות",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absolute(path),
    lastModified: now,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: absolute(`services/${s.slug}`),
    lastModified: now,
  }));

  const locationEntries: MetadataRoute.Sitemap = locations.map((c) => ({
    url: absolute(`locations/${c.slug}`),
    lastModified: now,
  }));

  return [...staticEntries, ...serviceEntries, ...locationEntries];
}
