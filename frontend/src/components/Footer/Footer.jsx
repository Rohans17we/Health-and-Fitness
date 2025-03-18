import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Logo and Description */}
          <div className="footer-section">
            <div className="footer-logo-container">
              <div className="footer-logo">
                <span>N</span>
              </div>
              <span className="footer-logo-text">NuHealth</span>
            </div>
            <p className="footer-description">
              Track daily routines, assess health, and experiment with training plans all while managing your smart fitness gear.
            </p>
            <div className="footer-social-icons">
              <a href="#" className="footer-social-icon" aria-label="Facebook">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="footer-social-icon" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="footer-social-icon" aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="footer-social-icon" aria-label="YouTube">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Product</h3>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">About us</Link></li>
              <li><Link to="/features" className="footer-link">Features</Link></li>
              <li><Link to="/app" className="footer-link">Get App</Link></li>
              <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links">
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="/help" className="footer-link">Help Center</Link></li>
              <li><Link to="/how-it-works" className="footer-link">How It Works</Link></li>
              <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3 className="footer-heading">Newsletter</h3>
            <p className="footer-description">Subscribe to our newsletter</p>
            <div className="footer-newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                className="footer-newsletter-input"
              />
              <button className="footer-newsletter-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">All rights reserved @nuhealth.io</p>
          <div className="footer-legal">
            <Link to="/terms" className="footer-legal-link">Terms & Conditions</Link>
            <Link to="/privacy" className="footer-legal-link">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;