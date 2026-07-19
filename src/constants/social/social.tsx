import type { ComponentType, SVGProps } from "react";

import { GithubIcon, LinkedinIcon } from "@/components/ui/atoms/icons";

export type SocialId = "linkedin" | "github";

export interface SocialLink {
  id: SocialId;
  href: string;
  /** When true the link opens in a new tab with a safe rel. */
  external: boolean;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/**
 * Single source of truth for the social/contact links. Consumed by both the
 * footer (icon-only) and the hero contact buttons (icon + label), so the URLs
 * live in exactly one place.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/gonzalo-p-r",
    external: true,
    Icon: LinkedinIcon,
  },
  {
    id: "github",
    href: "https://github.com/gonzalo-plaza",
    external: true,
    Icon: GithubIcon,
  },
];
