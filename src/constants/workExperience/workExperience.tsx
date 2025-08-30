import {
  GitIcon,
  GrafanaIcon,
  HTMLIcon,
  JavaScriptIcon,
  JiraIcon,
  JQueryIcon,
  ReactIcon,
  SassIcon,
  TypeScriptIcon,
} from "@/components/icons/technologyIcons";
import ConflueceIcon from "@/components/icons/technologyIcons/_components/ConfluenceIcon";
import { WorkExperience } from "@/models/workExperience/workExperience";

const iskaypetWorkExperience: WorkExperience = {
  title: "Iskaypet",
  subtitle: "Software Engineer",
  logoUrl: "/images/iskaypet-logo.webp",
  startTime: new Date("2022-05-23"),
  description:
    "Software Engineer especializado en desarrollo frontend (con algo de backend 🤭). En Iskaypet participo en el desarrollo de iniciativas orientadas a mejorar los KPI del negocio, optimizando la experiencia digital de los usuarios y contribuyendo a proyectos clave para las marcas del grupo.",
  technologyList: [
    HTMLIcon,
    SassIcon,
    JavaScriptIcon,
    JQueryIcon,
    TypeScriptIcon,
    ReactIcon,
    GitIcon,
    GrafanaIcon,
    JiraIcon,
    ConflueceIcon,
  ],
};

const lolaDiazBebesWorkExperience: WorkExperience = {
  title: "Lola Díaz Bebés",
  subtitle: "Web Developer",
  logoUrl: "/images/lola-diaz-bebes-logo.webp",
  startTime: new Date("2021-11-03"),
  endTime: new Date("2022-05-23"),
  description:
    "Implementé parte del ecommerce de la marca, optimizando rendimiento y usabilidad. También formé parte del despliegue a producción de la primera versión, trabajando codo a codo con el equipo de marketing para mejorar la conversión.",
  technologyList: [HTMLIcon, SassIcon, JavaScriptIcon],
};

const hermanosBravoWorkExperience: WorkExperience = {
  title: "Hermanos Bravo",
  subtitle: "Técnico informático y empleado de ventas",
  logoUrl: "/images/hermanos-bravo-logo.webp",
  startTime: new Date("2018-08-11"),
  endTime: new Date("2021-09-26"),
  description:
    "Trabajé como técnico informático y empleado de ventas en tienda. Me encargaba de reparaciones y soporte, además de la venta de productos como televisores, electrodomésticos y dispositivos electrónicos.",
};

const todoOcioWorkExperience: WorkExperience = {
  title: "Todo Ocio y Telefonía",
  subtitle: "Técnico informático y empleado de ventas",
  logoUrl: "/images/todo-ocio-logo.webp",
  startTime: new Date("2016-08-01"),
  endTime: new Date("2018-04-30"),
  description:
    "Desempeñé tareas de técnico informático y atención al cliente, gestionando reparaciones y asesorando en la venta de productos de informática y telefonía.",
};

export const workExperiences: Array<WorkExperience> = [
  iskaypetWorkExperience,
  lolaDiazBebesWorkExperience,
  hermanosBravoWorkExperience,
  todoOcioWorkExperience,
];
