/**
 * Locale-independent structure of a project. Translatable text (title,
 * description, image alt and link titles) is resolved from the dictionary
 * via `key`.
 */
export interface Project {
  key: string;
  id: number;
  imageUrl: string;
  projectTechnologyBadgeList: Array<ProjectTechonology>;
  previewLink?: {
    disabled?: boolean;
    url: string;
  };
  gitHubLink?: {
    disabled?: boolean;
    url: string;
  };
}

export interface ProjectTechonology {
  text: string;
  icon?: {
    Component?: (iconProps: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
    width?: number;
    height?: number;
  };
  backgroundColor: string;
}
