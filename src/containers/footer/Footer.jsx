import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <div className="footer__container">
      <div className="footer__left">
        <div className="footer__text">
          <p className="footer__text_donation">
            Hecho con <span className="footer__text_heart"><FaHeart /></span> por 
            <a
              href="https://www.linkedin.com/in/hectorvcode/"
              target="_blank"
              rel="noreferrer"
            >
              <span> hectorvcode</span>
            </a>
          </p>
          <p className="footer_text_copyright">
            2023 Todos los derechos reservados, Fundapet Refugio
          </p>
        </div>
      </div>
      <div className="footer__right">
        <a
          href="https://web.facebook.com/profile.php?id=100070042311934"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookSquare />
        </a>
        <a
          href="https://www.instagram.com/fundapetrefu"
          target="_blank"
          rel="noreferrer"
        >
          <span><AiFillInstagram /></span>
        </a>
        <a
          href="mailto:fundapetrefu@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <MdEmail />
        </a>
      </div>
    </div>
  );
}

export default Footer;
