import React, { useEffect, useState } from "react";
import Product from "../product/Product";
import "./Products.scss";
import axios from "axios";
import { CircularProgress } from "@mui/material";

interface Props {
  category?: string;
  filters?: {};
  sort?: string;
}

const Products: React.FC<Props> = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(filters);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          category
            ? `https://football-boots-store-api.vercel.app/api/products?category=${category}`
            : `https://football-boots-store-api.vercel.app/api/products`
        );
        setLoading(false);
        setProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      {loading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
      <div className="ListContainer">
        {category
          ? filteredProducts.map((item) => (
              <Product item={item} key={item._id} />
            ))
          : products
              .slice(0, 8)
              .map((item) => <Product item={item} key={item._id} />)}
      </div>
    </>
  );
};

export default Products;
