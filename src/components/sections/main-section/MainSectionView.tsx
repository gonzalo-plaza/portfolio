import Image from "next/image";

import TitleAnimation from "@/components/sections/main-section/_components/TitleAnimation";

import styles from "@/styles/components/main-section/main-section-view.module.scss";

export default function MainSectionView() {
  return (
    <section className={`${styles.mainSection} container`}>
      <div>
        <Image
          className={styles.mainSectionImage}
          src="/images/gonzalo_plaza_rueda_software_engineer.webp"
          width={250}
          height={250}
          alt="Retrato de Gonzalo Plaza Rueda, Software Engineer en Málaga, España"
          priority
          quality={100}
          fetchPriority="high"
        />
      </div>
      <div className={styles.mainSectionDescription}>
        <TitleAnimation />
        <h1 className={styles.mainSectionDescription__title}>
          👋 Hey, soy{" "}
          <span
            className={`${styles.mainSectionDescription__title} ${styles.isHighlight} js-mainSectionDescription__titleAnimation`}
            data-text="Gonzalo Plaza Rueda"
          >
            Gonzalo Plaza Rueda
          </span>{" "}
          <span
            className={`${styles.mainSectionDescription__title} ${styles.isDetail}`}
          >
            | Software Engineer
          </span>
        </h1>
        <p className={styles.mainSectionDescription__text}>
          Soy Software Engineer con más de 3 años de experiencia especializado
          en desarrollo frontend en Málaga, España. He trabajado en proyectos de
          Ecommerce y aplicaciones web, enfocándome en crear interfaces rápidas,
          accesibles y escalables.
        </p>
      </div>
    </section>
  );
}
