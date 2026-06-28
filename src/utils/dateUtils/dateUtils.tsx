/**
 * Start dates for career milestones — used to calculate dynamic experience years.
 * Update these if the starting role ever changes.
 */
export const DEV_CAREER_START = new Date("2021-11-03"); // Lola Díaz Bebés — first Developer role
export const TECH_CAREER_START = new Date("2016-08-01"); // Todo Ocio — first tech role

/**
 * Returns the number of full years elapsed between `startDate` and `end` (defaults to today).
 * Uses the same timestamp arithmetic as `getDifferenceTimeString` to stay consistent.
 */
export const getYearsOfExperience = (
  startDate: Date,
  end: Date = new Date()
): number => {
  const diff = new Date(end.getTime() - startDate.getTime());
  return Math.abs(diff.getFullYear()) - 1970;
};

interface getDifferenceTimeStringOptions {
  hideDays?: boolean;
  hideMonths?: boolean;
  hideYears?: boolean;
}

/**
 * The function `getDifferenceTimeString` calculates the time difference between two dates and returns
 * a human-readable string representation of the difference.
 *
 * @param {Date} latestDate - The `latestDate` parameter is the most recent date for which you want to
 * calculate the time difference.
 * @param {Date} earlierDate - The `earlierDate` parameter is the Date object representing the earlier
 * date for which you want to calculate the time difference.
 * @param {getDifferenceTimeStringOptions} options - The `options` parameter in the
 * `getDifferenceTimeString` function allows you to customize the output by hiding specific time units.
 * By default, all time units (days, months, years) are shown in the output. However, you can set the
 * following options to `true` to hide specific units
 *
 * @returns Returns a formatted string representing the time difference between two dates, considering the options provided.
 * The returned string includes the number of years, months, and days passed between the two dates, with the ability to hide specific
 * units of time based on the options provided.
 */
export const getDifferenceTimeString = (
  latestDate: Date,
  earlierDate: Date,
  options: getDifferenceTimeStringOptions = {
    hideDays: false,
    hideMonths: false,
    hideYears: false,
  }
): string | undefined => {
  const latestTimeStamp = latestDate.getTime();
  const earlierTimeStamp = earlierDate.getTime();
  const substractResult = new Date(latestTimeStamp - earlierTimeStamp);

  const [day, month, year] = [
    substractResult.getDate(),
    substractResult.getMonth() + 1,
    substractResult.getFullYear(),
  ];

  const daysPassed = Number(Math.abs(day) - 1);
  const monthsPassed = Number(Math.abs(month) - 1);
  const yearsPassed = Number(Math.abs(year) - 1970);

  const hasDays = daysPassed > 0;
  const hasMonths = monthsPassed > 0;
  const hasYears = yearsPassed > 0;

  const experienceTimeArray = [];

  if (hasDays && !options.hideDays) {
    const daysResult =
      daysPassed > 1 ? `${daysPassed} días` : `${daysPassed} día`;
    experienceTimeArray.push(daysResult);
  }
  if (hasMonths && !options.hideMonths) {
    const monthsResult =
      monthsPassed > 1 ? `${monthsPassed} meses` : `${monthsPassed} mes`;
    experienceTimeArray.push(monthsResult);
  }
  if (hasYears && !options.hideYears) {
    const yearsResult =
      yearsPassed > 1 ? `${yearsPassed} años` : `${yearsPassed} año`;
    experienceTimeArray.push(yearsResult);
  }

  if (experienceTimeArray.length === 3) {
    return `${experienceTimeArray[2]}, ${experienceTimeArray[1]} y ${experienceTimeArray[0]}`;
  }
  if (experienceTimeArray.length === 2) {
    return `${experienceTimeArray[1]} y ${experienceTimeArray[0]}`;
  }
  if (experienceTimeArray.length === 1) {
    return experienceTimeArray[0];
  }
};
