import { Item } from "../../types/Item";
import "./CartItem.scss";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCartItem } from "../../redux/cartSlice";

const CartItem = (props: { product: Item; index: number }) => {
  const cartItems = useAppSelector((state) => state.cart.products);

  const handleDelete = (index: number) => {
    let obj: Item = Object.assign({}, cartItems[index]);

    dispatch(
      deleteCartItem({
        id: props.product._id,
        total: obj.price * obj.quantity,
        index: props.index,
      })
    );
  };

  const dispatch = useAppDispatch();
  return (
    <div className="product">
      <div className="productDetail">
        <img src={props.product.img} alt="prodImg" />
        <div className="details">
          <span className="productName">
            <b>Product:</b> {props.product.title}
          </span>

          <span style={{ overflowWrap: "anywhere" }} className="productId">
            <b>ID:</b> {props.product._id}
          </span>

          <div
            className="productColor"
            style={{ backgroundColor: props.product.color }}
          ></div>

          <span className="productSize">
            <b>Size:</b> {props.product.size}
          </span>
        </div>
      </div>

      <div className="priceDetail">
        <DeleteIcon
          className="DeleteIcon"
          onClick={() => {
            handleDelete(props.index);
          }}
        />
        <div className="productAmountContainer">
          <div className="productAmount">
            <b>Quantity:</b> {props.product.quantity}
          </div>
        </div>

        <div className="productPrice">
          $ {props.product.price * props.product.quantity}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
