import styles from "@/styles/components/about-me-section/about-me-section.module.scss";
import clsx from "clsx";
import Image from "next/image";

const AboutMeSectionView = () => {
  return (
    <section className={clsx(styles.aboutMeSectionView, "container")}>
      <header>
        <h2 className={styles.aboutMeSectionView__title}>🧑🏽‍💻 Sobre mí</h2>
      </header>
      <article className={styles.aboutMeArticle}>
        <Image
          src="/images/gonzalo-plaza--rueda-developer.jpg"
          className={styles.aboutMeArticle__image}
          height={300}
          width={300}
          alt="Gonzalo Plaza"
        />
        <div>
          <p className={styles.aboutMeArticleDescription}>
            Soy{" "}
            <strong className={styles.aboutMeArticleDescription__highlight}>
              Gonzalo Plaza
            </strong>
            , Software Engineer con pasión por crear aplicaciones web y explorar
            nuevas tecnologías.{" "}
            <strong className={styles.aboutMeArticleDescription__highlight}>
              Me enfoco en aportar valor a través de mis proyectos, con
              mentalidad curiosa y aprendizaje constante.
            </strong>{" "}
          </p>
          <p className={styles.aboutMeArticleDescription}>
            Aunque{" "}
            <strong className={styles.aboutMeArticleDescription__highlight}>
              mi carrera profesional como desarrollador comenzó hace 3 años{" "}
            </strong>
            , mi vínculo con la tecnología viene de mucho antes.{" "}
            <strong className={styles.aboutMeArticleDescription__highlight}>
              Hace más de 9 años empecé reparando equipos{" "}
            </strong>{" "}
            tanto a nivel software como hardware, además de asesorar a clientes
            en la elección de sus dispositivos.
          </p>
        </div>
      </article>
    </section>
  );
};

AboutMeSectionView.displayName = "AboutMeSectionView";

export default AboutMeSectionView;
