import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components";
import { Footer } from "../../containers";
import "./pet.css";

function Pet() {
  const [pets, setPets] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const baseURL = `http://localhost:3333/pets/${id}`;
    const fetchData = async () => {
      const response = await fetch(baseURL);
      const data = await response.json();
      setPets(data);
      console.log(data);
    };
    fetchData();
  }, [id]);

  const petImageLinks = (pets.petImages || []).map(
    ({ petImageLink }) => petImageLink
  );
  console.log("links: ", petImageLinks);

  return (
    <>
      <Navbar />
      <section className="pet__main_container">
        <div className="pet__gallery_container">
          <div className="pet__gallery_img_container">
            <div
              className="pet__gallery_image"
              style={{
                background: `url(${petImageLinks[0]})`,
              }}
            ></div>
          </div>

          <div className="pet__gallery_img_container">
            <div
              className="pet__gallery_image"
              style={{
                background: `url(${petImageLinks[1]})`,
              }}
            ></div>
          </div>

          <div className="pet__gallery_img_container">
            <div
              className="pet__gallery_image"
              style={{
                background: `url(${petImageLinks[2]})`,
              }}
            ></div>
          </div>

          <div className="pet__gallery_img_container">
            <div
              className="pet__gallery_image"
              style={{
                background: `url(${petImageLinks[3]})`,
              }}
            ></div>
          </div>
        </div>

        <div className="pet__main_content">
          <h3 className="pet__intro">Hola, soy</h3>
          <h2 className="pet__main_title pet__name">{pets.petName}</h2>

          <div className="pet__card_container">
            <div className="pet__card">
              <h5>Edad</h5>
              <p>{pets.petAge}</p>
            </div>

            <div className="pet__card">
              <h5>Genero</h5>
              <p>{pets.petGender}</p>
            </div>

            <div className="pet__card">
              <h5>Tamaño</h5>
              <p>{pets.petSize}</p>
            </div>

            <div className="pet__card">
              <h5>Condición</h5>
              <p>{pets.petSpecialCondition}</p>
            </div>
          </div>

          <div className="pet__text_container">
            <h3 className="pet__title pet__heading2">Cómo soy</h3>
            <p>{pets.description}</p>
            <a
              href="http://localhost:3000/adopta/formulario"
              className="btn btn-danger"
            >
              Adóptame
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Pet;
