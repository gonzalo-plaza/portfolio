import "server-only";

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { cache } from "react";

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

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const relativeToRoot = (filePath: string): string =>
  path.relative(process.cwd(), filePath);

/**
 * `gray-matter` returns whatever YAML produced, so the frontmatter is unknown
 * until checked. Validating here rather than casting is what turns a malformed
 * post into a message naming the file, instead of a `localeCompare is not a
 * function` thrown from a sort three calls away.
 */
const toFrontmatter = (
  data: Record<string, unknown>,
  filePath: string
): BlogPostFrontmatter => {
  const problems: string[] = [];

  const stringField = (field: string, required: boolean): void => {
    const value = data[field];

    if (value === undefined) {
      if (required) problems.push(`missing "${field}"`);
      return;
    }

    // `date: 2026-07-19` without quotes is parsed by YAML as a Date, and every
    // consumer downstream expects the ISO string it was written as.
    if (value instanceof Date) {
      const asIso = value.toISOString().slice(0, 10);
      problems.push(`"${field}" is an unquoted date — write it as "${asIso}"`);
      return;
    }

    if (typeof value !== "string" || value.trim() === "") {
      problems.push(`"${field}" must be a non-empty string`);
      return;
    }

    if ((field === "date" || field === "updated") && !ISO_DATE.test(value)) {
      problems.push(`"${field}" must be YYYY-MM-DD, got "${value}"`);
    }
  };

  stringField("title", true);
  stringField("description", true);
  stringField("date", true);
  stringField("updated", false);
  stringField("author", false);
  stringField("coverImage", false);
  stringField("coverImageAlt", false);
  stringField("slug", false);

  const { tags } = data;
  if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== "string")) {
    problems.push(`"tags" must be an array of strings`);
  }

  if (problems.length > 0) {
    throw new Error(
      `Invalid frontmatter in ${relativeToRoot(filePath)}:\n` +
        problems.map((problem) => `  ${problem}`).join("\n")
    );
  }

  return data as unknown as BlogPostFrontmatter;
};

/**
 * Reads and parses a single post from disk by its translation key. Returns
 * `null` when the file does not exist for the given locale.
 *
 * `cache()` deduplicates within a render pass, which is what keeps a page from
 * paying for the same file twice: `generateMetadata` and the page body each
 * walk the whole locale, and `getPostBySlug` re-reads the file it just found.
 */
const readPost = cache(async (
  locale: Locale,
  translationKey: string
): Promise<{ meta: BlogPostMeta; content: string } | null> => {
  const filePath = path.join(
    localeDir(locale),
    `${translationKey}${MDX_EXTENSION}`
  );

  // Scoped to the read alone: a post absent for this locale is a legitimate
  // `null`, but a post that exists and is malformed must not be swallowed into
  // one — that is how a broken file silently disappears from the listing.
  let raw: string;
  try {
    raw = await readFile(filePath, "utf8");
  } catch {
    return null;
  }

  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(raw);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Unparseable frontmatter in ${relativeToRoot(filePath)}: ${detail}`
    );
  }

  const frontmatter = toFrontmatter(parsed.data, filePath);

  return {
    meta: {
      ...frontmatter,
      slug: frontmatter.slug ?? translationKey,
      translationKey,
      locale,
      readingTimeMinutes: toReadingMinutes(parsed.content),
    },
    content: parsed.content,
  };
});

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
 * All post metadata for a locale, newest first. Only the locale's own files are
 * skipped when absent; a malformed one throws, naming itself.
 */
export const getAllPostsMeta = cache(async (
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
});

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
export const getPostSlugMap = cache(async (): Promise<
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
});
