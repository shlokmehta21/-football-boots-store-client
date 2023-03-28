import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import "./styles/Global.css";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProductList from "./pages/productlist/ProductList";
import Success from "./pages/Success";
import { useAppSelector } from "./redux/Hooks";

import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
