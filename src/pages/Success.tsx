import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMehtods";
import { Link } from "react-router-dom";
import { deleteCartAfterPayment } from "../redux/cartSlice";
import { motion } from "framer-motion";

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(response.data._id);
        dispatch(deleteCartAfterPayment());
      } catch (error) {
        console.log(error);
      }
    };

    data && createOrder();
  }, [cart, data, currentUser, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/">
        <button
          style={{
            padding: 10,
            marginTop: 20,
            color: "white",
            backgroundColor: "black",
          }}
        >
          Go to Homepage
        </button>
      </Link>
    </motion.div>
  );
};

export default Success;
