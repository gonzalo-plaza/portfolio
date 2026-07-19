import styles from "@/styles/components/layout/footer/footer.module.scss";
import clsx from "clsx";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/atoms/icons";
import type { Dictionary } from "@/i18n/types";

interface FooterProps {
  dict: Dictionary["footer"];
}

const Footer = ({ dict }: FooterProps) => {
  const copyright = dict.copyright.replace(
    "{year}",
    String(new Date().getFullYear())
  );

  return (
    <footer className={clsx(styles.footer, "container")}>
      <p className={styles.footer__paragraph}>
        {copyright}{" "}
        <span className={styles.footer__span}>{dict.rights}</span>
      </p>
      <ul className={styles.footerSocialList}>
        <li className={styles.footerSocialList__item}>
          <a
            className={styles.footerSocialList__link}
            href="https://www.linkedin.com/in/gonzalo-p-r"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.linkedinAria}
          >
            <LinkedinIcon width={24} height={24} />
          </a>
        </li>
        <li className={styles.footerSocialList__item}>
          <a
            className={styles.footerSocialList__link}
            href="https://github.com/gonzalo-plaza"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.githubAria}
          >
            <GithubIcon width={24} height={24} />
          </a>
        </li>
        <li className={styles.footerSocialList__item}>
          <a
            className={styles.footerSocialList__link}
            href="mailto:plazaruedag@gmail.com"
            aria-label={dict.mailAria}
          >
            <Mail />
          </a>
        </li>
      </ul>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
