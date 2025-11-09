import Image from "next/image";

import styles from "@/styles/components/ui/organism/project-card.module.scss";
import clsx from "clsx";
import Badge from "../atoms/Badge";
import { Project, ProjectTechonology } from "@/models/project/project";
import Button from "../atoms/Button";
import Link from "next/link";
import AnchorIcon from "../atoms/icons/AnchorIcon";
import GithubIcon from "../atoms/icons/GithubIcon";

interface ProjectCardProps {
  project: Project;
  extraClass?: string;
}

const ProjectCard = ({ project, extraClass }: ProjectCardProps) => {
  return (
    <article className={clsx(styles.projectCard, extraClass)}>
      <Image
        src={project.imageUrl}
        alt={project.imageAlt}
        width={330}
        height={292}
        className={styles.projectCard__image}
      />
      <header className={styles.projectCard__header}>
        <h3 className={styles.projectCard__title}>{project.title}</h3>
      </header>
      <ul className={styles.projectCard__technologyList}>
        {project.projectTechnologyBadgeList.map(
          (projectTechnolyBadge: ProjectTechonology, index) => {
            const projectTechnologyBadgeIcon = projectTechnolyBadge.icon;
            return (
              <li key={index}>
                <Badge
                  Icon={projectTechnologyBadgeIcon?.Component}
                  variant="custom"
                  backgroundColor={projectTechnolyBadge.backgroundColor}
                  {...(projectTechnologyBadgeIcon?.width
                    ? {
                        iconWidth: projectTechnologyBadgeIcon.width,
                      }
                    : {})}
                  {...(projectTechnologyBadgeIcon?.height
                    ? {
                        iconHeight: projectTechnologyBadgeIcon.height,
                      }
                    : {})}
                >
                  {projectTechnolyBadge.text}
                </Badge>
              </li>
            );
          }
        )}
      </ul>
      <p className={styles.projectCard__content}>{project.description}</p>
      <footer className={styles.projectCardFooter}>
        {project.previewLink && (
          <Button
            asChild
            disabled={project.previewLink.disabled}
            className={styles.projectCardFooter__button}
            buttonDisabledWrapperClassName={
              styles.projectCardFooter__buttonDisabledWrapper
            }
            aria-label={`Visitar ${project.title}`}
          >
            <Link
              href={project.previewLink.url}
              title={project.previewLink.title}
              rel="noopener noreferrer"
              target="_blank"
            >
              <AnchorIcon width={16} height={16} /> Visitar
            </Link>
          </Button>
        )}
        {project.gitHubLink && (
          <Button
            asChild
            disabled={project.gitHubLink.disabled}
            className={styles.projectCardFooter__button}
            buttonDisabledWrapperClassName={
              styles.projectCardFooter__buttonDisabledWrapper
            }
            aria-label={`Ver repositorio de ${project.title}`}
          >
            <Link
              href={project.gitHubLink.url}
              title={project.gitHubLink.title}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon width={20} height={20} /> Repositorio
            </Link>
          </Button>
        )}
      </footer>
    </article>
  );
};

export default ProjectCard;
