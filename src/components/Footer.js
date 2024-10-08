import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Explore</h3>
        <ul>
          <li>Home</li>
          <li>Questions</li>
          <li>Articles</li>
          <li>Tutorials</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Support</h3>
        <ul>
          <li>FAQs</li>
          <li>Help</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Stay connected</h3>
        <div className="social-icons">
          <img src={require('../images/facebook.png')} alt="Facebook" className="icon" />
          <img src={require('../images/twitter.png')} alt="Twitter" className="icon" />
          <img src={require('../images/instagram.png')} alt="Instagram" className="icon" />
        </div>
      </div>
      <div className="footer-bottom">
        <p>DEV@Deakin 2024</p>
        <div className="footer-bottom-links">
          <span>Privacy Policy</span>
          <span>Terms</span>
          <span>Code of Conduct</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
