import type { Metadata } from "next";
import type { Dictionary } from "@/i18n/types";

const SITE_NAME = "Gonzalo Plaza Rueda";

interface OgImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

/** Square variant WhatsApp crops to. Only the site root advertises it. */
export const whatsappOgImage = (dict: Dictionary): OgImage => ({
  url: "/og-image-whatsapp.jpg",
  width: 450,
  height: 450,
  alt: dict.metadata.ogImageAlt,
});

/**
 * Open Graph fields every page needs but no page inherits: Next replaces the
 * `openGraph` object wholesale per segment instead of merging it, so a page
 * declaring its own drops the root layout's image, site name and locale.
 */
export const sharedOpenGraph = (
  dict: Dictionary,
  extraImages: OgImage[] = []
): Pick<
  NonNullable<Metadata["openGraph"]>,
  "siteName" | "locale" | "images"
> => ({
  siteName: SITE_NAME,
  locale: dict.metadata.ogLocale,
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: dict.metadata.ogImageAlt,
    },
    ...extraImages,
  ],
});
