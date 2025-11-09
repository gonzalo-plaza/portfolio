import { WorkExperience } from "@/models/workExperience/workExperience";
import { getDifferenceTimeString } from "@/utils/dateUtils/dateUtils";

import styles from "@/styles/components/sections/work-experience-section/_components/work-experience-date-time.module.scss";
import Badge from "@/components/ui/atoms/Badge";

interface WorkExperienceDateTimeProps {
  startTime: WorkExperience["startTime"];
  endTime: WorkExperience["endTime"];
}

const WorkExperienceDateTime = ({
  startTime,
  endTime,
}: WorkExperienceDateTimeProps) => {
  const [startTimeMonth, startTimeYear] = [
    String(startTime.getMonth() + 1).padStart(2, '0'),
    startTime.getFullYear(),
  ];

  const [endTimeMonth, endTimeYear] = [
    endTime ? String(endTime?.getMonth() + 1).padStart(2, '0') : null,
    endTime?.getFullYear(),
  ];

  const startTimeString = `${startTimeMonth}-${startTimeYear}`;
  const startTimeAttribute = `${startTimeYear}-${startTimeMonth}`;
  const endTimeString = endTime ? `${endTimeMonth}-${endTimeYear}` : null;
  const endTimeAttribute = endTime ? `${endTimeYear}-${endTimeMonth}` : null;
  const experienceTime = () => {
    const endTimeToCheck = endTime ?? new Date();
    return getDifferenceTimeString(endTimeToCheck, startTime, {
      hideDays: true,
    });
  };
  return (
    <p className={styles.workExperienceDateTime}>
      <time dateTime={startTimeAttribute}>
        {startTimeString}
        {" / "}
      </time>

      {endTimeString ? (
        <time dateTime={endTimeAttribute ?? undefined}>{endTimeString}</time>
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
