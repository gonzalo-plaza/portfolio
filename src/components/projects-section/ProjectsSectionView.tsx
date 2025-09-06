import styles from "@/styles/components/projects-section/projects-section-view.module.scss";
import CardCarousel from "../organism/CardCarousel/CardCarousel";
import ProjectCard from "../organism/ProjectCard";

const projects = [
  {
    id: 1,
    imageUrl: "/images/garaje-plus-preview.jpg",
    imageAlt: "GarajePlus",
    title: "GarajePlus",
    description:
      "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
  },
  {
    id: 2,
    imageUrl: "/images/garaje-plus-preview.jpg",
    imageAlt: "GarajePlus",
    title: "GarajePlus",
    description:
      "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
  },
  {
    id: 3,
    imageUrl: "/images/garaje-plus-preview.jpg",
    imageAlt: "GarajePlus",
    title: "GarajePlus",
    description:
      "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
  },
  {
    id: 4,
    imageUrl: "/images/garaje-plus-preview.jpg",
    imageAlt: "GarajePlus",
    title: "GarajePlus",
    description:
      "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
  },
  {
    id: 5,
    imageUrl: "/images/garaje-plus-preview.jpg",
    imageAlt: "GarajePlus",
    title: "GarajePlus",
    description:
      "GarajePlus es un proyecto orientado a facilitar el registro de mantenimiento de vehículos. El objetivo es poder tener registrado todo el historial de mantenimientos, reparaciones y revisiones de cualquier vehiculo.",
  },
];

const ProjectsSectionView = () => {
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
                  key={project.id}
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
