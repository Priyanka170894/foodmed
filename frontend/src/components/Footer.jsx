

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h4>About FoodMedin</h4>
            <p>FoodMedin is your companion to healthier choices. We provide detailed information on food items and their health benefits, helping you live a better and stronger life.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/home">Home</a></li>
              <li><a href="/products">Browse Products</a></li>
              
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li><a href="mailto:support@foodmedin.com">support@foodmedin.com</a></li>
              <li><a href="tel:+1234567890">+123-456-7890</a></li>
              <li><a href="/">123 Food Street, Healthy City</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 FoodMedin. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
