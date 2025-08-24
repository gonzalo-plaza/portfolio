import styles from "@/styles/components/work-experience-section/work-experience-section-view.module.scss";
import WorkExperienceList from "./_components/WorkExperienceList";

export default function WorkExperienceSectionView() {
  return (
    <section className="container" aria-labelledby="work-experience-title">
      <header>
        <h2
          id="work-experience-title"
          className={styles.workExperienceSectionTitle}
        >
          🚀 Experiencia laboral
        </h2>
      </header>
      <WorkExperienceList />
    </section>
  );
}
