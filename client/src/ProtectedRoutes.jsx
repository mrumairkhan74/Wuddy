import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);
    if (loading) return <div className="relative">
        <div className="absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src="./favicon.png" alt="" className="w-20 h-18 object-cover" />
            <h6 className="text-sm font-[Poppins]">Loading</h6>
        </div>
    </div>
    if (!user)
        // not logged in → kick back to login
        return <Navigate to="/" replace />;


    return children; // logged in → render page
};

export default ProtectedRoute;
