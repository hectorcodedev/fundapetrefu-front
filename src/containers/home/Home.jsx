import React from "react";
import heroDog from "../../assets/HeroDog.png";
import adopta from "../../assets/adopta.png";
import { Navbar } from "../../components";
import { Footer } from "../../containers";
import "./home.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="hero__background">
        <section className="hero__text_container">
          <h1 className="hero__text_title">Adopta con Fundapet</h1>
          <h2 className="hero__text_content">
            Rescatamos animales en condición de vulnerabilidad
          </h2>
        </section>
        <hr className="adopt__separator" />
        <div className="hero__content_container">
          <img
            className="hero__content_container_img_dog"
            src={heroDog}
            alt="Dog"
          />
          <div className="hero__content_section_container">
            <div className="hero__content_section">
              <a href="/adopta/formulario">
                <img
                  className="hero__content_container_img_logo rotate-scale-up-diag-1"
                  src={adopta}
                  alt="Logo"
                />
              </a>

              <div className="hero__content_text">
                <p>
                  <span>TU PRÓXIMO</span>
                </p>
                <p className="hero__content_text_cursiva">Amigo Peludo</p>
                <p>
                  <span>ESPERA POR TI</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
