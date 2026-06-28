import styles from "@/styles/components/layout/footer/footer.module.scss";
import clsx from "clsx";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/atoms/icons";

const Footer = () => {
  return (
    <footer className={clsx(styles.footer, "container")}>
      <p className={styles.footer__paragraph}>
        © 2025 Gonzalo Plaza Rueda.{" "}
        <span className={styles.footer__span}>
          Casi todos los derechos reservados
        </span>
      </p>
      <ul className={styles.footerSocialList}>
        <li className={styles.footerSocialList__item}>
          <a
            className={styles.footerSocialList__link}
            href="https://www.linkedin.com/in/gonzalo-p-r"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver el perfil de LinkedIn de Gonzalo Plaza Rueda"
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
            aria-label="Ver el perfil de GitHub de Gonzalo Plaza Rueda"
          >
            <GithubIcon width={24} height={24} />
          </a>
        </li>
        <li className={styles.footerSocialList__item}>
          <a
            className={styles.footerSocialList__link}
            href="mailto:plazaruedag@gmail.com"
            aria-label="Enviar un mail a Gonzalo Plaza Rueda"
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
