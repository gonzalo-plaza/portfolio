import styles from "@/styles/components/sections/about-me-section/about-me-section.module.scss";
import clsx from "clsx";
import Image from "next/image";
import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/interpolate";
import {
  DEV_CAREER_START,
  TECH_CAREER_START,
  getYearsOfExperience,
} from "@/utils/dateUtils/dateUtils";

interface AboutMeSectionViewProps {
  dict: Dictionary["aboutMe"];
}

const AboutMeSectionView = ({ dict }: AboutMeSectionViewProps) => {
  const years = {
    devYears: getYearsOfExperience(DEV_CAREER_START),
    techYears: getYearsOfExperience(TECH_CAREER_START),
  };

  return (
    <section
      id="about-me"
      className={clsx(styles.aboutMeSectionView, "container")}
    >
      <header>
        <h2 className={styles.aboutMeSectionView__title}>{dict.title}</h2>
      </header>
      <div className={styles.aboutMeArticle}>
        <Image
          src="/images/gonzalo-plaza--rueda-developer.webp"
          className={styles.aboutMeArticle__image}
          height={300}
          width={300}
          alt={dict.imageAlt}
        />
        <div>
          {dict.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} className={styles.aboutMeArticleDescription}>
              {paragraph.map((segment, segmentIndex) => {
                const text = interpolate(segment.text, years);
                return segment.highlight ? (
                  <strong
                    key={segmentIndex}
                    className={styles.aboutMeArticleDescription__highlight}
                  >
                    {text}
                  </strong>
                ) : (
                  <span key={segmentIndex}>{text}</span>
                );
              })}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

AboutMeSectionView.displayName = "AboutMeSectionView";

export default AboutMeSectionView;
