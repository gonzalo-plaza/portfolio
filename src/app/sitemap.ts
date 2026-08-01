import type { MetadataRoute } from "next";
import { SITE_URL, i18n } from "@/i18n/config";
import { getAllSlugs } from "@/blog/blogPosts";
import { blogIndexPath, blogPostPath } from "@/blog/blogPaths";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const homeLanguages = {
    es: SITE_URL,
    en: `${SITE_URL}/en`,
  };

  const home: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: homeLanguages },
    },
  ];

  const blogIndexLanguages = {
    es: `${SITE_URL}${blogIndexPath("es")}`,
    en: `${SITE_URL}${blogIndexPath("en")}`,
  };

  const blogIndex: MetadataRoute.Sitemap = i18n.locales.map((locale) => ({
    url: `${SITE_URL}${blogIndexPath(locale)}`,
    lastModified,
    changeFrequency: "weekly",
    priority: locale === i18n.defaultLocale ? 0.8 : 0.7,
    alternates: { languages: blogIndexLanguages },
  }));

  const slugs = await getAllSlugs();
  const posts: MetadataRoute.Sitemap = slugs.flatMap((slug) => {
    const languages = {
      es: `${SITE_URL}${blogPostPath("es", slug)}`,
      en: `${SITE_URL}${blogPostPath("en", slug)}`,
    };

    return i18n.locales.map((locale) => ({
      url: `${SITE_URL}${blogPostPath(locale, slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages },
    }));
  });

  return [...home, ...blogIndex, ...posts];
}
