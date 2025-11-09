import {
  BootstrapIcon,
  CSSIcon,
  JavaScriptIcon,
  ReactIcon,
  SassIcon,
} from "@/components/ui/atoms/icons/technologyIcons";
import NextJsIcon from "@/components/ui/atoms/icons/technologyIcons/_components/NextJsIcon";
import ShadcnIcon from "@/components/ui/atoms/icons/technologyIcons/_components/ShadcnIcon";
import TailwindIcon from "@/components/ui/atoms/icons/technologyIcons/_components/TailwindIcon";
import { Project } from "@/models/project/project";

export const garajePlusProject: Project = {
  id: 1,
  imageUrl: "/images/garaje-plus-preview.jpg",
  imageAlt: "Interfaz de GarajePlus, registro de mantenimiento de vehículos",
  title: "GarajePlus",
  description:
    "Proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
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
  imageAlt:
    "Interfaz de ColorQuery mostrando selección y nombres de colores a partir de valores hexadecimales",
  title: "ColorQuery",
  description:
    "Herramienta web para identificar el nombre de un color a partir de su valor hexadecimal. Ofrece también el color más cercano si no existe un nombre definido, facilitando la selección y referencia de colores en diseño web y gráfico.",
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
    title: "Ir a la herramienta ColorQuery",
  },
  gitHubLink: {
    url: "https://github.com/gonzalo-plaza/color-query",
    title: "Ir al repositorio de ColorQuery",
  },
};

export const medacDentProject: Project = {
  id: 3,
  imageUrl: "/images/medac-dent-preview.jpg",
  imageAlt:
    "Interfaz de MedacDent mostrando un formulario de gestión de citas en clínica dental",
  title: "MedacDent",
  description:
    "Aplicación web para la gestión de citas en una clínica dental. Proyecto de práctica enfocado en el desarrollo con JavaScript puro y SASS, optimizando la experiencia de usuario y la organización de datos.",
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
    title: "Ir a la herramienta MedacDent",
  },
  gitHubLink: {
    url: "https://github.com/gonzalo-plaza/dentalclinic-practise",
    title: "Ir al repositorio de Dental Clinic Practise",
  },
};

export const workInProgressProject: Project = {
  id: 3,
  imageUrl: "/images/project-in-progress.webp",
  imageAlt: "Ilustración de trabajo en progreso",
  title: "Work in Progress",
  description:
    "Work In Progress 🚀. Más proyectos e ideas están por venir, con el objetivo de seguir aprendiendo nuevas tecnologías, afianzando conocimientos y creando soluciones que realmente ayuden a las personas.",
  projectTechnologyBadgeList: [
    {
      text: "To Be Defined",
      backgroundColor: "#352c85",
    },
  ],
  previewLink: {
    disabled: true,
    url: "#",
    title: "Destino por definir",
  },
  gitHubLink: {
    disabled: true,
    url: "#",
    title: "Repositorio por definir",
  },
};

export const projectList: Array<Project> = [
  garajePlusProject,
  colorQueryProject,
  medacDentProject,
  workInProgressProject,
];
