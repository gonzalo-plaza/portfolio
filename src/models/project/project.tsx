export interface Project {
  id: number;
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  projectTechnologyBadgeList: Array<ProjectTechonology>;
}

export interface ProjectTechonology {
  text: string;
  icon: {
    Component: (iconProps: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
    width?: number;
    height?: number;
  };
  backgroundColor: string;
}
