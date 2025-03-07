import React from "react";
import "./colorPalette.css";

function ColorPalette() {
  return (
    <>
      <div className="color__container">
        <div className="color midnight">
          <h2>114955</h2>
          <p>Midnight Green Eagle Green</p>
        </div>
        <div className="color cyanProcess">
          <h2>28ADE2</h2>
          <p>Cyan Process</p>
        </div>
        <div className="color beau">
          <h2>BDD7EF</h2>
          <p>Beau Blue</p>
        </div>
        <div className="color turquoiseColor">
          <h2>3BD6C6</h2>
          <p>Turquoise</p>
        </div>
        <div className="color middlebg">
          <h2>A7F1E3</h2>
          <p>Middle Blue Green</p>
        </div>
      </div>
    </>
  );
}

export default ColorPalette;
