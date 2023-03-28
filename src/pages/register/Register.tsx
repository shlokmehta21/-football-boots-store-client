import { useState } from "react";
import "./Register.scss";
import { publicRequest } from "../../requestMehtods";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [usernameError, setusernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmpasswordError, setConfirmPasswordError] = useState(false);
  const [notMatching, setNotMatching] = useState(false);
  const errors = [];

  const handleChange = (event: React.FormEvent) => {
    setInputs({
      ...inputs,
      [(event.target as HTMLInputElement).name]: (
        event.target as HTMLInputElement
      ).value,
    });
  };

  const validateFeilds = () => {
    if (inputs.username === "") {
      setusernameError(true);
      errors.push("Username Error");
    }

    if (inputs.email === "") {
      setEmailError(true);
      errors.push("email Error");
    }

    if (inputs.password === "") {
      setPasswordError(true);
      errors.push("password Error");
    }

    if (inputs.confirmPassword === "") {
      setConfirmPasswordError(true);
      errors.push("confirmPassword Error");
    }

    if (inputs.password !== inputs.confirmPassword) {
      setNotMatching(true);
      errors.push("match Error");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    validateFeilds();

    if (errors.length === 0) {
      const user = {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      };

      try {
        await publicRequest.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <motion.div
      className="registerContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="registerWrapper">
        <h1>Register</h1>
        <form className="registerForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            onChange={handleChange}
          />
          {usernameError && <p className="error">Plese Enter Username</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          {emailError && <p className="error">Plese Enter Email</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {passwordError && <p className="error">Plese Enter Password</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          {confirmpasswordError && (
            <p className="error">Plese Enter confirmPassword</p>
          )}

          {notMatching && <p className="error">Passwords Do Not Match!</p>}

          <span className="agreement">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <div className="btnContainer">
            <button>Register</button>

            <Link to="/">
              <button className="cancelBtn">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
