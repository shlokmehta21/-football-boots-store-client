import NavBar from "../../components/navBar/NavBar";
import "./Cart.scss";
import { useAppSelector } from "../../redux/Hooks";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { useEffect, useState } from "react";
import FilaLogo from "../../assets/logo.png";
import { userRequest } from "../../requestMehtods";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/cartItem/CartItem";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.user.currentUser);
  const [stripeToken, setStripeToken] = useState(null);
  const KEY = process.env.REACT_APP_STRIPE;
  const navigate = useNavigate();

  const onToken: StripeCheckout["props"]["token"] = (token: Token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makePayment = async () => {
      try {
        const response = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });

        navigate("/success", {
          state: {
            stripeData: response.data,
            cart: cart,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makePayment();
  }, [cart, stripeToken, cart.total, navigate]);

  return (
    <motion.div
      className="cartContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBar />
      {cart.products.length !== 0 ? (
        <div className="cartWrapper">
          <h2>YOUR BAG</h2>
          <div className="top">
            <button onClick={() => navigate("/")}>CONTINUE SHOPPING</button>
            <div className="topTexts">
              <span className="topText">Shopping Bag ({cart.quantity})</span>
              <span className="topText">Your Wishlist (1)</span>
            </div>
            <button className="topButton">CHECKOUT NOW</button>
          </div>
          <div className="bottom">
            <div className="cartinfo">
              {cart.products.map((product, index) => (
                <CartItem key={index} product={product} index={index} />
              ))}
              <hr />
            </div>

            <div className="summary">
              <h2>ORDER SUMMARY</h2>

              <div className="summaryItem">
                <span className="summaryItemText">Subtotal</span>
                <span className="summaryItemPrice">$ {cart.total}</span>
              </div>

              <div className="summaryItem">
                <span className="summaryItemText">Estimated Shipping</span>
                <span className="summaryItemPrice">$ 6.90</span>
              </div>

              <div className="summaryItem">
                <span className="summaryItemText">Shipping Discount</span>
                <span className="summaryItemPrice">$ -6.90</span>
              </div>

              <div className="summaryItem total">
                <span className="summaryItemText">Total</span>
                <span className="summaryItemPrice">$ {cart.total}</span>
              </div>

              {user ? (
                <StripeCheckout
                  name="FILA"
                  image={FilaLogo}
                  billingAddress
                  shippingAddress
                  description={`Your total is $${cart.total}`}
                  amount={cart.total * 100}
                  stripeKey={KEY}
                  token={onToken}
                ></StripeCheckout>
              ) : (
                <button className="loginBtn" onClick={() => navigate("/login")}>
                  LOGIN
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="emptyCart">
          <h2>You Bag is Empty!</h2>
          <Link to="/">
            <button className="viewBtn">View Products</button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
