import type { Locale } from "@/i18n/config";

/**
 * Frontmatter contract every `.mdx` post must declare at the top of the file.
 * `date`/`updated` are ISO strings (YYYY-MM-DD) so they serialize cleanly and
 * feed both the visible `<time>` and the `datePublished`/`dateModified` in the
 * BlogPosting JSON-LD.
 */
export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  author?: string;
  coverImage?: string;
  coverImageAlt?: string;
  /** Public URL segment for this translation. Defaults to the filename. */
  slug?: string;
}

/**
 * Post metadata (frontmatter + derived fields) without the MDX body. Used by
 * the index listing, cards and the sitemap.
 */
export interface BlogPostMeta extends BlogPostFrontmatter {
  /** URL segment for this locale. */
  slug: string;
  /** Filename, shared by every translation — what links them together. */
  translationKey: string;
  locale: Locale;
  readingTimeMinutes: number;
}

/**
 * A full post: metadata plus the raw MDX body to compile.
 */
export interface BlogPost extends BlogPostMeta {
  content: string;
}
