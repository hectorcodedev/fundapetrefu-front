import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import "./navbar.css";
import fundapetLogo from "../../assets/fundapetLogo.png";
import { Link } from "react-router-dom";

const Menu = () => (
  <>
    <a href="/">
      <p className="menu__link">Inicio</p>
    </a>
    <a href="/adopta">
      <p className="menu__link">Adopta</p>
    </a>
    <a href="/nosotros">
      <p className="menu__link">Nosotros</p>
    </a>
    <a href="/noticias">
      <p className="menu__link">Noticias</p>
    </a>
    <a href="/ayuda">
      <p className="menu__link">Ayudar</p>
    </a>
  </>
);

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="navbar__main">
      <a href="/">
        <div className="navbar__links_logo">
          <img src={fundapetLogo} alt="logo" />
        </div>
      </a>
      <div className="navbar__links">
        <div className="navbar__links_container">
          <Menu />
        </div>
      </div>
      <Link to="/login">
        <button className="ms-3 btn btn-info">Ingresar</button>
      </Link>

      <div className="navbar__menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#566D7F"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#566D7F"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar__menu_container scale_up_center">
            <div className="navbar__menu_container_links">
              <Menu />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
