/**
 * content.ts — display content for the site, derived from the galbath.co.il live-site audit.
 * Business data (NAP, slugs, locations) stays in site-config.ts; this file holds the
 * Hebrew marketing copy and per-section content.
 */
import { services, type ServiceSlug } from "@/lib/site-config";

export type IconName =
  | "Sparkles"
  | "Bath"
  | "Hammer"
  | "Layers"
  | "Paintbrush"
  | "Wrench"
  | "Droplets"
  | "PaintBucket"
  | "ShowerHead"
  | "ShieldCheck";

interface ServiceMeta {
  tagline: string;
  description: string;
  icon: IconName;
}

/** Per-service display copy, keyed by the slugs in site-config. */
const serviceMeta: Record<ServiceSlug, ServiceMeta> = {
  "ציפוי-אמבטיה": {
    tagline: "גימור חלק כמו חדש · מהיום להיום",
    description:
      "מחדשים את פני האמבטיה בשכבת ציפוי מקצועית ועמידה, בגימור חלק ונקי כמו חדש — בלי לפרק, בלי לשבור קירות ובלי לכלוך. התהליך אורך כ-3–6 שעות והאמבטיה מוכנה לשימוש תוך כ-24 שעות.",
    icon: "Sparkles",
  },
  "חידוש-אמבטיה": {
    tagline: "מראה חדש בלי להחליף",
    description:
      "מחזירים לאמבטיה ישנה ומוכתמת מראה חדש ומבריק — ניקוי, תיקון פגמים וציפוי מלא בגוון לבחירתכם. פתרון מהיר וחסכוני במקום החלפת אמבטיה שלמה.",
    icon: "Bath",
  },
  "שיפוץ-אמבטיה": {
    tagline: "תיקון, יישור וציפוי מלא",
    description:
      "שיפוץ מקיף לאמבטיה שחוקה או פגומה — תיקון סדקים, חלודה ונזקים, יישור פני השטח וציפוי מלא, כדי להחזיר את האמבטיה לתפקוד מלא ולמראה מרשים.",
    icon: "Hammer",
  },
  "הלבשת-אמבטיה": {
    tagline: "אמבטיה חדשה מעל הישנה",
    description:
      "הלבשה של אמבטיה חדשה מעל האמבטיה הקיימת (אמבטיה בתוך אמבטיה) — פתרון עמיד ונקי להחלפת מראה האמבטיה, ללא עבודות הריסה וללא שבירת קירות.",
    icon: "Layers",
  },
  "צביעת-אמבטיה": {
    tagline: "גוון אחיד ועמיד למים",
    description:
      "צביעה מקצועית של האמבטיה בחומרים ייעודיים ועמידים למים ולשחיקה, בגוון אחיד לבחירתכם — לרענון מהיר של חדר הרחצה.",
    icon: "Paintbrush",
  },
  "תיקון-אמבטיות": {
    tagline: "סדקים, שברים ושחיקה",
    description:
      "תיקון נקודתי של שברים, סדקים, שריטות ושחיקה באמבטיה — עבודה מהירה ונקייה שמאריכה את חיי האמבטיה בלי להחליף אותה.",
    icon: "Wrench",
  },
  "תיקון-אינסטלציה-באמבט": {
    tagline: "נזילות וחיבורים באמבט",
    description:
      "טיפול בבעיות אינסטלציה באזור האמבטיה — נזילות, סתימות וחיבורים — לצד עבודות הציפוי והשיפוץ, לפתרון כולל בחדר הרחצה.",
    icon: "Droplets",
  },
  "תיקון-אמבטיה-אקרילית": {
    tagline: "איחוי סדקים באקריל",
    description:
      "תיקון וחידוש של אמבטיות אקריליות — איחוי סדקים, מילוי חורים והשבת הגימור החלק והמבריק של האקריל.",
    icon: "PaintBucket",
  },
  "ציפוי-כיורים": {
    tagline: "כיור רחצה ומטבח כמו חדש",
    description:
      "ציפוי וחידוש של כיורי רחצה ומטבח בשכבה עמידה ואחידה — מסתירים כתמים ושחיקה ומעניקים לכיור מראה חדש.",
    icon: "ShowerHead",
  },
  "תיקון-חלודה-באמבטיה": {
    tagline: "עצירת חלודה באמבטיות ברזל",
    description:
      "מטפלים בחלודה באמבטיות ברזל יצוק — הסרת החלודה, מניעת התפשטותה וציפוי מגן — כדי לעצור את הנזק ולחדש את המראה.",
    icon: "ShieldCheck",
  },
};

