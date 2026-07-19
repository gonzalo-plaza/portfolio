import { NextResponse, type NextRequest } from "next/server";

import { i18n } from "@/i18n/config";

/**
 * Locale routing strategy: the default locale (es) lives at the root with NO
 * prefix, while every other locale is served under its own prefix (e.g. /en).
 *
 * - `/en`, `/en/...`      → served as-is (resolves the [lang] segment).
 * - `/es`, `/es/...`      → 301 to the un-prefixed path (avoid duplicate URLs).
 * - anything else         → rewritten internally to `/es/...` so it resolves
 *                           the [lang] segment while the public URL stays clean.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The default locale must never be reachable with a prefix.
  if (pathname === `/${i18n.defaultLocale}` || pathname.startsWith(`/${i18n.defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${i18n.defaultLocale}`.length) || "/";
    return NextResponse.redirect(url);
  }

  // Non-default locales keep their prefix.
  const hasPrefixedLocale = i18n.locales.some(
    (locale) =>
      locale !== i18n.defaultLocale &&
      (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
  );
  if (hasPrefixedLocale) {
    return NextResponse.next();
  }

  // Default locale content, rewritten internally (public URL untouched).
  const url = request.nextUrl.clone();
  url.pathname = `/${i18n.defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and any file with an extension (static assets,
  // sitemap.xml, robots.txt, llms.txt, images, favicons, ...).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
