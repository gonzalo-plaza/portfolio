import styles from "@/styles/components/sections/work-experience-section/_components/work-experience-list.module.scss";
import Image from "next/image";
import WorkExperienceActiveAnimation from "./WorkExperieceActiveAnimation";
import { workExperiences } from "@/constants/workExperience/workExperience";
import WorkExperienceTechnologyList from "./WorkExperienceTechnologyList";
import WorkExperienceDateTime from "./WorkExperienceDateTime";
import Button from "@/components/ui/atoms/Button";
import type { Dictionary } from "@/i18n/types";

interface WorkExperienceListProps {
  dict: Dictionary["workExperience"];
}

export default function WorkExperienceList({ dict }: WorkExperienceListProps) {
  return (
    <>
      <WorkExperienceActiveAnimation itemActiveClass={styles.isListItemActive} />
      <div className={styles.workExperienceSkip}>
        <Button asChild screenReader>
          <a href="#skip-work-experience">{dict.skip}</a>
        </Button>
      </div>
      <ul className={styles.workExperienceList} aria-label={dict.listAria}>
        {workExperiences.map((experience, index) => {
          const content = dict.items[experience.key];
          return (
            <li
              key={index}
              data-index={index}
              className={`${styles.workExperienceListItem} js-work-experience-item`}
            >
              <article className={`${styles.workExperienceArticle}`}>
                <Image
                  src={experience.logoUrl}
                  alt={dict.logoAlt.replace("{company}", experience.title)}
                  className={styles.workExperienceArticle__headerImage}
                  width={150}
                  height={150}
                  sizes="(max-width: 640px) 100px, 150px"
                />
                <header className={styles.workExperienceArticle__header}>
                  <hgroup>
                    <h3 className={styles.workExperienceArticle__title}>
                      {experience.title}
                    </h3>
                    <p className={styles.workExperienceArticle__subtitle}>
                      {content?.subtitle}
                    </p>
                  </hgroup>
                  <WorkExperienceDateTime
                    startTime={experience.startTime}
                    endTime={experience.endTime}
                    currentLabel={dict.current}
                    durationLabels={dict.duration}
                  />
                  {experience.technologyList &&
                    experience?.technologyList?.length > 0 && (
                      <WorkExperienceTechnologyList
                        technologyList={experience.technologyList}
                        ariaLabel={dict.technologiesAria}
                      />
                    )}
                </header>
                <p className={styles.workExperienceArticle__description}>
                  {content?.description}
                </p>
              </article>
              <hr
                className={`${styles.workExperienceListItem__separator} ${styles.workExperienceListItem__separatorActive}`}
              />
            </li>
          );
        })}
      </ul>
      <div className={styles.workExperienceSkip}>
        <span id="skip-work-experience" className="visibly-hidden" tabIndex={-1}>
          {dict.skipEnd}
        </span>
      </div>
    </>
  );
}