export interface ServiceCard {
  slug: ServiceSlug;
  name: string;
  tagline: string;
  description: string;
  icon: IconName;
}

/** Service cards (name from site-config + display copy here), flagship first. */
export const serviceCards: ServiceCard[] = services.map((s) => ({
  slug: s.slug,
  name: s.name,
  ...serviceMeta[s.slug],
}));

/** Brand positioning — top 3 differentiators (live-site audit). */
export const differentiators = [
  {
    title: "איכות ללא פשרות",
    body: "עבודה מדויקת בחומרים איכותיים ובגימור מושלם — תוצאה שנראית ומחזיקה כמו חדשה לאורך שנים.",
  },
  {
    title: "התאמה אישית",
    body: "כל אמבטיה מקבלת פתרון וגוון מותאמים בדיוק לצרכים ולסגנון שלכם — ייעוץ אישי מההתחלה ועד הסיום.",
  },
  {
    title: "שירות מהיר ואמין",
    body: "מגיעים מהיום להיום, עובדים נקי בלי לשבור קירות ומסיימים במהירות — עם אחריות בכתב ומחיר הוגן ושקוף.",
  },
] as const;

/** End-to-end process (bathtub coating). */
export const processSteps = [
  { title: "פנייה וייעוץ", body: "מתקשרים, מבינים מה נדרש ומקבלים ייעוץ והצעת מחיר שקופה." },
  { title: "הגעה ובדיקה", body: "מגיעים אליכם — לרוב מהיום להיום — בוחנים את מצב האמבטיה ומתאמים גוון." },
  { title: "הכנה וניקוי", body: "מנקים, משייפים ומתקנים סדקים, חלודה ופגמים לקראת הציפוי." },
  { title: "ציפוי מקצועי", body: "מורחים שכבות ציפוי איכותי בגימור חלק ואחיד — כ-3–6 שעות עבודה." },
  { title: "מוכן לשימוש + אחריות", body: "האמבטיה מוכנה לשימוש תוך כ-24 שעות, עם אחריות בכתב." },
] as const;

/** Trust stats for the trust bar. */
export const trustStats = [
  { value: "25+ שנים", label: "ניסיון בתחום" },
  { value: "מהיום להיום", label: "שירות מהיר" },
  { value: "אחריות בכתב", label: "על כל עבודה" },
  { value: "פריסה ארצית", label: "תל אביב והמרכז" },
] as const;

/**
 * Before/after pairs for the homepage comparison gallery.
 *
 * `id` resolves to `/gallery/ba-<id>-before.webp` and `/gallery/ba-<id>-after.webp` —
 * derivatives generated from the originals in assets/gallery/ and capped at 800px, which
 * covers the 3-column tile at 2x. `subject` is the shared Hebrew description; the widget
 * appends "לפני" / "אחרי" so neither frame ships an empty alt.
 *
 * Tiles are a uniform 3:2 box, so pair 07 (the only portrait shot) is centre-cropped.
 */
export interface BeforeAfterPair {
  id: string;
  subject: string;
}

export const beforeAfterPairs: BeforeAfterPair[] = [
  { id: "01", subject: "כיור אמבטיה עם ברז זורם" },
  { id: "02", subject: "אמבטיה ישנה בהכנה לציפוי — הסרת ציפוי מתקלף" },
  { id: "03", subject: "פינת מקלחון עם עובש בסיליקון וברובה" },
  { id: "04", subject: "פינת אמבטיה עם אריחים מוכתמים וחלודה" },
  { id: "05", subject: "אמבטיה ישנה עם כתמי חלודה וברז מיושן" },
  { id: "06", subject: "פתח ניקוז חלוד עם כתמי אבנית" },
  { id: "07", subject: "כיור רחצה עם כתמי אבנית וצהבת" },
];

/**
 * Indicative price ranges (live-site audit / מחירון). All prices are before a ₪70
 * call-out fee. Final price is set after an on-site inspection.
 */
