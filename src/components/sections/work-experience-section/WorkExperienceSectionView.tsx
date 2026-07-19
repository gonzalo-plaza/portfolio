import styles from "@/styles/components/sections/work-experience-section/work-experience-section-view.module.scss";
import WorkExperienceList from "./_components/WorkExperienceList";
import clsx from "clsx";
import type { Dictionary } from "@/i18n/types";

interface WorkExperienceSectionViewProps {
  dict: Dictionary["workExperience"];
}

export default function WorkExperienceSectionView({
  dict,
}: WorkExperienceSectionViewProps) {
  return (
    <section
      id="work-experience"
      className={clsx("container", styles.workExperienceSection)}
      aria-label={dict.sectionAria}
    >
      <header>
        <h2
          id="work-experience-title"
          className={styles.workExperienceSection__title}
        >
          {dict.title}
        </h2>
      </header>
      <WorkExperienceList dict={dict} />
    </section>
  );
}
