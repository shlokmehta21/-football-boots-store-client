import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navBar/NavBar";
import NewsLetter from "../../components/newsletter/NewsLetter";
import Products from "../../components/products/Products";
import "./ProductList.scss";
import { useState } from "react";
import { motion } from "framer-motion";

const ProductList = () => {
  const location = useLocation();
  const category: string = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState<string>("newest");

  const handleFilters = (event: React.FormEvent) => {
    const value = (event.target as HTMLSelectElement).value;
    setFilters({
      ...filters,
      [(event.target as HTMLSelectElement).name]: value,
    });
  };

  return (
    <motion.div
      className="ProductListContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBar />
      <h1 style={{ textTransform: "uppercase" }}>{category} FOOTBALL</h1>
      <div className="filterContainer">
        <div className="filter">
          <span className="filterText">Filter Products:</span>
          <select
            defaultValue="Color"
            name="color"
            id="coloroptions"
            onChange={handleFilters}
          >
            <option disabled>Color</option>
            <option>White</option>
            <option>Black</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Yellow</option>
            <option>Green</option>
          </select>

          <select
            defaultValue="Size"
            name="size"
            id="sizeoptions"
            onChange={handleFilters}
          >
            <option disabled>Size</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>

        <div className="filter">
          <span className="filterText">Sort Products:</span>
          <select
            defaultValue="Newest"
            name="sort"
            id="sort"
            onChange={(event: React.FormEvent) => {
              setSort((event.target as HTMLSelectElement).value);
            }}
          >
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <Products category={category} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </motion.div>
  );
};

export default ProductList;
