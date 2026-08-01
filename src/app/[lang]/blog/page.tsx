import type { Metadata } from "next";

import styles from "@/styles/components/sections/blog/blog-index.module.scss";
import BlogHeader from "@/components/layout/header/BlogHeader";
import Footer from "@/components/layout/footer/Footer";
import PostCard from "@/components/ui/organism/PostCard";
import { getAllPostsMeta } from "@/blog/blogPosts";
import { blogIndexPath } from "@/blog/blogPaths";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocalePath, i18n, isLocale, type Locale } from "@/i18n/config";

const resolveLocale = (lang: string): Locale =>
  isLocale(lang) ? lang : i18n.defaultLocale;

const otherLocale = (locale: Locale): Locale =>
  i18n.locales.find((candidate) => candidate !== locale) ?? i18n.defaultLocale;

interface BlogIndexProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: BlogIndexProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const path = blogIndexPath(locale);

  return {
    title: dict.blog.metaTitle,
    description: dict.blog.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        es: blogIndexPath("es"),
        en: blogIndexPath("en"),
        "x-default": blogIndexPath(i18n.defaultLocale),
      },
    },
    openGraph: {
      title: dict.blog.metaTitle,
      description: dict.blog.metaDescription,
      url: path,
      type: "website",
    },
  };
}

export default async function BlogIndex({ params }: BlogIndexProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const posts = await getAllPostsMeta(locale);
  const switchLocale = otherLocale(locale);

  return (
    <>
      <BlogHeader
        dict={dict.blog}
        breadcrumbItems={[
          { label: dict.blog.breadcrumbHome, href: getLocalePath(locale) },
          { label: dict.blog.breadcrumbBlog },
        ]}
        switchHref={blogIndexPath(switchLocale)}
        switchLocale={switchLocale}
      />
      <main className={`${styles.blogIndex} container`}>
        <header className={styles.blogIndex__header}>
          <h1 className={styles.blogIndex__title}>{dict.blog.indexTitle}</h1>
          <p className={styles.blogIndex__intro}>{dict.blog.indexIntro}</p>
        </header>

        {posts.length === 0 ? (
          <p className={styles.blogIndex__empty}>{dict.blog.emptyState}</p>
        ) : (
          <ul className={styles.blogIndex__list}>
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} dict={dict.blog} />
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
