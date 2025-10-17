import React from "react";
import { GoDotFill } from "react-icons/go";
import { GrSend } from "react-icons/gr";
import { useSelector } from "react-redux";
import { FiMessageCircle } from "react-icons/fi";
import { IoCallSharp, IoVideocam } from "react-icons/io5";
import { Link } from "react-router-dom";
const Friend = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <div className="flex flex-col justify-between items-center  rounded-md border w-[300px] p-4 bg-[#206059] rounded-md m-2">
                <h1 className="text-[#EBF2FD] font-[Poppins] border-b-2 my-2 text-center text-xl ">Friends</h1>
                <div className="flex items-center justify-center gap-4 bg-white w-full p-2 rounded-md">
                    <img src={user?.profileImg?.url} className="w-15 h-15 rounded-full object-cover" alt="" />
                    <div className="flex flex-col">
                        <h3 className="font-[Poppins] text-xl">{user?.firstName} {user?.lastName}</h3>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3 md:hidden">
                    <Link>
                        <FiMessageCircle className="text-[#206059] text-2xl hover:text-gray-300 cursor-pointer" />
                    </Link>
                    <Link>
                        <IoCallSharp className="text-[#206059] text-2xl hover:text-gray-300 cursor-pointer" />
                    </Link>
                    <Link>
                        <IoVideocam className="text-[#206059] text-2xl hover:text-gray-300 cursor-pointer" />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Friend;
