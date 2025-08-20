import type { Metadata } from "next";
import { Onest } from "next/font/google";

import "@/styles/theme/theme.scss";
import styles from "@/app/styles/main-layout.module.scss";
import "@/styles/layout/common-layout.scss";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gonzalo Plaza Rueda",
  description: "Portfolio de Gonzalo Plaza Rueda, desarrollador web",
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
    title: "Gonzalo Plaza Rueda - Frontend Developer",
    description: "Portfolio de Gonzalo Plaza Rueda, desarrollador web",
    url: "https://gonzaloplazarueda.com",
    siteName: "Gonzalo Plaza Rueda",
    images: [
      {
        url: "/og-image.png",
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
  console.log(styles);
  return (
    <html lang="es">
      <head>
        <meta name="apple-mobile-web-app-title" content="GonzaloPlazaRueda" />
      </head>
      <body className={`${onest.className} ${styles["main-layout"]}`}>
        {children}
      </body>
    </html>
  );
}
