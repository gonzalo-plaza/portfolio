import type { Metadata } from "next";
import { Onest } from "next/font/google";

import "@/styles/global.scss";
import styles from "@/styles/components/layout/main-layout/main-layout.module.scss";
import { ThemeStoreProvider } from "@/providers/theme-store-provider";
import UpdateThemeUtil from "@/utils/UpdateThemeUtil";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  preload: true,
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://gonzaloplazarueda.com";
const OG_DESCRIPTION =
  "Software Engineer especializado en desarrollo frontend (React, Next.js, TypeScript) en Málaga, España. Creo aplicaciones web y ecommerce rápidas, accesibles y escalables.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gonzalo Plaza Rueda | Software Engineer",
    template: "%s | Gonzalo Plaza Rueda",
  },
  description: OG_DESCRIPTION,
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
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Gonzalo Plaza Rueda - Software Engineer",
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: "Gonzalo Plaza Rueda",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gonzalo Plaza Rueda - Software Engineer",
      },
      {
        url: "/og-image-whatsapp.jpg",
        width: 1200,
        height: 1200,
        alt: "Gonzalo Plaza Rueda - Software Engineer",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gonzalo Plaza Rueda - Software Engineer",
    description: OG_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="custom-scrollbar">
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
    </html>);
}
