import {
  ConfluenceIcon,
  DatadogIcon,
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

const leoVegasWorkExperience: WorkExperience = {
  title: "LeoVegas",
  subtitle: "JavaScript Engineer",
  logoUrl: "/images/leovegas-logo.webp",
  startTime: new Date("2026-01-12"),
  description: "Desarrollo frontend para LeoVegas y las distintas marcas del grupo, dentro del squad Gaming Experience. Foco en mejorar la experiencia de usuario de la Gaming Experience, con atención al rendimiento y la observabilidad.",
  technologyList: [
    { text: "HTML", Component: HTMLIcon },
    { text: "Sass", Component: SassIcon },
    { text: "JavaScript", Component: JavaScriptIcon },
    { text: "TypeScript", Component: TypeScriptIcon },
    { text: "React", Component: ReactIcon },
    { text: "Git", Component: GitIcon },
    { text: "Jira", Component: JiraIcon },
    { text: "Confluence", Component: ConfluenceIcon },
    { text: "Datadog", Component: DatadogIcon}
  ]
}

const iskaypetWorkExperience: WorkExperience = {
  title: "Iskaypet",
  subtitle: "Software Engineer",
  logoUrl: "/images/iskaypet-logo.webp",
  startTime: new Date("2022-05-23"),
  endTime: new Date("2026-01-11"),
  description:
    "Desarrollo frontend (con algo de backend 🤭) en aplicaciones web y ecommerce para las marcas del grupo. Lideré la definición de un nuevo producto digital y participé en iniciativas de omnicanalidad orientadas a mejorar la rentabilidad de las ventas. Impulsé la observabilidad del frontend y compartí ese conocimiento mediante workshops internos, además de contribuir a la definición de buenas prácticas del equipo.",
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
    "Salida a producción del primer ecommerce de la empresa, participando desde la idea hasta el despliegue. Definición de pautas de trabajo en SEO, rendimiento y buenas prácticas para el mantenimiento y la evolución del proyecto.",
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
  leoVegasWorkExperience,
  iskaypetWorkExperience,
  lolaDiazBebesWorkExperience,
  hermanosBravoWorkExperience,
  todoOcioWorkExperience,
];
