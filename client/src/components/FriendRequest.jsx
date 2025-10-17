import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCheck,FaTrash } from "react-icons/fa";


const FriendRequest = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    return (
        <>
            <div className="container mx-auto">
                {/* main heading */}
                <div className=" flex justify-start rounded-t-md gap-5 mt-2 bg-[#206059] text-white font-[Poppins] items-center p-3">
                    <button className='cursor-pointer' onClick={() => navigate(-1)}>
                        <IoIosArrowRoundBack size={50} />
                    </button>
                    <h4 className='text-2xl'>Friend Requests</h4>
                </div>
                {/* all requests */}
                <div className="rounded-md mt-2 p-3 shadow-md m-2 flex items-center justify-between">
                    {/* main name and img */}
                    <div className="flex items-center gap-4">
                        <img src={user?.profileImg?.url} alt="" className='w-15 h-15 rounded-full object-cover' />
                        <div className="flex flex-col">
                            <h3 className='text-2xl font-[Poppins] '>{user?.firstName} {user?.lastName}</h3>
                            <p className='text-gray-500'>send you a friend request</p>
                        </div>
                    </div>
                    {/* button */}
                    <div className="flex gap-2 items-center">
                        <button className='flex items-center gap-2 rounded-full border-1 px-4 py-2 bg-[#206059] text-white cursor-pointer'> <FaCheck  size={20}/> Accept</button>
                        <button className='flex items-center gap-2 rounded-full border-1 px-4 py-2 bg-red-500 text-white cursor-pointer'> <FaTrash size={20} /> Delete</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default FriendRequest