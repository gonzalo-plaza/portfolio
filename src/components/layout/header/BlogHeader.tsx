import Image from "next/image";
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

const SITE_AUTHOR = "Gonzalo Plaza Rueda";
const SITE_AUTHOR_ROLE = "Software Engineer";
const SITE_AUTHOR_PHOTO = "/images/gonzalo-plaza-rueda-avatar.webp";

interface BlogHeaderProps {
  dict: Dictionary["blog"];
  breadcrumbItems: BreadcrumbItem[];
  homeHref: string;
  switchHref: string;
  switchLocale: Locale;
  /** Narrows the header to the prose column so it shares edges with the article. */
  contentAligned?: boolean;
}

/** The breadcrumb sits outside the sticky band on purpose: it only matters on
 *  arrival, so it scrolls away instead of spending viewport for the whole read. */
const BlogHeader = ({
  dict,
  breadcrumbItems,
  homeHref,
  switchHref,
  switchLocale,
  contentAligned,
}: BlogHeaderProps) => (
  <>
    <header className={clsx(blogStyles.blogHeader, "container")}>
      <div
        className={clsx(blogStyles.blogHeader__inner, {
          [blogStyles.isContentAligned]: contentAligned,
        })}
      >
        <Link className={blogStyles.blogHeader__brand} href={homeHref}>
          {/* Empty alt on purpose: the adjacent name already labels the link.
              76 is the ceiling for the CSS in blog-header.module.scss. */}
          <Image
            className={blogStyles.blogHeader__avatar}
            src={SITE_AUTHOR_PHOTO}
            width={76}
            height={76}
            alt=""
            priority
            quality={100}
          />
          <span className={blogStyles.blogHeader__identity}>
            <span className={blogStyles.blogHeader__name}>{SITE_AUTHOR}</span>
            <span className={blogStyles.blogHeader__role}>
              {SITE_AUTHOR_ROLE}
            </span>
          </span>
        </Link>
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
            className={clsx(
              styles.mainNav__button,
              blogStyles.blogHeader__item,
            )}
          />
        </div>
      </div>
    </header>

    <div className={clsx(blogStyles.blogLocation, "container")}>
      <div
        className={clsx(blogStyles.blogLocation__inner, {
          [blogStyles.isContentAligned]: contentAligned,
        })}
      >
        <Breadcrumb items={breadcrumbItems} />
      </div>
    </div>
  </>
);

BlogHeader.displayName = "BlogHeader";

export default BlogHeader;
