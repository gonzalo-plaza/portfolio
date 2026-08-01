import "server-only";

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { i18n, type Locale } from "@/i18n/config";
import type {
  BlogPost,
  BlogPostFrontmatter,
  BlogPostMeta,
} from "@/models/blogPost";

/**
 * Blog content lives OUTSIDE `src/` as plain `.mdx` files so content stays
 * decoupled from code. Posts are read from disk at build time only (SSG), one
 * folder per locale: `content/blog/<locale>/<slug>.mdx`.
 */
const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const MDX_EXTENSION = ".mdx";

const localeDir = (locale: Locale): string =>
  path.join(BLOG_CONTENT_DIR, locale);

/** Estimated reading time in whole minutes (never below 1). */
const toReadingMinutes = (content: string): number =>
  Math.max(1, Math.round(readingTime(content).minutes));

/**
 * Reads and parses a single post from disk. Returns metadata and body split
 * apart. Returns `null` when the file does not exist for the given locale (so a
 * missing translation degrades gracefully instead of throwing during static
 * generation).
 */
const readPost = async (
  locale: Locale,
  slug: string
): Promise<{ meta: BlogPostMeta; content: string } | null> => {
  try {
    const raw = await readFile(
      path.join(localeDir(locale), `${slug}${MDX_EXTENSION}`),
      "utf8"
    );
    const { data, content } = matter(raw);
    const frontmatter = data as BlogPostFrontmatter;

    return {
      meta: {
        ...frontmatter,
        slug,
        locale,
        readingTimeMinutes: toReadingMinutes(content),
      },
      content,
    };
  } catch {
    return null;
  }
};

/** Full post (metadata + MDX body) for a locale, or `null` if missing. */
export const getPostBySlug = async (
  locale: Locale,
  slug: string
): Promise<BlogPost | null> => {
  const post = await readPost(locale, slug);
  return post ? { ...post.meta, content: post.content } : null;
};

/** Slugs available for a locale (filenames without the `.mdx` extension). */
const getSlugsForLocale = async (locale: Locale): Promise<string[]> => {
  try {
    const entries = await readdir(localeDir(locale));
    return entries
      .filter((entry) => entry.endsWith(MDX_EXTENSION))
      .map((entry) => entry.slice(0, -MDX_EXTENSION.length));
  } catch {
    return [];
  }
};

/**
 * All post metadata for a locale, newest first. Skips files that fail to parse
 * rather than breaking the whole listing.
 */
export const getAllPostsMeta = async (
  locale: Locale
): Promise<BlogPostMeta[]> => {
  const slugs = await getSlugsForLocale(locale);
  const posts = await Promise.all(slugs.map((slug) => readPost(locale, slug)));

  return posts
    .filter((post): post is { meta: BlogPostMeta; content: string } =>
      post !== null
    )
    .map((post) => post.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
};

/**
 * The blog treats "every post exists in every locale" as an invariant, and this
 * is where it is enforced. Holding the invariant is what keeps the sitemap, the
 * `hreflang` alternates and the language switch correct *by construction*:
 * because `generateStaticParams` combines the locales from the parent segment
 * with the union of slugs, an untranslated post would otherwise pre-render a
 * 404 page for the missing locale and still be advertised to crawlers.
 *
 * Production builds only, so a post can still be previewed in `next dev` while
 * its translation is being written.
 */
const assertEveryPostIsTranslated = (
  perLocale: { locale: Locale; slugs: string[] }[],
  slugs: string[]
): void => {
  const missing = perLocale.flatMap(({ locale, slugs: translated }) => {
    const available = new Set(translated);
    return slugs
      .filter((slug) => !available.has(slug))
      .map((slug) => `  content/blog/${locale}/${slug}${MDX_EXTENSION}`);
  });

  if (missing.length === 0) return;

  throw new Error(
    `Untranslated blog posts. Every post must exist in all locales ` +
      `(${i18n.locales.join(", ")}); ${missing.length} file(s) missing:\n` +
      missing.join("\n")
  );
};

/**
 * Unique slugs across every locale — used by `generateStaticParams` and the
 * sitemap. Thanks to the translation invariant above, this union is also the
 * intersection: every slug returned here is renderable in every locale.
 */
export const getAllSlugs = async (): Promise<string[]> => {
  const perLocale = await Promise.all(
    i18n.locales.map(async (locale) => ({
      locale,
      slugs: await getSlugsForLocale(locale),
    }))
  );

  const slugs = Array.from(
    new Set(perLocale.flatMap((entry) => entry.slugs))
  );

  if (process.env.NODE_ENV === "production") {
    assertEveryPostIsTranslated(perLocale, slugs);
  }

  return slugs;
};
