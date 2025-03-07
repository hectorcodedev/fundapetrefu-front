import React, { useState, useEffect } from "react";
import Carousel from "better-react-carousel";
import { FaCheckCircle } from "react-icons/fa";
import "./featuredCarousel.css";

function FeaturedCarousel() {
  const [featuredPets, setFeaturedPets] = useState([]);

  const baseURL = "http://localhost:3333/pets/featured";

  const fetchData = async () => {
    const response = await fetch(baseURL);
    const data = await response.json();
    setFeaturedPets(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const responsiveLayout = [
    { breakpoint: 550, cols: 1, rows: 1, gap: 3, loop: true },
    { breakpoint: 850, cols: 2, rows: 1, gap: 3, loop: true },
  ];

  return (
    <>
      <Carousel
        cols={3}
        rows={1}
        gap={10}
        loop
        responsiveLayout={responsiveLayout}
      >
        {featuredPets.map((pet) => (
          <Carousel.Item key={pet.id}>
            <a href={`mascota/${pet.id}`}>
              <div className="card__container">
                <div className="card__title">
                  <p className="card__pet_name">{pet.petName}</p>
                </div>
                <div className="card__body">
                  <img src={pet.featuredImg} alt={pet.petName} />
                </div>
                <div className="card__footer">
                  <div className="item__container">
                    <p className="card__pet_chars">
                      <FaCheckCircle className="check-circle" />
                      {pet.petGender}
                    </p>
                  </div>
                  <div className="item__container">
                    <p className="card__pet_chars">
                      <FaCheckCircle className="check-circle" />
                      {pet.petAge}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default FeaturedCarousel;
