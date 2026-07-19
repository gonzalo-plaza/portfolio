import styles from "@/styles/components/layout/footer/footer.module.scss";
import clsx from "clsx";
import { SOCIAL_LINKS, type SocialId } from "@/constants/social/social";
import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/interpolate";

interface FooterProps {
  dict: Dictionary["footer"];
}

const SOCIAL_ARIA_KEYS: Record<SocialId, keyof Dictionary["footer"]> = {
  linkedin: "linkedinAria",
  github: "githubAria",
};

const Footer = ({ dict }: FooterProps) => {
  const copyright = interpolate(dict.copyright, {
    year: new Date().getFullYear(),
  });

  return (
    <footer className={clsx(styles.footer, "container")}>
      <p className={styles.footer__paragraph}>
        {copyright}{" "}
        <span className={styles.footer__span}>{dict.rights}</span>
      </p>
      <ul className={styles.footerSocialList}>
        {SOCIAL_LINKS.map(({ id, href, external, Icon }) => (
          <li key={id} className={styles.footerSocialList__item}>
            <a
              className={styles.footerSocialList__link}
              href={href}
              aria-label={dict[SOCIAL_ARIA_KEYS[id]]}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <Icon width={24} height={24} />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
