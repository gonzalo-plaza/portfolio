import Image from "next/image";

import TitleAnimation from "@/components/main-section/_components/TitleAnimation";

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
          alt="Gonzalo Plaza Rueda - Software Engineer"
          priority
          quality={100}
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
          </span>
        </h1>
        <p className={styles.mainSectionDescription__text}>
          Sofware Engineer con +3 años de experiencia en Málaga, España. He
          desarrollado distintos proyectos de frontend de diversos tipos, dónde
          los más destacables han sido implementados en Ecommerce
        </p>
      </div>
    </section>
  );
}
