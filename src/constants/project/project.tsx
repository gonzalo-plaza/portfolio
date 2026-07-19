import {
  BootstrapIcon,
  CSSIcon,
  JavaScriptIcon,
  NextJsIcon,
  ReactIcon,
  SassIcon,
  ShadcnIcon,
  TailwindIcon,
} from "@/components/ui/atoms/icons";
import { Project } from "@/models/project/project";

export const garajePlusProject: Project = {
  key: "garajePlus",
  id: 1,
  imageUrl: "/images/garaje-plus-preview.jpg",
  projectTechnologyBadgeList: [
    {
      text: "Next.js",
      icon: {
        Component: NextJsIcon,
      },
      backgroundColor: "#000000",
    },
    {
      text: "Shadcn",
      icon: {
        Component: ShadcnIcon,
        width: 12,
        height: 12,
      },
      backgroundColor: "#0a0a0a",
    },
    {
      text: "Tailwind",
      icon: {
        Component: TailwindIcon,
      },
      backgroundColor: "#003159",
    },
  ],
  previewLink: {
    url: "https://garajeplus.com/",
  },
};

export const colorQueryProject: Project = {
  key: "colorQuery",
  id: 2,
  imageUrl: "/images/color-query-preview.jpg",
  projectTechnologyBadgeList: [
    {
      text: "React",
      icon: {
        Component: ReactIcon,
        height: 12,
        width: 12,
      },
      backgroundColor: "#194c57",
    },
    {
      text: "CSS",
      icon: {
        Component: CSSIcon,
        height: 10,
        width: 10,
      },
      backgroundColor: "#154461",
    },
  ],
  previewLink: {
    url: "https://gonzalo-plaza.github.io/color-query/",
  },
  gitHubLink: {
    url: "https://github.com/gonzalo-plaza/color-query",
  },
};

export const medacDentProject: Project = {
  key: "medacDent",
  id: 3,
  imageUrl: "/images/medac-dent-preview.jpg",
  projectTechnologyBadgeList: [
    {
      text: "Javascript",
      icon: {
        Component: JavaScriptIcon,
        width: 10,
        height: 10,
      },
      backgroundColor: "#736c41",
    },
    {
      text: "Bootstrap",
      icon: {
        Component: BootstrapIcon,
        width: 12,
        height: 12,
      },
      backgroundColor: "#3b0d6f",
    },
    {
      text: "Sass",
      icon: {
        Component: SassIcon,
      },
      backgroundColor: "#430323",
    },
  ],
  previewLink: {
    url: "https://gonzalo-plaza.github.io/dentalclinic-practise/",
  },
  gitHubLink: {
    url: "https://github.com/gonzalo-plaza/dentalclinic-practise",
  },
};

export const workInProgressProject: Project = {
  key: "workInProgress",
  id: 4,
  imageUrl: "/images/project-in-progress.webp",
  projectTechnologyBadgeList: [
    {
      text: "To Be Defined",
      backgroundColor: "#352c85",
    },
  ],
  previewLink: {
    disabled: true,
    url: "#",
  },
  gitHubLink: {
    disabled: true,
    url: "#",
  },
};

export const projectList: Array<Project> = [
  garajePlusProject,
  colorQueryProject,
  medacDentProject,
  workInProgressProject,
];
