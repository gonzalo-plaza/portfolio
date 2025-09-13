import { WorkExperience } from "@/models/workExperience/workExperience";
import { getDifferenceTimeString } from "@/utils/dateUtils/dateUtils";

import styles from "@/styles/components/work-experience-section/_components/work-experience-date-time.module.scss";
import Badge from "@/components/atoms/Badge";

interface WorkExperienceDateTimeProps {
  startTime: WorkExperience["startTime"];
  endTime: WorkExperience["endTime"];
}

const WorkExperienceDateTime = ({
  startTime,
  endTime,
}: WorkExperienceDateTimeProps) => {
  const [startTimeMonth, startTimeYear] = [
    startTime.getMonth() + 1,
    startTime.getFullYear(),
  ];

  const [endTimeMonth, endTimeYear] = [
    endTime ? endTime?.getMonth() + 1 : null,
    endTime?.getFullYear(),
  ];

  const startTimeString = `${startTimeMonth}/${startTimeYear}`;
  const endTimeString = endTime ? `${endTimeMonth}/${endTimeYear}` : null;

  const experienceTime = () => {
    const endTimeToCheck = endTime ?? new Date();
    return getDifferenceTimeString(endTimeToCheck, startTime, {
      hideDays: true,
    });
  };
  return (
    <p className={styles.workExperienceDateTime}>
      <time dateTime={startTimeString}>
        {startTimeString}
        {" - "}
      </time>

      {endTimeString ? (
        <time dateTime={endTimeString}>{endTimeString}</time>
      ) : (
        <Badge variant="primary">Actualmente</Badge>
      )}
      <span className={styles.workExperienceDateTime__experienceTime}>
        {" | "}
        {experienceTime()}
      </span>
    </p>
  );
};

export default WorkExperienceDateTime;
