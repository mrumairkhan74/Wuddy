import React from 'react'
import { IoPersonAdd } from "react-icons/io5";
import { RiUserSearchFill } from "react-icons/ri";
import { Link } from 'react-router-dom'
import Friend from '../components/Friend';
const Friends = () => {
    return (
        <div className='container mx-auto mt-2 rounded-md shadow-md p-2'>
            <div className="flex justify-between items-center p-2 border-b-2 mb-3 border-gray-300">
                <h1 className='text-[#206059] text-2xl font-[Poppins] font-bold'>All Friends</h1>
                <div className="flex items-center gap-10">
                    <Link to={'friend-requests'} className='relative' title='Friend Requests'>
                    <div className="absolute -right-6 px-2 text-white -top-3 bg-[#206059] rounded-md">0</div>
                        <IoPersonAdd className='text-2xl text-[#206059] hover:text-gray-600  cursor-pointer ' />
                    </Link>
                    <Link to={'/find-friends'} title='Find Friends'>
                        <RiUserSearchFill className='text-2xl text-[#206059] hover:text-gray-600 cursor-pointer ' />
                    </Link>
                </div>
            </div>
            <div className="flex flex-col shadow-md rounded-md p-2">
                <Friend/>
            </div>
        </div>
    )
}

export default Friends