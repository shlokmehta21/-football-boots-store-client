import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Item } from "../../types/Item";
import "./Product.scss";
import { Link } from "react-router-dom";

interface Props {
  item: Item;
}

const Product: React.FC<Props> = ({ item }) => {
  return (
    <div className="productContainer">
      <div className="circle"></div>
      <img src={item.img} alt="IMG" />
      <div className="info">
        <div className="icon">
          <ShoppingCartOutlined />
        </div>
        <div className="icon">
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </div>
        <div className="icon">
          <FavoriteBorderOutlined />
        </div>
      </div>
    </div>
  );
};

export default Product;
