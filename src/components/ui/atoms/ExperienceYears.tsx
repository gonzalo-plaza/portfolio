import { getYearsOfExperience } from "@/utils/dateUtils/dateUtils";

interface ExperienceYearsProps {
  startDate: Date;
  /** Text rendered before the number. Default: "más de" */
  prefix?: string;
  /** Text rendered after the number. Default: "años" */
  suffix?: string;
}

const ExperienceYears = ({
  startDate,
  prefix = "más de",
  suffix = "años",
}: ExperienceYearsProps) => {
  const years = getYearsOfExperience(startDate);
  return (
    <>
      {prefix} {years} {suffix}
    </>
  );
};

ExperienceYears.displayName = "ExperienceYears";

export default ExperienceYears;
