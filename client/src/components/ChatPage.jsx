import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { useSelector } from 'react-redux'
const ChatPage = () => {
  const [search, setSearch] = useState(false)
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center p-5 shadow-md relative mt-1">
        <h3 className="text-[#206059] tracking-wide text-xl md:text-2xl font-bold font-[Poppins]">
          Messages
        </h3>

        <IoSearch
          className="text-2xl cursor-pointer text-[#206059] hover:opacity-70 transition"
          onClick={() => setSearch(!search)}
        />

        {search && (
          <input
            type="text"
            placeholder="Search messages..."
            className="absolute right-15 top-2 mt-2 w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#206059] transition-all ease-in-out duration-500"
          />
        )}
      </div>

      {/* main notes contents */}
      <div className="w-full flex items-center gap-10 shadow-md p-3 overflow-x-auto rounded-md">
        <div className="relative flex items-center justify-center h-25 p-2">
          <img src={user?.profileImg?.url} className=" object-cover rounded-full w-14 h-14 mt-3 bg-white shadow-md" />
          <div className="absolute -top-1 -right-10 w-20 h-10 rounded-t-[10px] rounded-br-[10px] bg-white shadow-md border border-gray-300">
          </div>
        </div>
      </div>

      {/* messages */}
      <div className="flex items-center justify-center gap-1 mt-2">
        {/* person names  */}
        <div className="flex flex-col gap-1 shadow-md h-[550px] md:w-[600px]  overflow-y-auto p-1 overflow-hidden shadow-md container mx-auto rounded-md ">
          <div className="flex justify-between bg-white w-full h-[70px] rounded-md shadow-md">
            {/* user details */}
            <div className="flex items-center gap-2 m-2">

              <img src={user?.profileImg?.url} className="w-15 h-15 object-cover bg-[#206059] rounded-full" alt="" />

              <div className="flex flex-col">
                <h5 className='font-[Poppins] font-bold'>{user?.firstName} {user?.lastName}</h5>
                <p className='px-2 text-gray-600 text-[12px]'>Hellow ??</p>
              </div>
            </div>
            <div className="time p-2 text-[10px] ">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
          {/* devider */}
          <div className="bg-gray-300 w-full"></div>


        </div>

        {/* messages area */}
        <div className="w-full hidden md:block bg-[#206059]/20 h-[500px] rounded-lg ">
          <div className="absolute -bottom-2 w-[800px] p-2 ">
            <input type="text" className='w-full bg-white p-2 rounded-md' name="" id="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage
