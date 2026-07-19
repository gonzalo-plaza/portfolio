import styles from "@/styles/components/sections/about-me-section/about-me-section.module.scss";
import clsx from "clsx";
import Image from "next/image";
import type { Dictionary } from "@/i18n/types";

interface AboutMeSectionViewProps {
  dict: Dictionary["aboutMe"];
}

const AboutMeSectionView = ({ dict }: AboutMeSectionViewProps) => {
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
            <p
              key={paragraphIndex}
              className={styles.aboutMeArticleDescription}
            >
              {paragraph.map((segment, segmentIndex) =>
                segment.highlight ? (
                  <strong
                    key={segmentIndex}
                    className={styles.aboutMeArticleDescription__highlight}
                  >
                    {segment.text}
                  </strong>
                ) : (
                  <span key={segmentIndex}>{segment.text}</span>
                )
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

AboutMeSectionView.displayName = "AboutMeSectionView";

export default AboutMeSectionView;
