import React from "react";
import { GalleryCard } from "../../components";
import { Navbar, FeaturedCarousel } from "../../components";
import { Footer } from "../../containers";
import "./adopt.css";

function Adopt() {
  return (
    <>
      <Navbar />
      <div className="adopt__container">
        <section className="adopt__featured">
          <h1 className="mt-5 adopt__featured_title featured__titles">
            Perros y Gatos en Adopción
          </h1>

          <p className="adopt__featured_subtitle featured__titles">
            Visítanos en Bogotá
          </p>

          <div className="adopt__img_container">
            <img
              className="adopt__img second__img third__img"
              src="https://i.postimg.cc/0QQFsrtZ/beauty03.jpg"
              alt="girl with two dogs"
            />

            <img
              className="adopt__img third__img"
              src="https://i.postimg.cc/fRc67Gt7/beauty01.jpg"
              alt="girl with two dogs"
            />

            <img
              className="adopt__img"
              src="https://i.postimg.cc/ZnvQW2zd/Beautiful-Adopter.jpg"
              alt="girl with two dogs in a harbour"
            />

            <img
              className="adopt__img third__img"
              src="https://i.postimg.cc/cJdPFFwp/beauty02.jpg"
              alt="girl with two dogs"
            />

            <img
              className="adopt__img second__img third__img"
              src="https://i.postimg.cc/5tpTT8m6/beauty04.jpg"
              alt="girl with two dogs"
            />
          </div>

          <div className="adopt__featured_text">
            <p className="adopt__featured_subtitle featured__titles">
              Nuestros
            </p>
            <h2 className="adopt__featured_title featured__titles">
              Peludos Destacados
            </h2>
            <hr className="adopt__separator" />
          </div>

          <div className="adopt__carousel_container">
            <FeaturedCarousel />
          </div>
        </section>

        <section className="adopt__all">
          <p className="adopt__featured_title featured__titles">
            Tu Próximo Amigo
          </p>
          <div className="gal__card_container">
            <GalleryCard />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Adopt;
