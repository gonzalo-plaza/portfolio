import { i18n, type Locale } from "@/i18n/config";

/**
 * URL builders for the blog. The default locale (es) lives at the root with no
 * prefix; every other locale is prefixed (e.g. /en), mirroring the site-wide
 * locale strategy handled by the middleware.
 */
const localeBase = (locale: Locale): string =>
  locale === i18n.defaultLocale ? "" : `/${locale}`;

export const blogIndexPath = (locale: Locale): string =>
  `${localeBase(locale)}/blog`;

export const blogPostPath = (locale: Locale, slug: string): string =>
  `${localeBase(locale)}/blog/${slug}`;
