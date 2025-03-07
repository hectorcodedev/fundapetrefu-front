import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function ProtectedRoute({ ...props }) {
  try {
    const jwt = localStorage.getItem("token");
    const decodedJwt = jwt_decode(jwt);
    if (decodedJwt.exp < Date.now() / 1000) {
      return <Navigate to="/login" />;
    }
  } catch (err) {
    return <Navigate to="/login" />;
  }
  return <Outlet {...props} />;
}

export default ProtectedRoute;
