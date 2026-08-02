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
 * folder per locale: `content/blog/<locale>/<translationKey>.mdx`.
 *
 * The filename is the translation key, never the URL: it is what pairs the
 * Spanish and English versions of a post. The public slug comes from the
 * frontmatter so each language can have a URL in its own language.
 */
const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const MDX_EXTENSION = ".mdx";

const localeDir = (locale: Locale): string =>
  path.join(BLOG_CONTENT_DIR, locale);

/** Estimated reading time in whole minutes (never below 1). */
const toReadingMinutes = (content: string): number =>
  Math.max(1, Math.round(readingTime(content).minutes));

/**
 * Reads and parses a single post from disk by its translation key. Returns
 * `null` when the file does not exist for the given locale.
 */
const readPost = async (
  locale: Locale,
  translationKey: string
): Promise<{ meta: BlogPostMeta; content: string } | null> => {
  try {
    const raw = await readFile(
      path.join(localeDir(locale), `${translationKey}${MDX_EXTENSION}`),
      "utf8"
    );
    const { data, content } = matter(raw);
    const frontmatter = data as BlogPostFrontmatter;

    return {
      meta: {
        ...frontmatter,
        slug: frontmatter.slug ?? translationKey,
        translationKey,
        locale,
        readingTimeMinutes: toReadingMinutes(content),
      },
      content,
    };
  } catch {
    return null;
  }
};

/** Translation keys available for a locale (filenames without the extension). */
const getKeysForLocale = async (locale: Locale): Promise<string[]> => {
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
  const keys = await getKeysForLocale(locale);
  const posts = await Promise.all(keys.map((key) => readPost(locale, key)));

  return posts
    .filter((post): post is { meta: BlogPostMeta; content: string } =>
      post !== null
    )
    .map((post) => post.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
};

/** Full post (metadata + MDX body) for a locale's public slug, or `null`. */
export const getPostBySlug = async (
  locale: Locale,
  slug: string
): Promise<BlogPost | null> => {
  const meta = (await getAllPostsMeta(locale)).find(
    (candidate) => candidate.slug === slug
  );
  if (!meta) return null;

  const post = await readPost(locale, meta.translationKey);
  return post ? { ...post.meta, content: post.content } : null;
};

/** Public slugs for a locale — the `params` for its article routes. */
export const getSlugsForLocale = async (locale: Locale): Promise<string[]> =>
  (await getAllPostsMeta(locale)).map((post) => post.slug);

/**
 * The blog treats "every post exists in every locale, at a slug unique within
 * that locale" as an invariant, and this is where it is enforced. Holding it is
 * what keeps the sitemap, the `hreflang` alternates and the language switch
 * correct *by construction*: an untranslated post would otherwise pre-render a
 * 404 for the missing locale and still be advertised to crawlers, and a
 * duplicate slug would silently make one of the two posts unreachable.
 *
 * Production builds only, so a post can still be previewed in `next dev` while
 * its translation is being written.
 */
const assertPostsAreValid = (
  perLocale: { locale: Locale; posts: BlogPostMeta[] }[],
  keys: string[]
): void => {
  const problems = perLocale.flatMap(({ locale, posts }) => {
    const available = new Set(posts.map((post) => post.translationKey));
    const missing = keys
      .filter((key) => !available.has(key))
      .map((key) => `  missing: content/blog/${locale}/${key}${MDX_EXTENSION}`);

    const counts = new Map<string, number>();
    for (const post of posts) {
      counts.set(post.slug, (counts.get(post.slug) ?? 0) + 1);
    }
    const duplicates = [...counts]
      .filter(([, count]) => count > 1)
      .map(([slug]) => `  duplicate slug "${slug}" in ${locale}`);

    return [...missing, ...duplicates];
  });

  if (problems.length === 0) return;

  throw new Error(
    `Invalid blog content. Every post must exist in all locales ` +
      `(${i18n.locales.join(", ")}) with a slug unique per locale; ` +
      `${problems.length} problem(s):\n${problems.join("\n")}`
  );
};

/**
 * Every post's slug in every locale, keyed by translation key. Feeds the
 * sitemap, the `hreflang` groups and the language switch, so all three read the
 * same source and cannot disagree.
 */
export const getPostSlugMap = async (): Promise<
  Map<string, Record<Locale, string>>
> => {
  const perLocale = await Promise.all(
    i18n.locales.map(async (locale) => ({
      locale,
      posts: await getAllPostsMeta(locale),
    }))
  );

  const keys = Array.from(
    new Set(perLocale.flatMap(({ posts }) => posts.map((p) => p.translationKey)))
  );

  if (process.env.NODE_ENV === "production") {
    assertPostsAreValid(perLocale, keys);
  }

  return new Map(
    keys.map((key) => [
      key,
      Object.fromEntries(
        perLocale.flatMap(({ locale, posts }) => {
          const post = posts.find((p) => p.translationKey === key);
          return post ? [[locale, post.slug] as const] : [];
        })
      ) as Record<Locale, string>,
    ])
  );
};
