import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
  <div className="footer-container">

    <div className="footer-brand">
      <h3>Fork & Fame</h3>
      <p>Your daily dose of delicious recipes, crafted for food lovers.</p>
    </div>

    <div className="footer-section">
      <h4>Explore</h4>
      <ul className="footer-links">
        <li><a href="/recipes">Menu</a></li>
        <li><a href="/reviews">Reviews</a></li>
        <li><a href="/services">Services</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>Contact</h4>
      <div className="footer-contact">
        <p>📧 support@recipix.com</p>
        <p>📞 +91 98765 43210</p>
        <p>📍 India</p>
      </div>
    </div>

  </div>

  <div className="footer-divider"></div>

  <div className="footer-bottom">
    © {new Date().getFullYear()} Fork & Fame • All rights reserved
  </div>
</footer>

  );
}

export default Footer;
