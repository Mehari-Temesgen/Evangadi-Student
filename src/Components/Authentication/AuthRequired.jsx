import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRequired = () => {
  const isLoggedIn = localStorage.getItem("token");
  const location = useLocation();
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/signin"
        state={{
          message: "You must log in first !",
          from: location.pathname,
        }}
        replace
      />
    );
  }
  return <Outlet />;
};

export default AuthRequired;
