import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

import type { MDXRemoteProps } from "next-mdx-remote/rsc";

import styles from "@/styles/components/sections/blog/blog-post.module.scss";

type MdxComponentMap = NonNullable<MDXRemoteProps["components"]>;

/**
 * A highlighted aside usable inside MDX: `<Callout>…</Callout>` or
 * `<Callout type="warning">…</Callout>`.
 */
const Callout = ({
  children,
  type = "info",
}: {
  children: ReactNode;
  type?: "info" | "warning" | "success";
}) => (
  <aside
    className={styles.callout}
    data-callout={type}
    role="note"
  >
    {children}
  </aside>
);

/**
 * Anchor override: internal links use `next/link` for client-side navigation,
 * external links open safely in a new tab.
 */
const MdxLink = ({
  href = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
};

/** Components made available to every compiled MDX post. */
export const mdxComponents: MdxComponentMap = {
  a: MdxLink,
  Callout,
};
