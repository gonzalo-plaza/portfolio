import Image from "next/image";

import styles from "@/styles/components/organism/project-card.module.scss";

interface ProjectCardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
}

const ProjectCard = ({
  imageUrl,
  imageAlt,
  title,
  description,
}: ProjectCardProps) => {
  return (
    <article className={styles.projectCard}>
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={512}
        height={292}
        className={styles.projectCard__image}
      />
      <header className={styles.projectCard__header}>
        <h3 className={styles.projectCard__title}>{title}</h3>
      </header>
      <p className={styles.projectCard__content}>{description}</p>
    </article>
  );
};

export default ProjectCard;
