export interface WorkExperience {
  title: string;
  subtitle: string;
  logoUrl: string;
  startTime: string;
  endTime?: string;
  description: string;
  technologyList?: Array<
    (iconProps: React.SVGProps<SVGSVGElement>) => React.JSX.Element
  >;
}
