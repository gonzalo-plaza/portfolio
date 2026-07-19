export const i18n = {
  defaultLocale: "es",
  locales: ["es", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const isLocale = (value: string): value is Locale =>
  (i18n.locales as readonly string[]).includes(value);

/**
 * Public site origin. Used to build canonical + hreflang URLs.
 */
export const SITE_URL = "https://gonzaloplazarueda.com";

/**
 * Builds the PUBLIC url for a given locale. The default locale (es) lives at
 * the root with no prefix; every other locale is prefixed (e.g. /en).
 */
export const getLocalePath = (locale: Locale): string =>
  locale === i18n.defaultLocale ? "/" : `/${locale}`;
