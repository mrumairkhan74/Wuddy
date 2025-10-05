import React, { useState } from 'react'
import { IoCall, IoVideocam } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from 'react-redux'
const Messages = () => {
    const { user } = useSelector((state) => state.auth)
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiData) => {
        setMessage((prev) => prev + emojiData.emoji);
    };

    return (
        <>

            <div className="w-full bg-[#206059]/20 h-[550px] rounded-lg relative">
                <div className="flex items-center justify-between bg-white mt-2 h-20 p-5 shadow-md ">
                    <div className="flex items-center justify-start gap-2">
                        <img src={user?.profileImg?.url} className='w-15 h-15 object-cover rounded-full shadow-md' alt="" />
                        <div className="flex flex-col gap-1">
                            <h5 className='text-2xl text-[#206059] font-[Poppins] tracking-wide'>{user?.firstName} {user?.lastName}</h5>
                            <p className='bg-green-800 rounded-full p-2 w-[80px] text-center text-[10px] text-white'>Active now</p>
                        </div>
                    </div>
                    <div className="flex gap-5 items-center justify-center">
                        <IoCall className='text-3xl text-[#206059]' />
                        <IoVideocam className='text-3xl text-[#206059]' />
                    </div>
                </div>
                {/* first user */}
                <div className="flex items-end justify-end m-2 gap-2 absolute  top-20 left-0">
                    <img src={user?.profileImg?.url} className='object-cover md:w-15 md:h-15 w-10 h-10 m-2  rounded-full' alt="" />
                    <div className="absolute w-[200px]  rounded-b-md rounded-tr-md bg-white md:left-20 left-15 top-5 p-2">
                        <p className='text-[14px] md:text-[16px]✔️'>Hellow</p>

                        <p className=' items-end text-right text-[10px] md:text-[12px]'>
                            {new Date().toLocaleTimeString()}
                        </p>

                    </div>
                </div>
                {/* 2nd user */}
                <div className="flex items-end justify-end m-2 gap-2 absolute  top-40 right-0">
                    <div className="absolute w-[200px]  rounded-b-md rounded-tl-md bg-white md:right-20 top-5 right-15 p-2">
                        <p className='text-[14px] md:text-[16px]'>Hellow</p>

                        <p className=' items-end text-right text-[10px] md:text-[12px]'>
                            {new Date().toLocaleTimeString()}
                        </p>

                    </div>
                    <img src={user?.profileImg?.url} className='object-cover md:w-15 md:h-15 w-10 h-10 m-2  rounded-full' alt="" />
                </div>





                {/* Chat input bar */}
                <div className="absolute flex items-center gap-3 bottom-2 left-1/2 -translate-x-1/2 w-[90%] max-w-[850px] bg-white m-2 rounded-md p-2 shadow-md">
                    {/* Emoji button */}
                    <div className="relative">
                        <FaSmile
                            className="text-2xl text-[#206059] cursor-pointer"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        />

                        {showEmojiPicker && (
                            <div className="absolute bottom-12 left-0 z-50">
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}
                    </div>

                    {/* Input field */}
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full p-2 border-b-2 border-[#206059] outline-none"
                    />

                    {/* Send button */}
                    <BsFillSendFill className="text-2xl text-[#206059] cursor-pointer" />
                </div>
            </div>
        </>
    )
}

export default Messages