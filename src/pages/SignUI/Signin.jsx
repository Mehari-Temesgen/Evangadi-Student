import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { motion as m } from "framer-motion";
import { loginUser } from "../../api";
const Signin = () => {
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginFormData;
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/forum";
  //location.state: This attempts to access the state property of the location object. However, if location itself is undefined or null, this access will throw an error.
  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(loginFormData)
      .then((data) => {
        setError(null);
        localStorage.setItem("token", data.token);
        navigate(from, { replace: true });
        console.log(data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="sign-form">
        <m.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, x: -100 }}
        >
          {location.state?.message && (
            <h3 className="login-error">{location.state.message}</h3>
          )}
          <div>
            <h2>Login to your account</h2>
            {error?.message && <h3 className="login-error">{error.message}</h3>}
            <p>
              <span>Don’t have an account?</span>
              <Link to="/signup"> Create a new account</Link>
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={handleChange}
                required
              />
              <input
                name="password"
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handleChange}
                required
              />

              {!click ? (
                <FaRegEyeSlash
                  className="eye"
                  style={{
                    position: "absolute",
                    top: "36%",
                    right: "2%",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    opacity: "0.5",
                  }}
                  onClick={() => {
                    setClick(!click);
                    setShow(true);
                  }}
                />
              ) : (
                <MdOutlineRemoveRedEye
                  className="eye"
                  style={{
                    position: "absolute",
                    top: "36%",
                    right: "2%",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    color: "#fe8402",
                  }}
                  onClick={() => {
                    setClick(!click);
                    setShow(false);
                  }}
                />
              )}
              {/* )} */}
              <div className="forgot">
                <a href="#">Forgot Password</a>
              </div>
              <button>Login</button>
            </form>
          </div>
        </m.div>
      </div>
    </>
  );
};

export default Signin;
