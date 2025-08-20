import homeStyles from "@/app/styles/home.module.scss";

export default function Home() {
  console.log(homeStyles);
  return (
    <main>
      <section className={`container`}>
        <div>
          <h1>
            👋 Hey, soy{" "}
            <span className={`${homeStyles.homeSection__mainTitleHighlight}`}>
              Gonzalo Plaza Rueda
            </span>
          </h1>
          <p>
            Sofware Engineer con +3 años de experiencia en Málaga, España. He
            desarrollado distintos proyectos de frontend de diversos tipos,
            dónde los más destacables han sido implementados en Ecommerce
          </p>
        </div>
      </section>
    </main>
  );
}