export const priceRows = [
  { service: "ציפוי אמבטיה רגילה", from: "1,150–1,450 ₪" },
  { service: "ציפוי אמבטיה פינתית", from: "1,400–1,800 ₪" },
  { service: "ציפוי אמבטיית ברזל יצוק", from: "1,350–1,600 ₪" },
  { service: "חידוש אמבטיה", from: "1,200–2,000 ₪" },
  { service: "שיפוץ אמבטיה", from: "1,500–3,200 ₪" },
  { service: "הלבשת אמבטיה", from: "2,800–4,000 ₪" },
  { service: "צביעת אמבטיה", from: "1,100–1,800 ₪" },
  { service: "תיקון אמבטיות", from: "900–1,700 ₪" },
  { service: "תיקון אינסטלציה באמבט", from: "700–1,500 ₪" },
  { service: "תיקון אמבטיה אקרילית", from: "950–1,600 ₪" },
  { service: "ציפוי כיורים", from: "800–1,600 ₪" },
  { service: "תיקון חלודה באמבטיה", from: "850–1,700 ₪" },
] as const;

/** Homepage FAQ (live-site audit). */
export const faqs = [
  {
    q: "מהו ציפוי אמבטיה?",
    a: "ציפוי אמבטיה הוא תהליך שבו מורחים על פני האמבטיה שכבות של חומר ייעודי ועמיד, שמעניק לה מראה חדש, חלק ומבריק — בלי צורך להחליף את האמבטיה ובלי לשבור קירות.",
  },
  {
    q: "כמה זמן נמשך התהליך?",
    a: "עבודת הציפוי עצמה אורכת כ-3–6 שעות, והאמבטיה מוכנה לשימוש מלא תוך כ-24 שעות מסיום העבודה.",
  },
  {
    q: "אילו סוגי אמבטיה אפשר לצפות?",
    a: "אפשר לצפות כמעט כל סוג של אמבטיה — ברזל יצוק, אקריל וחרסינה — וכן כיורים. בבדיקה נוודא שהמשטח מתאים לציפוי.",
  },
  {
    q: "כמה זמן מחזיק הציפוי?",
    a: "בשימוש ובתחזוקה נכונים ציפוי איכותי מחזיק בין 5 ל-10 שנים, ואנחנו מעניקים עליו אחריות בכתב.",
  },
  {
    q: "האם האמבטיה נראית כמו חדשה?",
    a: "כן. הציפוי מעניק גימור חלק, אחיד ומבריק, כך שהאמבטיה נראית ומרגישה כמו אמבטיה חדשה.",
  },
  {
    q: "כמה עולה ציפוי אמבטיה?",
    a: "מחיר ציפוי אמבטיה סטנדרטית מתחיל באזור 750–1,200 ₪, ומשתנה לפי סוג האמבטיה, מצבה וגודלה. טווחי המחיר המלאים לכל השירותים מופיעים בעמוד המחירון, והמחיר הסופי נמסר לאחר בדיקה — תמיד בשקיפות.",
  },
  {
    q: "האם יש אחריות?",
    a: "בהחלט. אנחנו מעניקים אחריות בכתב על עבודות הציפוי והשיפוץ, לראש שקט לאורך זמן.",
  },
  {
    q: "אפשר לבחור גוון?",
    a: "כן. אפשר לבחור מגוון גוונים לציפוי, כולל לבן קלאסי וגוונים נוספים, בהתאמה אישית לחדר הרחצה שלכם.",
  },
  {
    q: "איך מנקים את האמבטיה אחרי הציפוי?",
    a: "מומלץ לנקות בעדינות עם חומרי ניקוי לא שוחקים, בלי חומרים אברזיביים וממיסים חזקים, כדי לשמור על הגימור לאורך זמן.",
  },
  {
    q: "מה עושים אם מופיע סדק?",
    a: "אפשר לתקן סדקים ופגמים באופן נקודתי, בלי לצפות מחדש את כל האמבטיה. צרו קשר ונגיע לבדוק ולתקן.",
  },
] as const;

/** Header / footer navigation (live Hebrew URLs). */
export const navItems = [
  { label: "השירותים שלנו", href: "/שירותים" },
  { label: "אזורי שירות", href: "/איזורי-שירות" },
  { label: "מחירון", href: "/מחירון" },
  { label: "אודות", href: "/אודות" },
  { label: "צור קשר", href: "/צור-קשר" },
] as const;
