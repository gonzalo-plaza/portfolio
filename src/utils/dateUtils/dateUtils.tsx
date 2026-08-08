import type { Locale } from "@/i18n/config";

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

export interface DurationLabels {
  day: string;
  days: string;
  month: string;
  months: string;
  year: string;
  years: string;
  and: string;
}

/** Human-readable span between two dates, localised through `labels`. */
export const getDifferenceTimeString = (
  latestDate: Date,
  earlierDate: Date,
  labels: DurationLabels,
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
      daysPassed > 1
        ? `${daysPassed} ${labels.days}`
        : `${daysPassed} ${labels.day}`;
    experienceTimeArray.push(daysResult);
  }
  if (hasMonths && !options.hideMonths) {
    const monthsResult =
      monthsPassed > 1
        ? `${monthsPassed} ${labels.months}`
        : `${monthsPassed} ${labels.month}`;
    experienceTimeArray.push(monthsResult);
  }
  if (hasYears && !options.hideYears) {
    const yearsResult =
      yearsPassed > 1
        ? `${yearsPassed} ${labels.years}`
        : `${yearsPassed} ${labels.year}`;
    experienceTimeArray.push(yearsResult);
  }

  if (experienceTimeArray.length === 3) {
    return `${experienceTimeArray[2]}, ${experienceTimeArray[1]} ${labels.and} ${experienceTimeArray[0]}`;
  }
  if (experienceTimeArray.length === 2) {
    return `${experienceTimeArray[1]} ${labels.and} ${experienceTimeArray[0]}`;
  }
  if (experienceTimeArray.length === 1) {
    return experienceTimeArray[0];
  }
};

const BLOG_DATE_LOCALES: Record<Locale, string> = {
  es: "es-ES",
  en: "en-US",
};

/**
 * Formats an ISO date (YYYY-MM-DD) into a localized human-readable date, e.g.
 * "19 de julio de 2026" / "July 19, 2026". Used for blog post `<time>` labels.
 */
export const formatBlogDate = (isoDate: string, locale: Locale): string =>
  new Intl.DateTimeFormat(BLOG_DATE_LOCALES[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    // `YYYY-MM-DD` parses as UTC midnight, so formatting in the runtime's zone
    // would render the previous day west of Greenwich — and disagree with the
    // `datetime` attribute and the JSON-LD next to it.
    timeZone: "UTC",
  }).format(new Date(isoDate));

const SITE_TIMEZONE = "Europe/Madrid";

/** Resolved per date so daylight saving is handled, not assumed. */
const siteUtcOffset = (isoDate: string): string =>
  new Intl.DateTimeFormat("en", {
    timeZone: SITE_TIMEZONE,
    timeZoneName: "longOffset",
  })
    .formatToParts(new Date(`${isoDate}T12:00:00Z`))
    .find((part) => part.type === "timeZoneName")
    ?.value.replace("GMT", "") || "Z";

/**
 * `YYYY-MM-DD` to a full ISO 8601 timestamp, e.g. `2026-07-19T12:00:00+02:00`.
 * Google reports structured-data dates without an offset as invalid. Posts only
 * declare a day, so midday is the choice that reads as the same date in every
 * timezone and stays clear of the small hours where DST switches.
 */
export const toIsoTimestamp = (isoDate: string): string =>
  `${isoDate}T12:00:00${siteUtcOffset(isoDate)}`;
