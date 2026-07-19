/**
 * Locale-independent structure of a work experience entry. Translatable text
 * (subtitle/role and description) is resolved from the dictionary via `key`.
 */
export interface WorkExperience {
  key: string;
  title: string;
  logoUrl: string;
  startTime: Date;
  endTime?: Date;
  technologyList?: Array<WorkExperienceTechnology>;
}

export interface WorkExperienceTechnology {
  text: string;
  Component: (iconProps: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}
