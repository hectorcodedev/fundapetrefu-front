import React, { useState, useEffect } from "react";
import { Navbar } from "../../components";
import { Footer } from "../../containers";
import axios from "axios";
import "./aboutUs.css";

const baseUrl = "http://localhost:3333";
const customersUrl = `${baseUrl}/shelter-contents`;

const AboutUs = () => {
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
      <div id="about" className="about">
        {data.map((item, index) => (
          <div className="container-fluid" key={index}>
            <div
              className={`row d_flex mb-5 ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="d-flex justify-content-center align-items-center col-md-6">
                <div className="about_img">
                  <figure>
                    <img src={item.infoImgLink} alt={item.titleName} />
                  </figure>
                </div>
              </div>
              <div className="d-flex align-items-center col-md-6">
                <div className="titlepage">
                  <h2 className="blue">{item.infoTitle}</h2>
                  <p>{item.infoContent}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
