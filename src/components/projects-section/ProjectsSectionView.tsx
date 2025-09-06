"use client";

import styles from "@/styles/components/projects-section/projects-section-view.module.scss";
import { useEffect } from "react";
import CardCarousel from "../organism/CardCarousel";
import Image from "next/image";
import ProjectCard from "../organism/ProjectCard";

const projects = [
  {
    imageUrl: "/images/garaje-plus-preview.jpg",
    imageAlt: "GarajePlus",
    title: "GarajePlus",
    description:
      "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
  },
  {
    imageUrl: "/images/garaje-plus-preview.jpg",
    imageAlt: "GarajePlus",
    title: "GarajePlus",
    description:
      "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
  },
  {
    imageUrl: "/images/garaje-plus-preview.jpg",
    imageAlt: "GarajePlus",
    title: "GarajePlus",
    description:
      "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
  },
  {
    imageUrl: "/images/garaje-plus-preview.jpg",
    imageAlt: "GarajePlus",
    title: "GarajePlus",
    description:
      "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
  },
  {
    imageUrl: "/images/garaje-plus-preview.jpg",
    imageAlt: "GarajePlus",
    title: "GarajePlus",
    description:
      "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
  },
];

const ProjectsSectionView = () => {
  useEffect(() => {
    const container = document.querySelector(".js-carousel-container");
    const firstItem = document.querySelector(".js-first-item");

    if (!firstItem || !container) return;

    container.addEventListener("scroll", () => {
      const leftRelative =
        firstItem.getBoundingClientRect().left -
        container.getBoundingClientRect().left;
      console.log(leftRelative);
    });
  });
  return (
    <section
      className={`${styles.projectsSectionView} container`}
      aria-labelledby="projects-section-title"
    >
      <header>
        <h2
          id="projects-section-title"
          className={styles.projectsSectionView__title}
        >
          💻 Proyectos
        </h2>
      </header>
      {projects && (
        <CardCarousel>
          <>
            {projects.map((project) => {
              return (
                <ProjectCard
                  imageUrl={project.imageUrl}
                  imageAlt={project.imageAlt}
                  title={project.title}
                  description={project.description}
                />
              );
            })}
          </>
        </CardCarousel>
      )}
    </section>
  );
};

export default ProjectsSectionView;
