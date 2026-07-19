import type { Metadata } from "next";
import { Onest } from "next/font/google";

import "@/styles/global.scss";
import styles from "@/styles/components/layout/main-layout/main-layout.module.scss";
import { ThemeStoreProvider } from "@/providers/theme-store-provider";
import UpdateThemeUtil from "@/utils/UpdateThemeUtil";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, getLocalePath, i18n, isLocale, type Locale } from "@/i18n/config";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  preload: true,
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

const resolveLocale = (lang: string): Locale =>
  isLocale(lang) ? lang : i18n.defaultLocale;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gonzalo Plaza Rueda",
  url: SITE_URL,
  image: `${SITE_URL}/images/gonzalo_plaza_rueda_software_engineer.webp`,
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "LeoVegas",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Málaga",
    addressCountry: "ES",
  },
  knowsLanguage: ["es", "en"],
  knowsAbout: [
    "Frontend Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Sass",
    "Web Performance",
    "Ecommerce",
  ],
  sameAs: [
    "https://www.linkedin.com/in/gonzalo-p-r",
    "https://github.com/gonzalo-plaza",
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.metadata.title,
      template: "%s | Gonzalo Plaza Rueda",
    },
    description: dict.metadata.description,
    keywords: [
      "Software Engineer",
      "Frontend Developer",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Sass",
      "Málaga",
      "ecommerce",
      "Gonzalo Plaza Rueda",
    ],
    authors: [{ name: "Gonzalo Plaza Rueda", url: SITE_URL }],
    creator: "Gonzalo Plaza Rueda",
    alternates: {
      canonical: getLocalePath(locale),
      languages: {
        es: getLocalePath("es"),
        en: getLocalePath("en"),
        "x-default": getLocalePath(i18n.defaultLocale),
      },
    },
    icons: {
      icon: [
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
    },
    openGraph: {
      title: dict.metadata.ogTitle,
      description: dict.metadata.ogDescription,
      url: getLocalePath(locale),
      siteName: "Gonzalo Plaza Rueda",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: dict.metadata.ogImageAlt,
        },
        {
          url: "/og-image-whatsapp.jpg",
          width: 1200,
          height: 1200,
          alt: dict.metadata.ogImageAlt,
        },
      ],
      locale: dict.metadata.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.ogTitle,
      description: dict.metadata.ogDescription,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function RootLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);

  return (
    <html lang={locale} className="custom-scrollbar">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <ThemeStoreProvider>
        <UpdateThemeUtil>
          <body className={`${onest.className} ${styles["main-layout"]}`}>
            {children}
          </body>
        </UpdateThemeUtil>
      </ThemeStoreProvider>
    </html>
  );
}
