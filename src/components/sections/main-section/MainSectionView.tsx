import Image from "next/image";

import TitleAnimation from "@/components/sections/main-section/_components/TitleAnimation";
import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/interpolate";
import {
  DEV_CAREER_START,
  getYearsOfExperience,
} from "@/utils/dateUtils/dateUtils";

import styles from "@/styles/components/sections/main-section/main-section-view.module.scss";

interface MainSectionViewProps {
  dict: Dictionary["main"];
}

export default function MainSectionView({ dict }: MainSectionViewProps) {
  const description = interpolate(dict.description, {
    devYears: getYearsOfExperience(DEV_CAREER_START),
  });

  return (
    <section className={`${styles.mainSection} container`}>
      <div>
        <Image
          className={styles.mainSectionImage}
          src="/images/gonzalo_plaza_rueda_software_engineer.webp"
          width={250}
          height={250}
          alt={dict.imageAlt}
          priority
          quality={100}
          fetchPriority="high"
        />
      </div>
      <div className={styles.mainSectionDescription}>
        <TitleAnimation />
        <h1 className={styles.mainSectionDescription__title}>
          {dict.greeting}{" "}
          <span
            className={`${styles.mainSectionDescription__title} ${styles.isHighlight} js-mainSectionDescription__titleAnimation`}
            data-text="Gonzalo Plaza Rueda"
          >
            Gonzalo Plaza Rueda
          </span>{" "}
          <span
            className={`${styles.mainSectionDescription__title} ${styles.isDetail}`}
          >
            {dict.role}
          </span>
        </h1>
        <p className={styles.mainSectionDescription__text}>{description}</p>
      </div>
    </section>
  );
}
