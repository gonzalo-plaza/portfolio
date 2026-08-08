import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

import styles from "@/styles/components/sections/blog/blog-post.module.scss";
import BlogHeader from "@/components/layout/header/BlogHeader";
import Footer from "@/components/layout/footer/Footer";
import Badge from "@/components/ui/atoms/Badge";
import Button from "@/components/ui/atoms/Button";
import { mdxComponents } from "@/blog/mdxComponents";
import {
  getPostBySlug,
  getPostSlugMap,
  getSlugsForLocale,
} from "@/blog/blogPosts";
import { blogIndexPath, blogPostPath } from "@/blog/blogPaths";
import { getDictionary } from "@/i18n/dictionaries";
import { sharedOpenGraph } from "@/i18n/openGraph";
import { interpolate } from "@/i18n/interpolate";
import { formatBlogDate, toIsoTimestamp } from "@/utils/dateUtils/dateUtils";
import {
  SITE_URL,
  getLocalePath,
  i18n,
  isLocale,
  type Locale,
} from "@/i18n/config";

const DEFAULT_AUTHOR = "Gonzalo Plaza Rueda";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

export const dynamicParams = false;

const resolveLocale = (lang: string): Locale =>
  isLocale(lang) ? lang : i18n.defaultLocale;

const otherLocale = (locale: Locale): Locale =>
  i18n.locales.find((candidate) => candidate !== locale) ?? i18n.defaultLocale;

// Runs once per locale the parent produced, so each language contributes its
// own slugs. Slugs differ per locale, hence the parent `params` are required.
export async function generateStaticParams({
  params,
}: {
  params: { lang: string };
}) {
  const slugs = await getSlugsForLocale(resolveLocale(params.lang));
  return slugs.map((slug) => ({ slug }));
}

interface BlogPostPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

// Shared MDX pipeline: GFM syntax, heading ids (deep links / future ToC) and
// Shiki-highlighted code. Headings are intentionally NOT self-links.
const mdxOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: true }],
    ],
  },
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const post = await getPostBySlug(locale, slug);

  if (!post) return {};

  const dict = await getDictionary(locale);
  const path = blogPostPath(locale, slug);
  const image = post.coverImage ?? DEFAULT_OG_IMAGE;
  const slugs = (await getPostSlugMap()).get(post.translationKey);

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author ?? DEFAULT_AUTHOR, url: SITE_URL }],
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((other) => [
            other,
            blogPostPath(other, slugs?.[other] ?? slug),
          ])
        ),
        "x-default": blogPostPath(
          i18n.defaultLocale,
          slugs?.[i18n.defaultLocale] ?? slug
        ),
      },
    },
    openGraph: {
      ...sharedOpenGraph(dict),
      title: post.title,
      description: post.description,
      url: path,
      type: "article",
      publishedTime: toIsoTimestamp(post.date),
      modifiedTime: toIsoTimestamp(post.updated ?? post.date),
      authors: [post.author ?? DEFAULT_AUTHOR],
      tags: post.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt ?? post.title,
        },
      ],
    },
    // Title, description and image fall back to the Open Graph tags above.
    twitter: { card: "summary_large_image" },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const post = await getPostBySlug(locale, slug);

  if (!post) notFound();

  const dict = await getDictionary(locale);
  const switchLocale = otherLocale(locale);
  const switchSlug =
    (await getPostSlugMap()).get(post.translationKey)?.[switchLocale] ?? slug;
  const path = blogPostPath(locale, slug);
  const author = post.author ?? DEFAULT_AUTHOR;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: toIsoTimestamp(post.date),
    dateModified: toIsoTimestamp(post.updated ?? post.date),
    inLanguage: locale,
    keywords: post.tags.join(", "),
    image: `${SITE_URL}${post.coverImage ?? DEFAULT_OG_IMAGE}`,
    author: { "@type": "Person", name: author, url: SITE_URL },
    publisher: { "@type": "Person", name: DEFAULT_AUTHOR, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.blog.breadcrumbHome,
        item: `${SITE_URL}${getLocalePath(locale)}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dict.blog.breadcrumbBlog,
        item: `${SITE_URL}${blogIndexPath(locale)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}${path}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogPostingSchema, breadcrumbSchema]),
        }}
      />
      <BlogHeader
        dict={dict.blog}
        breadcrumbItems={[
          { label: dict.blog.breadcrumbHome, href: getLocalePath(locale) },
          { label: dict.blog.breadcrumbBlog, href: blogIndexPath(locale) },
          { label: post.title },
        ]}
        homeHref={getLocalePath(locale)}
        switchHref={blogPostPath(switchLocale, switchSlug)}
        switchLocale={switchLocale}
        contentAligned
      />
      <main className="container">
        <article className={styles.blogPost}>
          <header className={styles.blogPost__header}>
            <ul className={styles.blogPost__tags} aria-label={dict.blog.tagsLabel}>
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="secondary" className={styles.blogPost__tag}>
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>

            <h1 className={styles.blogPost__title}>{post.title}</h1>
            <p className={styles.blogPost__lead}>{post.description}</p>

            <div className={styles.blogPost__meta}>
              <time dateTime={post.date}>
                {formatBlogDate(post.date, locale)}
              </time>
              <span aria-hidden>·</span>
              <span>
                {interpolate(dict.blog.readingTime, {
                  minutes: post.readingTimeMinutes,
                })}
              </span>
            </div>
          </header>

          <div className={styles.prose}>
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={mdxOptions}
            />
          </div>

          <footer className={styles.blogPost__footer}>
            <Button asChild className={styles.blogPost__back}>
              <Link href={blogIndexPath(locale)}>
                <ArrowLeft aria-hidden size={16} /> {dict.blog.backToBlog}
              </Link>
            </Button>
          </footer>
        </article>
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
