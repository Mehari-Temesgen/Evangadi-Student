import React, { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login">
      <h3 className="login_text">Log in to your account</h3>
      <p className="login__noaccount">
        Don’t have an account?
        <Link>Create a new account</Link>
      </p>
      <form>
        <input
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email adress"
        />
        <br />
        <div className="password-container">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="password-input"
          />
        </div>
        <br />

        <Link className="forgot">Forgot Password?</Link>
        <button className="loginbutton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Signin;
