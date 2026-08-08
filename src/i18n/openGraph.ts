import type { Metadata } from "next";
import type { Dictionary } from "@/i18n/types";

const SITE_NAME = "Gonzalo Plaza Rueda";

/**
 * Open Graph fields every page needs but no page inherits: Next replaces the
 * `openGraph` object wholesale per segment instead of merging it, so a page
 * declaring its own drops the root layout's image, site name and locale.
 */
export const sharedOpenGraph = (
  dict: Dictionary
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
  ],
});
