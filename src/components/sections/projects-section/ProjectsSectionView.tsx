import styles from "@/styles/components/sections/projects-section/projects-section-view.module.scss";
import CardCarousel from "@/components/ui/organism/CardCarousel/CardCarousel";
import ProjectCard from "@/components/ui/organism/ProjectCard";
import { projectList } from "@/constants/project/project";
import type { Dictionary } from "@/i18n/types";

interface ProjectsSectionViewProps {
  dict: Dictionary["projects"];
}

const ProjectsSectionView = ({ dict }: ProjectsSectionViewProps) => {
  const labels = {
    visit: dict.visit,
    repository: dict.repository,
    visitAria: dict.visitAria,
    repositoryAria: dict.repositoryAria,
  };

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
          {dict.title}
        </h2>
      </header>
      {projectList && (
        <CardCarousel
          carouselId="personal-projects"
          skipLabel={dict.skip}
          skipEndLabel={dict.skipEnd}
        >
          <>
            {projectList.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                content={dict.items[project.key]}
                labels={labels}
              />
            ))}
          </>
        </CardCarousel>
      )}
    </section>
  );
};

export default ProjectsSectionView;
