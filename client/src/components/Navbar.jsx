import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { LuMessageCircleMore } from "react-icons/lu";
import { IoIosNotifications } from "react-icons/io"
import { BiTask } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import logo from '/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/authSlice'
import { toast } from 'react-toastify';
import { getNotifications } from "../features/notificationSlice";

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null); // "profile" | "notify" | "message" | null
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth?.user)
    const { notifications, loading, error } = useSelector(
        (state) => state.notification
    )

    useEffect(() => {
        dispatch(getNotifications());
    }, [dispatch]);

    const navigate = useNavigate()
    const menuRef = useRef();

    // toggle menus
    const toggleMenu = (menu) => {
        setActiveMenu((prev) => (prev === menu ? null : menu));
    };

    const handleLogout = async () => {
        dispatch(logoutUser())
        toast.success("Logout successfully")
        setActiveMenu(null) // close after logout
        navigate('/')
    }

    // close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className='font-[Poppins] relative z-50' ref={menuRef}>
            <div className='bg-[#206059] p-4 text-[#EBF2FD] flex items-center justify-between relative z-50'>
                {/* Left side */}
                <div className="flex items-center">
                    <div className="logo text-3xl font-bold tracking-wide flex items-center" style={{ fontFamily: "HelloValentina" }}>
                        <img src={logo} alt="" className='md:w-20 md:h-15 w-12 h-10' />
                        Wuddy
                    </div>

                    {/* Search box */}
                    <div className="hidden md:flex items-center justify-center bg-[#206059] rounded-full lg:w-[300px] h-[40px] px-3 py-2">
                        <div className="flex items-center gap-2 mx-3 px-2 bg-white rounded-full">
                            <FaSearch className='text-[#206059] text-2xl' />
                            <input
                                type="search"
                                placeholder='search here'
                                className='w-full text-[#206059] outline-none p-2'
                            />
                        </div>
                    </div>
                </div>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center justify-center">
                    <Link to='/home' className='mx-3 hover:underline-offset-10 hover:decoration-4 hover:underline'>Home</Link>
                    <Link to='/meeting' className='mx-3 hover:underline-offset-10 hover:decoration-4 hover:underline'>Meeting</Link>
                    <Link to='/group' className='mx-3 hover:underline-offset-10 hover:decoration-4 hover:underline'>Groups</Link>
                    <Link to='/notes' className='mx-3 hover:underline-offset-10 hover:decoration-4 hover:underline'>Notes</Link>
                </div>

                {/* Right side icons */}
                <div className="flex items-center gap-2">
                    <Link to={'/notes'}><BiTask className='md:hidden h-7 w-7' title='Notes' /></Link>
                    <LuMessageCircleMore
                        className='h-7 w-7 md:w-10 md:h-10 cursor-pointer'
                        title='Messages'
                        onClick={() => {
                            if (window.innerWidth < 768) {
                                window.location.href = '/message';
                            } else {
                                toggleMenu("message")
                            }
                        }}
                    />

                    <IoIosNotifications
                        className='h-7 w-7 md:w-10 md:h-10 cursor-pointer'
                        title='Notifications'
                        onClick={() => {
                            if (window.innerWidth < 768) {
                                window.location.href = '/notification';
                            } else {
                                toggleMenu("notify")
                            }
                        }}
                    />

                    {/* profile Img */}
                    <div
                        title="Profile"
                        className="border-2 border-white rounded-full h-9 w-9 md:w-10 md:h-10 flex items-center justify-center 
             hover:border-red-500 cursor-pointer overflow-hidden"
                        onClick={() => toggleMenu("profile")}
                    >
                        {user && user.profileImg?.url ? (
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

            {/* Mobile Profile Menu */}
            {activeMenu === "profile" && (
                <div className="md:hidden flex flex-col bg-[#206059] mt-3 rounded-md">
                    <Link
                        to={`/myprofile/${user?._id}`}
                        onClick={() => setActiveMenu(null)}
                        className='text-xl text-[#EBF2FD] m-2 p-3 border-b-2 border-gray-500 flex gap-2 items-center'
                    >
                        <img src={user.profileImg?.url} className="object-cover border-2 border-white w-15 h-15 rounded-full" />
                        {user ? `${user.firstName} ${user.lastName}` : "Guest"}
                    </Link>
                    <Link to="/home" onClick={() => setActiveMenu(null)} className='text-xl text-[#EBF2FD] m-2 p-3 border-b-2 border-gray-500'>Home</Link>
                    <Link to='/meeting' onClick={() => setActiveMenu(null)} className='text-xl text-[#EBF2FD] m-2 p-3 border-b-2 border-gray-500'>Meeting</Link>
                    <Link to='/friends' onClick={() => setActiveMenu(null)} className='text-xl text-[#EBF2FD] m-2 p-3 border-b-2 border-gray-500'>Friends</Link>
                    <Link to='/groups' onClick={() => setActiveMenu(null)} className='text-xl text-[#EBF2FD] m-2 p-3 border-b-2 border-gray-500'>Groups</Link>
                    <Link to='/notes' onClick={() => setActiveMenu(null)} className='text-xl text-[#EBF2FD] m-2 p-3 border-b-2 border-gray-500'>Notes</Link>
                    <Link to='/setting' onClick={() => setActiveMenu(null)} className='text-xl text-[#EBF2FD] m-2 p-3 border-b-2 border-gray-500'>Setting</Link>
                    <button onClick={handleLogout} className='text-xl text-[#EBF2FD] m-2 p-3 bg-red-700 rounded-full w-[100px] text-center'>Logout</button>
                </div>
            )}

            {/* Desktop Profile dropdown */}
            {activeMenu === "profile" && (
                <div className="hidden absolute md:flex-col md:flex right-2 top-20 rounded-md mt-4 bg-[#206059] w-[300px]">
                    <Link
                        to={`/myprofile/${user?._id}`}
                        onClick={() => setActiveMenu(null)}
                        className='text-[16px] text-[#EBF2FD] m-2 p-3 border-b-2 flex items-center gap-3'
                    >
                        <img src={user.profileImg?.url} className="object-cover border-2 border-white w-10 h-10 rounded-full" />
                        {user ? `${user.firstName} ${user.lastName}` : "Guest"}
                    </Link>
                    <Link to='/setting' onClick={() => setActiveMenu(null)} className='text-[16px] text-[#EBF2FD] m-2 p-3 border-b-2'>Setting</Link>
                    <button onClick={handleLogout} className='text-[16px] text-[#EBF2FD] m-2 p-3 bg-red-500 rounded-full w-[100px]'>Logout</button>
                </div>
            )}

            {/* Notifications dropdown */}
            {activeMenu === "notify" && (
                <div className="notifications hidden absolute md:flex-col md:flex right-16 top-20 mt-4 rounded-md p-5 bg-[#206059] w-[300px] max-h-[400px] overflow-y-auto">
                    <h4 className="sticky text-xl text-center text-[#EBF2FD] w-full border-b-2">
                        Latest Notification
                    </h4>

                    <div className="flex flex-col mt-3">
                        {loading && (
                            <p className="text-blue-200 text-center text-sm">Loading...</p>
                        )}

                        {error && (
                            <p className="text-red-400 text-center text-sm">
                                Failed to load notifications
                            </p>
                        )}

                        {!loading && !error && notifications?.length === 0 && (
                            <p className="text-gray-300 text-center text-sm">No notifications yet</p>
                        )}

                        {!loading &&
                            !error &&
                            notifications?.map((notifi) => (
                                <div
                                    key={notifi._id}
                                    className="flex items-start justify-between bg-white p-2 rounded-md mb-3"
                                >
                                    {/* sender profile image */}
                                    <img
                                        src={notifi.sender?.profileImg?.url || "/default-avatar.png"}
                                        className="object-cover w-10 h-10 rounded-full mr-2"
                                        alt={`${notifi.sender?.firstName} ${notifi.sender?.lastName}`}
                                    />

                                    <div className="flex flex-col flex-1">
                                        <h5 className="font-medium text-sm">
                                            {notifi.sender?.firstName} {notifi.sender?.lastName}
                                        </h5>
                                        <p className="text-[10px] text-gray-600">
                                            {notifi.message || "New notification"}
                                        </p>
                                    </div>

                                    <p className="text-[10px] text-gray-500 whitespace-nowrap">
                                        {new Date(notifi.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                        })}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            )}



            {/* Messages dropdown */}
            {activeMenu === "message" && (
                <div className="notifications hidden absolute md:flex-col md:flex right-16 top-20 mt-4 rounded-md p-5 bg-[#206059] w-[300px] max-h-[400px] overflow-y-auto">
                    <h4 className='sticky text-xl text-center text-[#EBF2FD] w-full border-b-2'>Latest Message</h4>
                    <div className="flex flex-col mt-3">
                        <div className="flex items-start justify-between bg-white p-2 rounded-md mb-3 ">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3">
                                    <h5 className="font-medium text-sm">Umair Khan</h5>
                                    <p className='bg-green-600 text-[#EBF2FD] rounded-full text-[8px] py-1 px-3 text-center'>Active</p>
                                </div>
                                <p className="text-[10px] text-gray-600">✅ new Message</p>
                            </div>
                            <p className="text-[10px] text-gray-500">Just Now</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar;
