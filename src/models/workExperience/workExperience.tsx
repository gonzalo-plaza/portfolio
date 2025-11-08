export interface WorkExperience {
  title: string;
  subtitle: string;
  logoUrl: string;
  startTime: Date;
  endTime?: Date;
  description: string;
  technologyList?: Array<
    WorkExperienceTechnology
  >;
}

export interface WorkExperienceTechnology {
  text: string,
  Component: (iconProps: React.SVGProps<SVGSVGElement>) => React.JSX.Element
}