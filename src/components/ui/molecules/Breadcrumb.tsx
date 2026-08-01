import Link from "next/link";
import clsx from "clsx";

import styles from "@/styles/components/ui/molecules/breadcrumb.module.scss";

export interface BreadcrumbItem {
  label: string;
  /** Absent on the last item (the current page). */
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Location trail (`Home › Blog › …`). The same component is used on every
 * blog page (index and posts) so the "where am I / how do I go back" strategy
 * stays consistent across the whole surface.
 */
const Breadcrumb = ({ items, className }: BreadcrumbProps) => (
  <nav aria-label="breadcrumb" className={clsx(styles.breadcrumb, className)}>
    <ol className={styles.breadcrumb__list}>
      {items.map((item) =>
        item.href ? (
          <li key={item.label}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ) : (
          <li
            key={item.label}
            className={styles.breadcrumb__current}
            aria-current="page"
          >
            {item.label}
          </li>
        )
      )}
    </ol>
  </nav>
);

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;
