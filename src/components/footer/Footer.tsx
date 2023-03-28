import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import "./Footer.scss";
import FilaLogo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="left">
        <img src={FilaLogo} alt="Logo" />
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </p>

        <div className="socialContainer">
          <Facebook className="socialIcon" />
          <Instagram className="socialIcon" />
          <Twitter className="socialIcon" />
          <Pinterest className="socialIcon" />
        </div>
      </div>
      <div className="center">
        <h2>USEFUL LINKS</h2>
        <ul>
          <li>Home</li>
          <li>Cart</li>
          <li>Man</li>
          <li>Woman</li>
          <li>Accessories</li>
          <li>My Account</li>
          <li>Order Tracking</li>
          <li>Wishlist</li>
          <li>Wishlist</li>
          <li>Terms</li>
        </ul>
      </div>
      <div className="right">
        <h2>CONTACT</h2>
        <div className="contactItem">
          <Room />
          622 Dixie Path , South Tobinchester 98336
        </div>

        <div className="contactItem">
          <Phone />
          +1 234 56 78
        </div>

        <div className="contactItem">
          <MailOutline />
          contact@shlok.dev
        </div>
        <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="PAY" />
      </div>
    </div>
  );
};

export default Footer;
