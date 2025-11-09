import {
  ConfluenceIcon,
  GitIcon,
  GrafanaIcon,
  HTMLIcon,
  JavaScriptIcon,
  JiraIcon,
  JQueryIcon,
  ReactIcon,
  SassIcon,
  TypeScriptIcon,
} from "@/components/ui/atoms/icons";
import { WorkExperience } from "@/models/workExperience/workExperience";

const iskaypetWorkExperience: WorkExperience = {
  title: "Iskaypet",
  subtitle: "Software Engineer",
  logoUrl: "/images/iskaypet-logo.webp",
  startTime: new Date("2022-05-23"),
  description:
    "Software Engineer especializado en desarrollo frontend (con algo de backend 🤭). En Iskaypet participo en proyectos de aplicaciones web y ecommerce, orientados a mejorar los KPI del negocio, optimizando la experiencia digital y contribuyendo en iniciativas clave para las marcas del grupo",
  technologyList: [
    { text: "HTML", Component: HTMLIcon },
    { text: "Sass", Component: SassIcon },
    { text: "JavaScript", Component: JavaScriptIcon },
    { text: "jQuery", Component: JQueryIcon },
    { text: "TypeScript", Component: TypeScriptIcon },
    { text: "React", Component: ReactIcon },
    { text: "Git", Component: GitIcon },
    { text: "Grafana", Component: GrafanaIcon },
    { text: "Jira", Component: JiraIcon },
    { text: "Confluence", Component: ConfluenceIcon },
  ]
};

const lolaDiazBebesWorkExperience: WorkExperience = {
  title: "Lola Díaz Bebés",
  subtitle: "Web Developer",
  logoUrl: "/images/lola-diaz-bebes-logo.webp",
  startTime: new Date("2021-11-03"),
  endTime: new Date("2022-05-23"),
  description:
    "Desarrollo del ecommerce de la marca con foco en rendimiento y usabilidad. Despliegue a producción de la primera versión y definición de pautas de buenas prácticas para el mantenimiento y evolución del proyecto.",
  technologyList: [   
    { text: "HTML", Component: HTMLIcon },
    { text: "Sass", Component: SassIcon },
    { text: "JavaScript", Component: JavaScriptIcon },
  ],
};

const hermanosBravoWorkExperience: WorkExperience = {
  title: "Hermanos Bravo",
  subtitle: "Técnico informático y empleado de ventas",
  logoUrl: "/images/hermanos-bravo-logo.webp",
  startTime: new Date("2018-08-11"),
  endTime: new Date("2021-09-26"),
  description:
    "Reparaciones y soporte técnico de dispositivos electrónicos y ordenadores. Aumento de ventas mediante asesoramiento especializado y optimización de los procesos de atención al cliente para ofrecer un servicio profesional y personalizado.",
};

const todoOcioWorkExperience: WorkExperience = {
  title: "Todo Ocio y Telefonía",
  subtitle: "Técnico informático y empleado de ventas",
  logoUrl: "/images/todo-ocio-logo.webp",
  startTime: new Date("2016-08-01"),
  endTime: new Date("2018-04-30"),
  description:
    "Gestión de reparaciones y soporte técnico de ordenadores y dispositivos móviles. Mejora de la satisfacción de clientes y optimización de los procesos de atención y venta para un servicio eficiente y profesional",
};

export const workExperiences: Array<WorkExperience> = [
  iskaypetWorkExperience,
  lolaDiazBebesWorkExperience,
  hermanosBravoWorkExperience,
  todoOcioWorkExperience,
];
