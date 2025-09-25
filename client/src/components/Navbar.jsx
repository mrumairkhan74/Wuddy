
import React, { useState } from 'react'
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
const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null); // "profile" | "notify" | "message" | null
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth?.user)
    const navigate = useNavigate()

    //    menu toggle
    const toggleMenu = (menu) => {
        setActiveMenu((prev) => (prev === menu ? null : menu));
    };

    const handleLogout = async () => {
        dispatch(logoutUser())
        toast.success("Logout successfully")
        navigate('/')

    }
    return (
        <div className='m-2 font-[Poppins] shadow-md rounded-md '>
            <div className='bg-[#206059] p-4 text-[#EBF2FD] flex items-center justify-between rounded-md mt-2'>

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
                    <Link to='/' className='mx-3 hover:underline-offset-10 hover:decoration-4 hover:underline'>Home</Link>
                    <Link to='/' className='mx-3 hover:underline-offset-10 hover:decoration-4 hover:underline'>Meeting</Link>
                    <Link to='/' className='mx-3 hover:underline-offset-10 hover:decoration-4 hover:underline'>Groups</Link>
                    <Link to='/' className='mx-3 hover:underline-offset-10 hover:decoration-4 hover:underline'>Notes</Link>
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

                    <div
                        title="Profile"
                        className="border-2 border-white rounded-full h-7 w-7 md:w-10 md:h-10 flex items-center justify-center 
                       hover:border-red-500 cursor-pointer overflow-hidden"
                        onClick={() => toggleMenu("profile")}
                    >
                        <IoPerson className="text-[#EBF2FD] h-6 w-6" />
                    </div>
                </div>
            </div>

            {/* Mobile Menu (when profile is clicked on mobile) */}
            {activeMenu === "profile" && (
                <div className="md:hidden flex flex-col bg-[#206059] mt-2 rounded-md">
                    {/* your mobile links here */}
                    <Link to={`/myprofile/${user?._id}`} className=' hover:underline-offset-10 hover:decoration-4 hover:underline text-xl text-[#EBF2FD] m-2 p-3 font-[Poppins] border-b-2 border-gray-500 tracking-wide flex gap-2 items-center justify-center'>
                        <div className="bg-[#206059] w-15 h-15 rounded-full"></div>
                        {user ? `${user.firstName} ${user.lastName}` : "Guest"}
                    </Link>
                    <Link to="/home" className=' hover:underline-offset-10 hover:decoration-4 hover:underline text-xl text-[#EBF2FD] m-2 p-3 font-[Poppins] border-b-2 border-gray-500 tracking-wide'>Home</Link>
                    <Link to='/' className=' hover:underline-offset-10 hover:decoration-4 hover:underline text-xl text-[#EBF2FD] m-2 p-3 font-[Poppins] border-b-2 border-gray-500 tracking-wide'>Meeting</Link>
                    <Link to='/' className=' hover:underline-offset-10 hover:decoration-4 hover:underline text-xl text-[#EBF2FD] m-2 p-3 font-[Poppins] border-b-2 border-gray-500 tracking-wide'>Friends</Link>
                    <Link to='/' className=' hover:underline-offset-10 hover:decoration-4 hover:underline text-xl text-[#EBF2FD] m-2 p-3 font-[Poppins] border-b-2 border-gray-500 tracking-wide'>Groups</Link>
                    <Link to='/' className=' hover:underline-offset-10 hover:decoration-4 hover:underline text-xl text-[#EBF2FD] m-2 p-3 font-[Poppins] border-b-2 border-gray-500 tracking-wide'>Notes</Link>
                    <Link to='/' className=' hover:underline-offset-10 hover:decoration-4 hover:underline text-xl text-[#EBF2FD] m-2 p-3 font-[Poppins] border-b-2 border-gray-500 tracking-wide'>Setting</Link>
                    <button onClick={handleLogout} className=' hover:underline-offset-10 hover:decoration-4 hover:underline text-xl text-[#EBF2FD] m-2 p-3 font-[Poppins] bg-red-700 rounded-full w-[100px] text-center'>Logout</button>
                </div>
            )}

            {/* Profile dropdown (desktop) */}
            {activeMenu === "profile" && (
                <div className="hidden absolute md:flex-col md:flex right-2 top-20 rounded-md mt-7 bg-[#206059] w-[300px]">
                    <Link to={`/myprofile/${user?._id}`} className=' hover:underline-offset-10 hover:decoration-4 hover:underline text-[16px] text-[#EBF2FD] m-2 p-3 font-[Poppins] border-b-2 tracking-wide'>
                        {user ? `${user.firstName} ${user.lastName}` : "Guest"}
                    </Link>
                    <Link to='/' className=' hover:underline-offset-10 hover:decoration-4 hover:underline text-[16px] text-[#EBF2FD] m-2 p-3 font-[Poppins] border-b-2 tracking-wide'>Setting</Link>
                    <button onClick={handleLogout} className=' hover:bg-red-800 text-center text-[16px] text-[#EBF2FD] m-2 p-3 font-[Poppins] bg-red-500 rounded-full w-[100px]'>Logout</button>
                </div>
            )}

            {/* Notifications dropdown */}
            {activeMenu === "notify" && (
                <div className="notifications hidden absolute md:flex-col md:flex right-16 top-20 mt-7 rounded-md p-5 bg-[#206059] w-[300px] max-h-[400px] overflow-y-auto">
                    <h4 className='sticky text-xl text-center text-[#EBF2FD] w-full border-b-2'>Latest Notification</h4>

                    {/* Notification item 1 */}
                    <div className="flex flex-col mt-3">
                        <div className="flex items-start justify-between bg-white p-2 rounded-md mb-3">
                            <div className="flex flex-col">
                                <h5 className="font-medium text-sm">Umair Khan</h5>
                                <p className="text-[10px] text-gray-600">✅ Accepted your friend request</p>
                            </div>
                            <p className="text-[10px] text-gray-500">29-Sep</p>
                        </div>
                    </div>

                    {/* Notification item 2 */}
                </div>



            )
                // : (
                //     <div className="hidden absolute md:flex-col md:flex right-16 top-20 rounded-md mt-2 bg-[#206059] w-[250px]">
                //         <div className='text-[#EBF2FD] p-3 border-b'>No new notification</div>
                //     </div >
                // )
            }

            {/* Messages dropdown */}
            {
                activeMenu === "message" && (
                    <div className="notifications hidden absolute md:flex-col md:flex right-16 top-20 mt-7 rounded-md p-5 bg-[#206059] w-[300px] max-h-[400px] overflow-y-auto">
                        <h4 className='sticky text-xl text-center text-[#EBF2FD] w-full border-b-2'>Latest Message</h4>

                        {/* Message item 1 */}
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
                )
            }
        </div >
    )
}

export default Navbar;
