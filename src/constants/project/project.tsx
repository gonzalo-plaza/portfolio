import NextJsIcon from "@/components/icons/technologyIcons/_components/NextJsIcon";
import ShadcnIcon from "@/components/icons/technologyIcons/_components/ShadcnIcon";
import TailwindIcon from "@/components/icons/technologyIcons/_components/TailwindIcon";
import { Project } from "@/models/project/project";

export const garajePlusProject: Project = {
  id: 1,
  imageUrl: "/images/garaje-plus-preview-recortado.jpg",
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
};

export const projectList: Array<Project> = [
  garajePlusProject,
  garajePlusProject,
  garajePlusProject,
  garajePlusProject,
];
