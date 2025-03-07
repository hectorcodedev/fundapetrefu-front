import React from "react";
import LogoutButton from "../logout/Logout";

const NavbarAdmin = () => {
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Fundapet
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
              <li className="nav-item">
                <a className="nav-link" href="/modulo/usuarios">
                  Usuarios
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/modulo/noticias">
                  Noticias
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/modulo/nosotros">
                  Nosotros
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/modulo/ayuda">
                  Ayúdanos
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/modulo/adoptantes">
                  Adoptantes
                </a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="/modulo/colaboradores">
                  Colaboradores
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mascotas
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/modulo/mascotas">
                      General
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/modulo/mascotas/imagenes"
                    >
                      Imágenes
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Formulario
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/modulo/candidatos">
                      Candidatos
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/modulo/encuestas">
                      Encuestas
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Reportes
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a
                      className="dropdown-item"
                      href="/modulo/reportes/adoptados"
                    >
                      Adoptados
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/modulo/reportes/destacados"
                    >
                      Destacados
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <LogoutButton />
        </div>
      </nav>
    </>
  );
};

export default NavbarAdmin;
