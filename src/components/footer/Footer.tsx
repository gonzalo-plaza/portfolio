import styles from "@/styles/components/footer/footer.module.scss";
import clsx from "clsx";
import GithubIcon from "../icons/GithubIcon";
import { Mail } from "lucide-react";
import LinkedinIcon from "../icons/LinkedinIcon";

const Footer = () => {
  return (
    <footer className={clsx(styles.footer, "container")}>
      <p className={styles.footer__paragraph}>
        © 2025 Gonzalo Plaza Rueda. Casi todos los derechos reservados
      </p>
      <ul className={styles.footerSocialList}>
        <li className={styles.footerSocialList__item}>
          <a
            className={styles.footerSocialList__link}
            href="https://twitter.com/usuario"
          >
            <LinkedinIcon width={24} height={24} />
          </a>
        </li>
        <li className={styles.footerSocialList__item}>
          <a
            className={styles.footerSocialList__link}
            href="https://linkedin.com/in/usuario"
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
