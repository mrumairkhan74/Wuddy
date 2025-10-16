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
            <div className="flex justify-between items-center p-2">
                <div className="flex items-center justify-center gap-4">
                    <img src={user?.profileImg?.url} className="w-15 h-15 rounded-full object-cover" alt="" />
                    <div className="flex flex-col">
                        <h3 className="font-[Poppins] text-xl">{user?.firstName} {user?.lastName}</h3>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3">
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
