import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null; // or show spinner

  // Redirect logged-in users away from public pages
  if (user) return <Navigate to="/home" replace />;

  return children;
};

export default PublicRoute;
