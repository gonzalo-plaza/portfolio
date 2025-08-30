export interface WorkExperience {
  title: string;
  subtitle: string;
  logoUrl: string;
  startTime: Date;
  endTime?: Date;
  description: string;
  technologyList?: Array<
    (iconProps: React.SVGProps<SVGSVGElement>) => React.JSX.Element
  >;
}
