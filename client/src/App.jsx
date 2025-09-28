import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Notification from "./pages/Notification";
import VerifyEmail from "./components/VerifyEmail";
import Loading from "./components/Loading";
import ProtectedRoute from "./ProtectedRoutes";

import { GetMe } from "./features/authSlice";
import MyProfile from "./components/MyProfile";
import Setting from "./pages/Setting";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {user && <Navbar />}
      <AnimatePresence mode="wait">
        {showSplash || loading ? (
          <Loading key="splash" onFinish={() => setShowSplash(false)} />
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email/:userId" element={<VerifyEmail />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myprofile/:id"
              element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/setting"
              element={
                <ProtectedRoute>
                  <Setting />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default App;
