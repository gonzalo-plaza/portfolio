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
  key: "leovegas",
  title: "LeoVegas",
  logoUrl: "/images/leovegas-logo.webp",
  startTime: new Date("2026-01-12"),
  technologyList: [
    { text: "HTML", Component: HTMLIcon },
    { text: "Sass", Component: SassIcon },
    { text: "JavaScript", Component: JavaScriptIcon },
    { text: "TypeScript", Component: TypeScriptIcon },
    { text: "React", Component: ReactIcon },
    { text: "Git", Component: GitIcon },
    { text: "Jira", Component: JiraIcon },
    { text: "Confluence", Component: ConfluenceIcon },
    { text: "Datadog", Component: DatadogIcon },
  ],
};

const iskaypetWorkExperience: WorkExperience = {
  key: "iskaypet",
  title: "Iskaypet",
  logoUrl: "/images/iskaypet-logo.webp",
  startTime: new Date("2022-05-23"),
  endTime: new Date("2026-01-11"),
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
  ],
};

const lolaDiazBebesWorkExperience: WorkExperience = {
  key: "lolaDiazBebes",
  title: "Lola Díaz Bebés",
  logoUrl: "/images/lola-diaz-bebes-logo.webp",
  startTime: new Date("2021-11-03"),
  endTime: new Date("2022-05-23"),
  technologyList: [
    { text: "HTML", Component: HTMLIcon },
    { text: "Sass", Component: SassIcon },
    { text: "JavaScript", Component: JavaScriptIcon },
  ],
};

const hermanosBravoWorkExperience: WorkExperience = {
  key: "hermanosBravo",
  title: "Hermanos Bravo",
  logoUrl: "/images/hermanos-bravo-logo.webp",
  startTime: new Date("2018-08-11"),
  endTime: new Date("2021-09-26"),
};

const todoOcioWorkExperience: WorkExperience = {
  key: "todoOcio",
  title: "Todo Ocio y Telefonía",
  logoUrl: "/images/todo-ocio-logo.webp",
  startTime: new Date("2016-08-01"),
  endTime: new Date("2018-04-30"),
};

export const workExperiences: Array<WorkExperience> = [
  leoVegasWorkExperience,
  iskaypetWorkExperience,
  lolaDiazBebesWorkExperience,
  hermanosBravoWorkExperience,
  todoOcioWorkExperience,
];
