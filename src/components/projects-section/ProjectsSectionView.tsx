import styles from "@/styles/components/projects-section/projects-section-view.module.scss";
import CardCarousel from "../organism/CardCarousel/CardCarousel";
import ProjectCard from "../organism/ProjectCard";
import { projectList } from "@/constants/project/project";

const ProjectsSectionView = () => {
  return (
    <section
      id="projects"
      className={`${styles.projectsSectionView} container`}
      aria-labelledby="projects-section-title"
    >
      <header>
        <h2
          id="projects-section-title"
          className={styles.projectsSectionView__title}
        >
          💻 Proyectos Personales
        </h2>
      </header>
      {projectList && (
        <CardCarousel carouselId="personal-projects" carouselName="proyectos personales">
          <>
            {projectList.map((project) => {
              return <ProjectCard key={project.id} project={project} />;
            })}
          </>
        </CardCarousel>
      )}
    </section>
  );
};

export default ProjectsSectionView;
