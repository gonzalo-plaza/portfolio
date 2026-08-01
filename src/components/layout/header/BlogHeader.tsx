import Link from "next/link";
import clsx from "clsx";
import { Languages } from "lucide-react";

import styles from "@/styles/components/layout/header/main-header.module.scss";
import blogStyles from "@/styles/components/layout/header/blog-header.module.scss";
import ThemeButton from "@/components/ui/molecules/ThemeButton";
import Breadcrumb, {
  type BreadcrumbItem,
} from "@/components/ui/molecules/Breadcrumb";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

interface BlogHeaderProps {
  dict: Dictionary["blog"];
  /** Location trail; the same strategy on every blog page. */
  breadcrumbItems: BreadcrumbItem[];
  /** Path to the equivalent page in the other locale (for the language switch). */
  switchHref: string;
  /** Locale the switch points to. */
  switchLocale: Locale;
  /**
   * Align the header row with the article reading column (prose width)
   * instead of the full container, so breadcrumb and content share edges.
   */
  contentAligned?: boolean;
}

/**
 * Blog page header: breadcrumb (location) on the left, the home-style action
 * pill (language + theme) on the right — one row, no dead space. The pill is
 * a plain div, not a `<nav>`: it holds preferences, not site navigation; the
 * only nav landmark here is the breadcrumb itself.
 */
const BlogHeader = ({
  dict,
  breadcrumbItems,
  switchHref,
  switchLocale,
  contentAligned,
}: BlogHeaderProps) => (
  <header className={clsx(blogStyles.blogHeader, "container")}>
    <div
      className={clsx(blogStyles.blogHeader__row, {
        [blogStyles.isContentAligned]: contentAligned,
      })}
    >
      <Breadcrumb
        className={blogStyles.blogHeader__breadcrumb}
        items={breadcrumbItems}
      />
      <div className={styles.mainNav}>
        <Link
          className={clsx(styles.mainNav__lang, blogStyles.blogHeader__item)}
          href={switchHref}
          hrefLang={switchLocale}
          aria-label={dict.switchLanguageAria}
        >
          <Languages aria-hidden />
        </Link>
        <ThemeButton
          className={clsx(styles.mainNav__button, blogStyles.blogHeader__item)}
        />
      </div>
    </div>
  </header>
);

BlogHeader.displayName = "BlogHeader";

export default BlogHeader;
