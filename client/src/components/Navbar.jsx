import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoIosNotifications } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";
import { getNotifications } from "../features/notificationSlice";
import logo from "/logo.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const { notifications, loading, error } = useSelector(
    (state) => state.notification
  );
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const toggleMenu = (menu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const handleLogout = async () => {
    dispatch(logoutUser());
    toast.success("Logout successfully");
    setActiveMenu(null);
    navigate("/");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { text: 'Home', path: '/', },
    { text: 'Chat', path: '/chat' },
    { text: 'Friend', path: '/friends' }
  ]
  return (
    <div className="font-[Poppins] relative z-50" ref={menuRef}>
      <div className="bg-[#206059] text-[#EBF2FD] flex items-center justify-between p-4">
        {/* Left side - Logo and Search */}
        <div className="flex items-center gap-4">
          <Link
            to="/home"
            className="flex items-center text-3xl font-bold tracking-wide"
            style={{ fontFamily: "HelloValentina" }}
          >
            <img src={logo} alt="Logo" className="w-10 h-10 md:w-16 md:h-14" />
            Wuddy
          </Link>

          {/* Search box (hidden on mobile) */}
          <div className="hidden md:flex items-center bg-white rounded-full w-[250px] lg:w-[300px] px-3 py-2">
            <FaSearch className="text-[#206059] text-xl mr-2" />
            <input
              type="search"
              placeholder="Search here"
              className="w-full text-[#206059] outline-none text-sm"
            />
          </div>
        </div>

        {/* Center - Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(
            (item) => (
              <Link
                key={item}
                to={`/${item.path}`}
                onClick={() => setActiveMenu(null)}
                className="hover:underline underline-offset-8 decoration-2"
              >
                {item.text}
              </Link>
            )
          )}
        </div>

        {/* Right side - Icons */}
        <div className="flex items-center gap-3 md:gap-4 relative">
          {/* Notes icon (only mobile) */}
          <Link to="/tasks" className="md:hidden">
            <BiTask className="h-6 w-6" title="Notes" />
          </Link>

          {/* Chat icon */}
          <LuMessageCircleMore
            className="h-7 w-7 md:h-9 md:w-9 cursor-pointer"
            title="Messages"
            onClick={() => {
              if (window.innerWidth < 768) {
                navigate("/chat");
              } else {
                toggleMenu("chat");
              }
            }}
          />

          {/* Notification icon */}
          <div className="relative">
            <IoIosNotifications
              className="h-7 w-7 md:h-9 md:w-9 cursor-pointer"
              title="Notifications"
              onClick={() => {
                if (window.innerWidth < 768) {
                  navigate("/notification");
                } else {
                  toggleMenu("notify");
                }
              }}
            />
            {notifications?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">
                {notifications.length}
              </span>
            )}
          </div>

          {/* Profile image */}
          <div
            title="Profile"
            onClick={() => toggleMenu("profile")}
            className="border-2 border-white rounded-full h-9 w-9 md:h-10 md:w-10 flex items-center justify-center hover:border-red-500 cursor-pointer overflow-hidden"
          >
            {user?.profileImg?.url ? (
              <img
                src={user.profileImg.url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <IoPerson className="text-[#EBF2FD] h-6 w-6" />
            )}
          </div>
        </div>
      </div>

      {/* === Profile Dropdown (Desktop) === */}
      {activeMenu === "profile" && (
        <div className="hidden md:flex flex-col absolute right-4 top-[90px] bg-[#206059] rounded-md w-[260px] shadow-lg">
          <Link
            to={`/myprofile/${user?._id}`}
            onClick={() => setActiveMenu(null)}
            className="flex items-center gap-3 p-3 text-[#EBF2FD] border-b border-gray-500"
          >
            <img
              src={user.profileImg?.url}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            {user ? `${user.firstName} ${user.lastName}` : "Guest"}
          </Link>
          <Link
            to="/setting"
            className="p-3 text-[#EBF2FD] border-b border-gray-500"
          >
            Setting
          </Link>
          <button
            onClick={handleLogout}
            className="m-2 py-2 bg-red-500 rounded-md text-white"
          >
            Logout
          </button>
        </div>
      )}

      {/* === Notifications Dropdown (Desktop) === */}
      {activeMenu === "notify" && (
        <div className="hidden md:flex flex-col absolute right-20 top-[90px] bg-[#206059] rounded-md w-[300px] max-h-[400px] overflow-y-auto shadow-lg p-4">
          <h4 className="text-xl text-center text-[#EBF2FD] border-b pb-2 mb-2">
            Latest Notifications
          </h4>

          {loading && (
            <p className="text-blue-200 text-center text-sm">Loading...</p>
          )}
          {error && (
            <p className="text-red-400 text-center text-sm">
              Failed to load notifications
            </p>
          )}
          {!loading && !error && notifications?.length === 0 && (
            <p className="text-gray-300 text-center text-sm">
              No notifications yet
            </p>
          )}

          {!loading &&
            !error &&
            notifications?.map((notifi) => (
              <div
                key={notifi._id}
                className="flex items-start bg-white text-black p-2 rounded-md mb-2"
              >
                <img
                  src={notifi.sender?.profileImg?.url || "/default-avatar.png"}
                  className="w-10 h-10 rounded-full mr-2 object-cover"
                  alt={notifi.sender?.firstName}
                />
                <div className="flex flex-col flex-1">
                  <h5 className="text-sm font-semibold">
                    {notifi.sender?.firstName} {notifi.sender?.lastName}
                  </h5>
                  <p className="text-xs text-gray-600">{notifi.message}</p>
                </div>
                <p className="text-[10px] text-gray-500">
                  {new Date(notifi.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>
            ))}
        </div>
      )}

      {/* === Messages Dropdown (Desktop) === */}
      {activeMenu === "chat" && (
        <div className="hidden md:flex flex-col absolute right-36 top-[90px] bg-[#206059] rounded-md w-[300px] max-h-[400px] overflow-y-auto shadow-lg p-4">
          <h4 className="text-xl text-center text-[#EBF2FD] border-b pb-2 mb-2">
            Latest Messages
          </h4>
          <div className="flex flex-col">
            <div className="flex items-start gap-3 bg-white p-2 rounded-md mb-2">
              <img
                src="/default-avatar.png"
                alt="Sender Profile Img"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h5 className="text-sm font-semibold">Umair Khan</h5>
                <p className="text-xs text-gray-600">✅ New Message</p>
              </div>
              <p className="text-[10px] text-gray-500 ml-auto">Just Now</p>
            </div>
          </div>
        </div>
      )}

      {/* === Mobile Profile Menu === */}
      {activeMenu === "profile" && (
        <div className="md:hidden flex flex-col bg-[#206059] mt-2 rounded-md p-3">
          <Link
            to={`/myprofile/${user?._id}`}
            onClick={() => setActiveMenu(null)}
            className="flex items-center gap-3 p-2 border-b border-gray-400 text-white"
          >
            <img
              src={user.profileImg?.url}
              className="w-10 h-10 rounded-full border"
            />
            {user ? `${user.firstName} ${user.lastName}` : "Guest"}
          </Link>
          {navLinks.map(
            (item) => (
              <Link
                key={item}
                to={`/${item.path}`}
                onClick={() => setActiveMenu(null)}
                className="p-2 border-b border-gray-400 text-white"
              >
                {item.text}
              </Link>
            )
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 rounded-full py-2 mt-3 text-white"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
