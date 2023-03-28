import React from "react";
import NavBar from "../../components/navBar/NavBar";
import Categories from "../../components/categories/Categories";
import Products from "../../components/products/Products";
import NewsLetter from "../../components/newsletter/NewsLetter";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBar />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
    </motion.div>
  );
};

export default Home;
