import React from "react";
import { Item } from "../../types/Item";
import "./CategoryItem.scss";
import { Link } from "react-router-dom";

interface Props {
  item: Item;
}

const CategoryItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="categoryContainer">
      <Link to={`/products/${item.categories}`}>
        <img src={item.img} alt="IMG" />
        <div className="info">
          <h3>{item.title}</h3>
          <button>SHOW NOW</button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
