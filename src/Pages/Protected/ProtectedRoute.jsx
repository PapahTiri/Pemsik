import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Axios/Apis/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const isLoggedIn = localStorage.getItem("user");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;