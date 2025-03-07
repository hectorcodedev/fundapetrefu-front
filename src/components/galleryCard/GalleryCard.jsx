import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./galleryCard.css";
import axios from "axios";

function GalleryCard() {
  const [pets, setPets] = useState([]);
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:3333/pets";
      try {
        const response = await axios.get(url);
        setPets(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filteredPets = pets.filter(
    (pet) =>
      (!speciesFilter || pet.petSpecies === speciesFilter) &&
      (!genderFilter || pet.petGender === genderFilter) &&
      (!ageFilter || pet.petAge === ageFilter) &&
      (!sizeFilter || pet.petSize === sizeFilter)
  );

  const handleSpeciesChange = (event) => {
    setSpeciesFilter(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGenderFilter(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAgeFilter(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSizeFilter(event.target.value);
  };

  return (
    <>
      <div className="section d-flex justify-content-center">
        <div className="filters d-flex">
          <div className="m-3 d-flex">
            <label className="col-form-label">Especie:</label>
            <select
              className="ms-1 form-select"
              value={speciesFilter}
              onChange={handleSpeciesChange}
            >
              <option value="">Cualquiera</option>
              <option value="PERRO">Perro</option>
              <option value="GATO">Gato</option>
            </select>
          </div>

          <div className="m-3 d-flex">
            <label className="col-form-label">Género:</label>
            <select
              className="ms-1 form-select"
              value={genderFilter}
              onChange={handleGenderChange}
            >
              <option value="">Cualquiera</option>
              <option value="MACHO">Macho</option>
              <option value="HEMBRA">Hembra</option>
            </select>
          </div>

          <div className="m-3 d-flex">
            <label className="col-form-label">Edad:</label>
            <select
              className="ms-1 form-select"
              value={ageFilter}
              onChange={handleAgeChange}
            >
              <option value="">Cualquiera</option>
              <option value="CACHORRO">Cachorro</option>
              <option value="ADULTO">Adulto</option>
              <option value="SENIOR">Senior</option>
            </select>
          </div>

          <div className="m-3 d-flex">
            <label className="col-form-label">Tamaño:</label>
            <select
              className="ms-1 form-select"
              value={sizeFilter}
              onChange={handleSizeChange}
            >
              <option value="">Cualquiera</option>
              <option value="GRANDE">Grande</option>
              <option value="MEDIANO">Mediano</option>
              <option value="PEQUENO">Pequeño</option>
            </select>
          </div>
        </div>
      </div>

      <div className="gal__card_container_main">
        {filteredPets.map((pet) => (
          <div className="gal__card_container animate__pulse" key={pet.id}>
            <Link to={`/mascota/${pet.id}`}>
              <div className="gal__card_body">
                <img
                  src={
                    pet.petImages.length > 0
                      ? pet.petImages[0].petImageLink
                      : ""
                  }
                  alt="Perro"
                />
                <div className="gal__card_footer">
                  <p className="gal__card_title">{pet.petName}</p>
                  <div className="gal__card_chars">
                    <p>{pet.petGender}</p>
                    <p>{pet.petAge}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default GalleryCard;
