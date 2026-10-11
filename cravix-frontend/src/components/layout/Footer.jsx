import "./Footer.css";

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* =========================
            TOP SECTION
        ========================== */}

        <div className="footer-top">

          {/* Logo */}

          <div className="footer-about">

            <h2 className="footer-logo">
              Cravix
            </h2>

            <p className="footer-description">
              Cravix makes food ordering simple, fast and enjoyable.
              Discover top-rated restaurants, order your favorite meals,
              and enjoy quick delivery with a modern experience built
              for food lovers.
            </p>

            <div className="footer-social">

              <a href="#" className="social-icon">
                <FaFacebookF />
              </a>

              <a href="#" className="social-icon">
                <FaInstagram />
              </a>

              <a href="#" className="social-icon">
                <FaXTwitter />
              </a>

              <a href="#" className="social-icon">
                <FaYoutube />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div className="footer-column">

            <h3 className="footer-heading">
              Quick Links
            </h3>

            <ul className="footer-links">

              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/restaurants" className="footer-link">
                  Restaurants
                </Link>
              </li>

              <li>
                <Link to="/cart" className="footer-link">
                  Cart
                </Link>
              </li>

              <li>
                <Link to="/orders" className="footer-link">
                  Orders
                </Link>
              </li>

              <li>
                <Link to="/profile" className="footer-link">
                  Profile
                </Link>
              </li>

            </ul>

          </div>

          {/* Categories */}

          <div className="footer-column">

            <h3 className="footer-heading">
              Categories
            </h3>

            <ul className="footer-links">

              <li>Pizza</li>
              <li>Burgers</li>
              <li>Biryani</li>
              <li>Momos</li>
              <li>Desserts</li>

            </ul>

          </div>

          {/* Contact */}

          <div className="footer-column">

            <h3 className="footer-heading">
              Contact
            </h3>

            <div className="footer-contact">

              <div className="contact-item">
                <Mail size={18} />
                <span>support@cravix.com</span>
              </div>

              <div className="contact-item">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="contact-item">
                <MapPin size={18} />
                <span>Noida, Uttar Pradesh, India</span>
              </div>

            </div>

          </div>

        </div>

        {/* =========================
            NEWSLETTER
        ========================== */}

        <div className="newsletter">

          <div className="newsletter-content">

            <h3 className="newsletter-title">
              Subscribe to our Newsletter
            </h3>

            <p className="newsletter-text">
              Get exclusive offers, discounts and new restaurant updates.
            </p>

          </div>

          <div className="newsletter-form">

            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />

            <button className="newsletter-btn">
              Subscribe
            </button>

          </div>

        </div>

        {/* =========================
            FOOTER BOTTOM
        ========================== */}

        <div className="footer-bottom">

          <p className="copyright">
            © {new Date().getFullYear()} Cravix. All rights reserved.
          </p>

          <div className="footer-bottom-links">

            <a href="#" className="footer-link">
              Privacy Policy
            </a>

            <a href="#" className="footer-link">
              Terms & Conditions
            </a>

            <a href="#" className="footer-link">
              Cookies
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;