import styles from "@/styles/components/work-experience-section/_components/work-experience-list.module.scss";
import Image from "next/image";
import WorkExperienceActiveAnimation from "./WorkExperieceActiveAnimation";
import { workExperiences } from "@/constants/workExperience/workExperience";
import WorkExperienceTechnologyList from "./WorkExperienceTechnologyList";
import WorkExperienceDateTime from "./WorkExperienceDateTime";
import Button from "@/components/ui/atoms/Button";

export default function WorkExperienceList() {
  return (
    <>
      <WorkExperienceActiveAnimation
        itemActiveClass={styles.isListItemActive}
      />
      <div className={styles.workExperienceSkip}>
        <Button asChild screenReader>
          <a href="#skip-work-experience">Saltar experiencia laboral</a>
        </Button>
      </div>
      <ul className={styles.workExperienceList} aria-label="Experiencia laboral">
        {workExperiences.map((experience, index) => (
          <li
            key={index}
            data-index={index}
            className={`${styles.workExperienceListItem} js-work-experience-item`}
          >
            <article className={`${styles.workExperienceArticle}`}>
              <Image
                src={experience.logoUrl}
                alt={`Logo de ${experience.title}`}
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
                    {experience.subtitle}
                  </p>
                </hgroup>
                <WorkExperienceDateTime
                  startTime={experience.startTime}
                  endTime={experience.endTime}
                />
                {experience.technologyList &&
                  experience?.technologyList?.length > 0 && (
                    <WorkExperienceTechnologyList
                      technologyList={experience.technologyList}
                    />
                  )}
              </header>
              <p className={styles.workExperienceArticle__description}>
                {experience.description}
              </p>
            </article>
            <hr
              className={`${styles.workExperienceListItem__separator} ${styles.workExperienceListItem__separatorActive}`}
            />
          </li>
        ))}
      </ul>
      <div className={styles.workExperienceSkip}>
        <span id="skip-work-experience" className="visibly-hidden" tabIndex={-1}>
          Fin de la experiencia laboral
        </span>
      </div>
    </>
  );
}
