import styles from "@/styles/components/layout/header/main-header.module.scss";

import Link from "next/link";
import ThemeButton from "@/components/ui/molecules/ThemeButton";
import HeaderNav from "./HeaderNav";
import type { Dictionary } from "@/i18n/types";
import { getLocalePath, i18n, type Locale } from "@/i18n/config";

interface MainHeaderProps {
  dict: Dictionary["header"];
  locale: Locale;
}

const MainHeader = ({ dict, locale }: MainHeaderProps) => {
  const targetLocale =
    i18n.locales.find((candidate) => candidate !== locale) ??
    i18n.defaultLocale;

  return (
    <header className={styles.mainHeader}>
      <nav className={styles.mainNav} aria-label={dict.navLabel}>
        <HeaderNav dict={dict} />
        <Link
          className={styles.mainNav__lang}
          href={getLocalePath(targetLocale)}
          hrefLang={targetLocale}
          aria-label={dict.switchLanguageAria}
        >
          {dict.switchLanguageLabel}
        </Link>
        <ThemeButton className={styles.mainNav__button} />
      </nav>
    </header>
  );
};

MainHeader.displayName = "MainHeader";

export default MainHeader;
