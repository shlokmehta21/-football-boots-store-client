import { useState } from "react";
import "./Login.scss";
import { login } from "../../redux/apiCalls";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setusernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useAppDispatch();
  const { isFetching, error } = useAppSelector((state) => state.user);
  const errors = [];
  const validateFeilds = () => {
    if (username === "") {
      setusernameError(true);
      errors.push("Username Error");
    }

    if (password === "") {
      setPasswordError(true);
      errors.push("passowrd Error");
    }
  };

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    validateFeilds();
    if (errors.length === 0) {
      login(dispatch, { username, password });
      setUsername("");
      setPassword("");
    }
  };

  return (
    <motion.div
      className="loginContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loginWrapper">
        <h1>SIGN IN</h1>
        <form className="loginForm">
          <input
            type="text"
            placeholder="Username"
            onChange={(event: React.FormEvent) =>
              setUsername((event.target as HTMLInputElement).value)
            }
          />
          {usernameError && <p className="error">Plese Enter Username</p>}
          <input
            type="password"
            placeholder="Password"
            onChange={(event: React.FormEvent) =>
              setPassword((event.target as HTMLInputElement).value)
            }
          />
          {passwordError && <p className="error">Plese Enter Password</p>}
          <div className="btnContainer">
            <button onClick={handleClick} disabled={isFetching}>
              {isFetching ? "Loading..." : "Login"}
            </button>

            <Link to="/">
              <button className="cancelBtn">Cancel</button>
            </Link>
          </div>
          {error && <p className="error">Something went wrong :(</p>}
          <p className="link">DO NOT YOU REMEMBER THE PASSWORD?</p>
          <Link to="/register">
            <p className="link">CREATE A NEW ACCOUNT</p>
          </Link>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
