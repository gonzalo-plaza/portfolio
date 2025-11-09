import { WorkExperience } from "@/models/workExperience/workExperience";

import styles from "@/styles/components/work-experience-section/_components/work-experience-technology-list.module.scss";

interface WorkExperienceTechnologyListProps {
  technologyList: WorkExperience["technologyList"];
}

const WorkExperienceTechnologyList = ({
  technologyList,
}: WorkExperienceTechnologyListProps) => {
  return (
    <ul className={styles.workExperienceTechnologyList} aria-label="Tecnologías utilizadas">
      {technologyList?.map((Technology, index) => {
        return (
          <li key={index}>
            <Technology.Component
              className={styles.workExperienceTechnologyList__item}
              aria-label={Technology.text}
              width={20}
              height={20}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default WorkExperienceTechnologyList;
