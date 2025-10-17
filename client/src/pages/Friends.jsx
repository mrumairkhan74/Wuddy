import React from 'react'
import { IoPersonAdd } from "react-icons/io5";
import { RiUserSearchFill } from "react-icons/ri";
import { Link } from 'react-router-dom'
import Friend from '../components/Friend';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from 'react-redux';
const Friends = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)
    return (
        <div className='container mx-auto mt-2 rounded-md shadow-md'>
            <div className="flex justify-between items-center p-2 border-b-2 mb-3 border-gray-300">
                <div className="flex items-center gap-4 ">
                    <button onClick={() => navigate(-1)} aria-label="Go back">
                        <IoIosArrowRoundBack size={50} className='text-[#206059] cursor-pointer' />
                    </button>
                    <h1 className='text-[#206059] flex items-center gap-3 text-2xl font-[Poppins] font-bold'>All Friends <span className='bg-gray-500 text-white text-[12px]  px-2 rounded-md'>{user?.friends?.length || 0}</span></h1>
                </div>
                <div className="flex items-center gap-10">
                    <Link to={'/friend-requests'} className='relative' title='Friend Requests'>
                        <div className="absolute -right-6 px-2 text-white -top-3 bg-[#206059] rounded-md">{user?.friendRequests?.length || 0}</div>
                        <IoPersonAdd className='text-2xl text-[#206059] hover:text-gray-600  cursor-pointer ' />
                    </Link>
                    <Link to={'/find-friends'} title='Find Friends'>
                        <RiUserSearchFill className='text-2xl text-[#206059] hover:text-gray-600 cursor-pointer ' />
                    </Link>
                </div>
            </div>
            <div className="flex flex-col shadow-md rounded-md p-2">
                <Friend />
            </div>
        </div>
    )
}

export default Friends