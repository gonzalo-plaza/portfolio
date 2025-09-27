import type { Metadata } from "next";
import { Onest } from "next/font/google";

import "@/styles/theme/theme.scss";
import "@/styles/reset.scss";
import "@/styles/typography/default-typography.scss";
import styles from "@/styles/components/main-layout/main-layout.module.scss";
import "@/styles/layout/common-layout.scss";
import MainHeader from "@/components/header/MainHeader";
import { ThemeStoreProvider } from "@/providers/theme-store-provider";
import UpdateThemeUtil from "@/utils/UpdateThemeUtil";
import Footer from "@/components/footer/Footer";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gonzalo Plaza Rueda | Software Engineer",
  description: "Portfolio de Gonzalo Plaza Rueda, Software Engineer",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Gonzalo Plaza Rueda",
    capable: true,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Gonzalo Plaza Rueda - Software Engineer",
    description: "Portfolio de Gonzalo Plaza Rueda, Software Engineer",
    url: "https://gonzaloplazarueda.com",
    siteName: "Gonzalo Plaza Rueda",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gonzalo Plaza Rueda - Frontend Developer",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="custom-scrollbar">
      <head>
        <meta name="apple-mobile-web-app-title" content="GonzaloPlazaRueda" />
      </head>
      <ThemeStoreProvider>
        <UpdateThemeUtil>
          <body className={`${onest.className} ${styles["main-layout"]}`}>
            <MainHeader />
            {children}
            <Footer />
          </body>
        </UpdateThemeUtil>
      </ThemeStoreProvider>
    </html>
  );
}
