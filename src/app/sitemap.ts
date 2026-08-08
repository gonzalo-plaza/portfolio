import type { MetadataRoute } from "next";
import { SITE_URL, getLocalePath, i18n, type Locale } from "@/i18n/config";
import { getAllPostsMeta, getPostSlugMap } from "@/blog/blogPosts";
import { blogIndexPath, blogPostPath } from "@/blog/blogPaths";
import type { BlogPostMeta } from "@/models/blogPost";

type LocalePath = (locale: Locale) => string;

/** The root collapses to a bare `SITE_URL` to match the canonical exactly. */
const absoluteUrl = (path: string): string =>
  path === "/" ? SITE_URL : `${SITE_URL}${path}`;

/** Derived from `i18n.locales`: `hreflang` breaks unless the group is complete,
 *  and a hand-written map would type-check while silently dropping a locale.
 *  `locales` narrows the group to the languages a given post actually has. */
const languagesFor = (
  toPath: LocalePath,
  locales: readonly Locale[] = i18n.locales
): Record<string, string> => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(toPath(locale))])
  ),
  ...(locales.includes(i18n.defaultLocale)
    ? { "x-default": absoluteUrl(toPath(i18n.defaultLocale)) }
    : {}),
});

/** Never a build-time `new Date()`: Google drops `lastmod` once it stops matching. */
const contentDate = (post: BlogPostMeta): string => post.updated ?? post.date;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Also where the blog content invariants are enforced.
  const slugMap = await getPostSlugMap();

  const postsByLocale = new Map<Locale, Map<string, BlogPostMeta>>(
    await Promise.all(
      i18n.locales.map(async (locale) => {
        const posts = await getAllPostsMeta(locale);
        return [locale, new Map(posts.map((post) => [post.slug, post]))] as const;
      })
    )
  );

  const postDate = (locale: Locale, slug: string): string | undefined => {
    const post = postsByLocale.get(locale)?.get(slug);
    return post && contentDate(post);
  };

  const latestPostDate = (locale: Locale): string | undefined =>
    [...(postsByLocale.get(locale)?.values() ?? [])]
      .map(contentDate)
      .sort((a, b) => b.localeCompare(a))[0];

  const homeLanguages = languagesFor(getLocalePath);

  // No `lastModified`: the home has no content date to point at.
  const home: MetadataRoute.Sitemap = i18n.locales.map((locale) => ({
    url: absoluteUrl(getLocalePath(locale)),
    changeFrequency: "monthly",
    priority: locale === i18n.defaultLocale ? 1 : 0.9,
    alternates: { languages: homeLanguages },
  }));

  const blogIndexLanguages = languagesFor(blogIndexPath);

  const blogIndex: MetadataRoute.Sitemap = i18n.locales.map((locale) => ({
    url: absoluteUrl(blogIndexPath(locale)),
    lastModified: latestPostDate(locale),
    changeFrequency: "monthly",
    priority: locale === i18n.defaultLocale ? 0.8 : 0.7,
    alternates: { languages: blogIndexLanguages },
  }));

  // Each translation has its own slug, so the `hreflang` group is built from
  // the map rather than by reusing one slug across locales.
  const posts: MetadataRoute.Sitemap = [...slugMap.values()].flatMap((slugs) => {
    // `assertPostsAreValid` guarantees every locale outside production only, so
    // a half-translated post previewed in `next dev` would otherwise advertise
    // `/blog/undefined` instead of simply being absent from the group.
    const translated = i18n.locales.filter((locale) => slugs[locale]);

    const languages = languagesFor(
      (locale) => blogPostPath(locale, slugs[locale]),
      translated
    );

    return translated.map((locale) => ({
      url: absoluteUrl(blogPostPath(locale, slugs[locale])),
      lastModified: postDate(locale, slugs[locale]),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages },
    }));
  });

  return [...home, ...blogIndex, ...posts];
}
