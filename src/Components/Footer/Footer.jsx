import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import footer_Logo from "../../image/evangadi-logo-footer.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="main-footer">
      <div className="footer">
        <div className="left-menu">
          <img src={footer_Logo} alt="footer logo" />
          <div className="footer-icons">
            <Link>
              <FaFacebookF />
            </Link>
            <Link>
              <FaInstagram />
            </Link>
            <Link>
              <FaYoutube />
            </Link>
          </div>
        </div>
        <div className="middle-menu">
          <h4>Usefull Link</h4>
          <ul>
            <li>
              <Link>How its Works</Link>
            </li>
            <li>
              <Link> Term of Service</Link>
            </li>
            <li>
              <Link> Privacy policy</Link>
            </li>
          </ul>
        </div>
        <div className="right-menu">
          <h4>Contact info</h4>
          <div className="contact-list">
            <p>Evangadi Networks</p>
            <p>support@evangadi.com</p>
            <p>+1-202-386-2702</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
