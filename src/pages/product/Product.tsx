import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navBar/NavBar";
import NewsLetter from "../../components/newsletter/NewsLetter";
import "./Product.scss";
import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMehtods";
import { Item } from "../../types/Item";
import { useAppDispatch } from "../../redux/Hooks";
import { addProduct } from "../../redux/cartSlice";
import { motion } from "framer-motion";

const Product = () => {
  const location = useLocation();
  const productId: string = location.pathname.split("/")[2];
  const [product, setProduct] = useState<Item>({});
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const colorOptions = product.color;
  const sizeOptions = product.size?.split(",");
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    const getProduct = async () => {
      try {
        const response = await publicRequest.get(`/products/find/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error.body);
      }
    };

    getProduct();
  }, [productId]);

  const handleQuantity = (handleType: string) => {
    if (handleType === "dec") {
      quantity <= 1 ? setQuantity(quantity) : setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <motion.div
      className="singleProductContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBar />
      <div className="productWrapper">
        <div className="imgContainer">
          <img src={product.img} alt="Product" />
        </div>

        <div className="infoContainer">
          <h2>{product.title}</h2>
          <p>{product.desc}</p>
          <span className="price">$ {product.price}</span>

          <div className="filterContainer">
            <div className="filter">
              <h3 className="filterTitle">Color</h3>
              {colorOptions?.split(" ")?.map((c) => (
                <div
                  key={c}
                  className="colorOptions"
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                ></div>
              ))}
            </div>

            <div className="filter">
              <h3 className="filterTitle">Size</h3>
              <select
                onChange={(event: React.FormEvent) =>
                  setSize(
                    event.target
                      ? (event.target as HTMLSelectElement).value
                      : sizeOptions[0]
                  )
                }
              >
                <option>Size</option>
                {sizeOptions?.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* add */}
          <div className="addContainer">
            <div className="amountContainer">
              <Remove onClick={() => handleQuantity("dec")} />
              <div className="amount">{quantity}</div>
              <Add onClick={() => handleQuantity("inc")} />
            </div>
            <button onClick={handleClick}>ADD TO CART</button>
          </div>
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </motion.div>
  );
};

export default Product;
