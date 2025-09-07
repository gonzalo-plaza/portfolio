import {
  BootstrapIcon,
  CSSIcon,
  JavaScriptIcon,
  ReactIcon,
  SassIcon,
} from "@/components/icons/technologyIcons";
import NextJsIcon from "@/components/icons/technologyIcons/_components/NextJsIcon";
import ShadcnIcon from "@/components/icons/technologyIcons/_components/ShadcnIcon";
import TailwindIcon from "@/components/icons/technologyIcons/_components/TailwindIcon";
import { Project } from "@/models/project/project";

export const garajePlusProject: Project = {
  id: 1,
  imageUrl: "/images/garaje-plus-preview.jpg",
  imageAlt: "GarajePlus",
  title: "GarajePlus",
  description:
    "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
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
    title: "Ir a la web de GarajePlus",
  },
};

export const colorQueryProject: Project = {
  id: 2,
  imageUrl: "/images/color-query-preview.jpg",
  imageAlt: "ColorQuery",
  title: "ColorQuery",
  description:
    "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
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
    url: "https://garajeplus.com/",
    title: "Ir a la web de GarajePlus",
  },
  gitHubLink: {
    url: "https://github.com/gonzalo-plaza/dentalclinic-practise",
    title: "Ir al repositorio de MedacDent",
  },
};

export const medacDentProject: Project = {
  id: 3,
  imageUrl: "/images/medac-dent-preview.jpg",
  imageAlt: "MedacDent",
  title: "MedacDent",
  description:
    "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
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
    url: "https://garajeplus.com/",
    title: "Ir a la web de GarajePlus",
  },
  gitHubLink: {
    url: "https://github.com/gonzalo-plaza/dentalclinic-practise",
    title: "Ir al repositorio de MedacDent",
  },
};

export const workInProgressProject: Project = {
  id: 3,
  imageUrl: "/images/project-in-progress.webp",
  imageAlt: "Work in Progress",
  title: "Work in Progress",
  description:
    "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
  projectTechnologyBadgeList: [
    {
      text: "To Be Defined",
      backgroundColor: "#352c85",
    },
  ],
  previewLink: {
    disabled: true,
    url: "https://garajeplus.com/",
    title: "Ir a la web de GarajePlus",
  },
  gitHubLink: {
    disabled: true,
    url: "https://github.com/gonzalo-plaza/dentalclinic-practise",
    title: "Ir al repositorio de MedacDent",
  },
};

export const projectList: Array<Project> = [
  garajePlusProject,
  colorQueryProject,
  medacDentProject,
  workInProgressProject,
];
