import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);
    if (loading) return null
    if (!user)
        // not logged in → kick back to login
        return <Navigate to="/" replace />;


    return children; // logged in → render page
};

export default ProtectedRoute;
