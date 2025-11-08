import styles from "@/styles/components/work-experience-section/work-experience-section-view.module.scss";
import WorkExperienceList from "./_components/WorkExperienceList";
import clsx from "clsx";

export default function WorkExperienceSectionView() {
  return (
    <section
      id="work-experience"
      className={clsx("container", styles.workExperienceSection)}
      aria-labelledby="work-experience-title-text"
    >
      <header>
        <h2
          id="work-experience-title"
          className={styles.workExperienceSection__title}
        >
          🚀 <span id="work-experience-title-text">Experiencia laboral</span>
        </h2>
      </header>
      <WorkExperienceList />
    </section>
  );
}
