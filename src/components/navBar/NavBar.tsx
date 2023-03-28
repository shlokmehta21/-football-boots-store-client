import Badge from "@mui/material/Badge";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FilaLogo from "../../assets/logo.png";
import "./NavBar.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { Link } from "react-router-dom";
import { logout } from "../../redux/userSlice";

const NavBar: React.FC = () => {
  const quantity = useAppSelector((state) => state.cart.quantity);
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();

  return (
    <div className="navBarContainer">
      <div className="wrapper">
        <div className="left">
          <Link to="/">
            <img className="logo" src={FilaLogo} alt="Logo" />
          </Link>
        </div>
        <div className="right">
          {user ? (
            <LogoutIcon
              className="menuItemLogout"
              onClick={() => dispatch(logout())}
            />
          ) : (
            <>
              <Link style={{ textDecoration: "none" }} to="/login">
                <div className="menuItem">LOGIN</div>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/register">
                <div className="menuItem">REGISTER</div>
              </Link>
            </>
          )}

          <Badge badgeContent={quantity} color="primary">
            <Link to="/cart">
              <LocalMallIcon className="cartIcon" />
            </Link>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
