"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/components/work-experience-section/_components/work-experience-list.module.scss";
import Image from "next/image";
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
import ConflueceIcon from "@/components/icons/technologyIcons/_components/SassIcon";
import { Span } from "next/dist/trace";

const workExperiences = [
  {
    title: "Iskaypet",
    subtitle: "Software Engineer",
    logoUrl: "/images/iskaypet-logo.webp",
    startTime: "05/2022",
    description:
      "Software Engineer especializado en desarrollo frontend (con algo de backend 🤭). En Iskaypet participo en el desarrollo de iniciativas orientadas a mejorar los KPI del negocio, optimizando la experiencia digital de los usuarios y contribuyendo a proyectos clave para las marcas del grupo.",
    technologies: [
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
  },
  {
    title: "Lola Díaz Bebés",
    subtitle: "Web Developer",
    logoUrl: "/images/lola-diaz-bebes-logo.webp",
    startTime: "10/2021",
    endTime: "05/2022",
    description:
      "Diseñé e implementé el ecommerce de la marca, optimizando rendimiento y usabilidad. También formé parte del despliegue a producción de la primera versión, trabajando codo a codo con el equipo de marketing para mejorar la conversión.",
  },
  {
    title: "Hermanos Bravo",
    subtitle: "Técnico informático y empleado de ventas",
    logoUrl: "/images/hermanos-bravo-logo.webp",
    startTime: "05/2018",
    endTime: "09/2018",
    description:
      "Trabajé como técnico informático y empleado de ventas en tienda. Me encargaba de reparaciones y soporte, además de la venta de productos como televisores, electrodomésticos y dispositivos electrónicos.",
  },
  {
    title: "Todo Ocio y Telefonía",
    subtitle: "Técnico informático y empleado de ventas",
    logoUrl: "/images/todo-ocio-logo.webp",
    startTime: "05/2016",
    endTime: "05/2018",
    description:
      "Desempeñé tareas de técnico informático y atención al cliente, gestionando reparaciones y asesorando en la venta de productos de informática y telefonía.",
  },
];

const isItemDisapearFromCenter = (
  item: HTMLLIElement,
  viewportCenter: number
) => {
  const itemRect = item.getBoundingClientRect();
  const itemBottomDistance = itemRect.bottom - viewportCenter;
  const itemIsDisapearFromCenter = itemBottomDistance < 0;

  return itemIsDisapearFromCenter;
};

const isItemEnteringFromBotton = (
  item: HTMLLIElement,
  viewportCenter: number
) => {
  const itemRect = item.getBoundingClientRect();
  const itemTopDistance = itemRect.top - viewportCenter;
  const firstItemIsEnteringFromBottom =
    itemTopDistance > 0 && itemTopDistance > 50;

  return firstItemIsEnteringFromBottom;
};

export default function WorkExperienceList() {
  const listRef = useRef<HTMLLIElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    let requestAnimationFrameId: number | null = null;
    const handleScroll = () => {
      if (requestAnimationFrameId)
        cancelAnimationFrame(requestAnimationFrameId);

      requestAnimationFrameId = requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight / 2;

        let closestIndex: number | null = null;
        let closestDistance = Infinity;

        for (const el of listRef.current) {
          if (!el) return;

          const index = listRef.current.indexOf(el);

          if (index === 0 && isItemEnteringFromBotton(el, viewportCenter)) {
            setActiveIndex(null);
            break;
          }

          const lastIndex = listRef.current.length - 1;

          if (
            index === lastIndex &&
            isItemDisapearFromCenter(el, viewportCenter)
          ) {
            setActiveIndex(null);
            break;
          }

          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.bottom / 2;
          const distance = Math.abs(viewportCenter - elementCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }

        setActiveIndex(closestIndex);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // ejecutar al cargar

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestAnimationFrameId)
        cancelAnimationFrame(requestAnimationFrameId);
    };
  }, []);

  return (
    <ul className={styles.workExperienceList}>
      {workExperiences.map((experience, index) => (
        <li
          key={index}
          ref={(el: HTMLLIElement) => {
            listRef.current[index] = el;
          }}
          data-index={index}
          className={`${styles.workExperienceListItem} ${
            activeIndex === index ? styles.isListItemActive : ""
          }`}
        >
          <article className={`${styles.workExperienceArticle}`}>
            <Image
              src={experience.logoUrl}
              alt={experience.title}
              className={styles.workExperienceArticle__headerImage}
              width={180}
              height={180}
            />
            <header className={styles.workExperienceArticle__header}>
              <hgroup>
                <h3 className={styles.workExperienceArticle__title}>
                  {experience.title}
                </h3>
                <p className={styles.workExperienceArticle__subtitle}>
                  {experience.subtitle}
                </p>
              </hgroup>
              <div>
                <time dateTime={experience.startTime}>
                  {experience.startTime}
                </time>
                {" - "}
                {experience.endTime ? (
                  <time dateTime={experience.endTime}>
                    {experience.endTime}
                  </time>
                ) : (
                  <span className={styles.workExperienceArticle__badge}>
                    Actualmente
                  </span>
                )}
              </div>
              {experience.technologies &&
                experience.technologies.length > 0 && (
                  <ul
                    className={styles.workExperienceArticle__technologiesList}
                  >
                    {experience.technologies?.map((Technology, index) => {
                      return (
                        <li key={index}>
                          <Technology
                            className={
                              styles.workExperienceArticle__technologyItem
                            }
                            width={20}
                            height={20}
                          />
                        </li>
                      );
                    })}
                  </ul>
                )}
            </header>
            <p className={styles.workExperienceArticle__description}>
              {experience.description}
            </p>
          </article>
          <hr
            className={`${styles.workExperienceListItem__separator} ${styles.workExperienceListItem__separatorActive}`}
          />
        </li>
      ))}
    </ul>
  );
}
