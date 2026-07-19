import Image from "next/image";

import styles from "@/styles/components/ui/organism/project-card.module.scss";
import clsx from "clsx";
import Badge from "../atoms/Badge";
import { Project, ProjectTechonology } from "@/models/project/project";
import Button from "../atoms/Button";
import Link from "next/link";
import { AnchorIcon, GithubIcon } from "@/components/ui/atoms/icons";
import type { ProjectItemDictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/interpolate";

interface ProjectCardLabels {
  visit: string;
  repository: string;
  visitAria: string;
  repositoryAria: string;
}

interface ProjectCardProps {
  project: Project;
  content: ProjectItemDictionary;
  labels: ProjectCardLabels;
  extraClass?: string;
}

const ProjectCard = ({
  project,
  content,
  labels,
  extraClass,
}: ProjectCardProps) => {
  return (
    <article className={clsx(styles.projectCard, extraClass)}>
      <Image
        src={project.imageUrl}
        alt={content.imageAlt}
        width={330}
        height={292}
        className={styles.projectCard__image}
      />
      <header className={styles.projectCard__header}>
        <h3 className={styles.projectCard__title}>{content.title}</h3>
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
      <p className={styles.projectCard__content}>{content.description}</p>
      <footer className={styles.projectCardFooter}>
        {project.previewLink && (
          <Button
            asChild
            disabled={project.previewLink.disabled}
            className={styles.projectCardFooter__button}
            buttonDisabledWrapperClassName={
              styles.projectCardFooter__buttonDisabledWrapper
            }
            aria-label={interpolate(labels.visitAria, { project: content.title })}
          >
            <Link
              href={project.previewLink.url}
              title={content.previewTitle}
              rel="noopener noreferrer"
              target="_blank"
            >
              <AnchorIcon width={16} height={16} /> {labels.visit}
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
            aria-label={interpolate(labels.repositoryAria, {
              project: content.title,
            })}
          >
            <Link
              href={project.gitHubLink.url}
              title={content.gitHubTitle}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon width={20} height={20} /> {labels.repository}
            </Link>
          </Button>
        )}
      </footer>
    </article>
  );
};

export default ProjectCard;
