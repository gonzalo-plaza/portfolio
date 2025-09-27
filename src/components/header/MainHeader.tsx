import styles from "@/styles/components/header/main-header.module.scss";

import Link from "next/link";
import ThemeButton from "../molecules/themeButton";

const MainHeader = () => {
  return (
    <header className={styles.mainHeader}>
      <nav className={styles.mainNav}>
        <Link className={styles.mainNav__link} href="#work-experience">
          Experiencia
        </Link>
        <Link className={styles.mainNav__link} href="#projects">
          Projectos
        </Link>
        <Link className={styles.mainNav__link} href="#about-me">
          Sobre mí
        </Link>
        <ThemeButton className={styles.mainNav__button} />
      </nav>
    </header>
  );
};

MainHeader.displayName = "MainHeader";

export default MainHeader;
