import React, { useState, useEffect } from "react";
import { Navbar } from "../../components";
import { Footer } from "../../containers";
import axios from "axios";

const baseUrl = "http://localhost:3333";
const customersUrl = `${baseUrl}/supports`;

const Support = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(customersUrl)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container pt-5 d-flex flex-column">
        <div className="d-flex flex-column text-center mb-5">
          <h4 className="text-secondary mb-3">De esta forma</h4>
          <h2 className="display-4 m-0">
            Puedes <span className="text-primary">Ayudar</span>
          </h2>
          <div className="d-flex justify-content-center">
            <a href="/contacto" className="btn btn-primary mt-5">
              Contáctanos
            </a>
          </div>
        </div>

        <div className="p-3 d-flex flex-wrap justify-content-center">
          {data.map((item, index) => (
            <div
              className="card"
              style={{
                width: 18 + "rem",
                height: 500 + "px",
                margin: 1 + "rem",
              }}
              key={index}
            >
              <img
                src={item.supportImg}
                className="card-img-top"
                alt={item.supportTitle}
              />
              <div className="card-body">
                <h5 className="card-title">{item.supportTitle}</h5>
                <p className="card-text">{item.supportContent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Support;
