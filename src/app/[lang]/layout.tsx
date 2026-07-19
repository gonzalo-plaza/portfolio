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
    title: dict.metadata.title,
    description: dict.metadata.description,
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
          url: "https://www.gonzaloplazarueda.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: dict.metadata.ogImageAlt,
        },
        {
          url: "https://www.gonzaloplazarueda.com/og-image-whatsapp.jpg",
          width: 1200,
          height: 1200,
          alt: dict.metadata.ogImageAlt,
        },
      ],
      locale: dict.metadata.ogLocale,
      type: "website",
    },
  };
}

export default async function RootLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);

  return (
    <html lang={locale} className="custom-scrollbar">
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
