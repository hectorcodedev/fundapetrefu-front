import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <>
      <section className="main__container">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </>
  );
};

export default Loader;
