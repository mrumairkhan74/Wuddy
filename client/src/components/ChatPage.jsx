import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Messages from './Messages';

const ChatPage = () => {
  const [search, setSearch] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [activeTab, setActiveTab] = useState('messages'); // 👈 new state for toggle
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleOpenChat = () => {
    if (window.innerWidth < 768) {
      navigate('/messages');
    } else {
      setShowMessages(true);
    }
  };

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

      {/* Recent chat bubbles */}
      <div className="w-full flex items-center gap-10 shadow-md p-3 overflow-x-auto rounded-md">
        <div className="relative flex items-center justify-center h-25 p-2">
          <img
            src={user?.profileImg?.url}
            className="object-cover rounded-full w-14 h-14 mt-3 bg-white shadow-md"
            alt=""
          />
          <div className="absolute -top-1 -right-10 w-20 h-10 rounded-t-[10px] rounded-br-[10px] bg-white shadow-md border border-gray-300"></div>
        </div>
      </div>

      {/* Chat list + message view */}
      <div className="flex items-start justify-center gap-2 mt-3 flex-wrap md:flex-nowrap">
        {/* Sidebar Info */}
        <div className="flex flex-col gap-2 shadow-md w-full min-h-screen md:w-[600px] overflow-y-auto p-2 rounded-md bg-white">
          {/* Tabs */}
          <div className="flex items-center justify-between rounded-t-md shadow-md mb-2">
            <button
              onClick={() => setActiveTab('messages')}
              className={`p-4 text-xl w-full text-center rounded-t-md transition ${
                activeTab === 'messages'
                  ? 'bg-[#206059] text-white'
                  : 'hover:bg-[#206059]/20 text-gray-700'
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`p-4 text-xl w-full text-center rounded-t-md transition ${
                activeTab === 'groups'
                  ? 'bg-[#206059] text-white'
                  : 'hover:bg-[#206059]/20 text-gray-700'
              }`}
            >
              Groups
            </button>
          </div>

          {/* Content depending on tab */}
          {activeTab === 'messages' ? (
            <div
              onClick={handleOpenChat}
              className="flex justify-between items-center bg-white w-full h-[70px] rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition"
            >
              {/* user details */}
              <div className="flex items-center gap-2 m-2">
                <img
                  src={user?.profileImg?.url}
                  className="w-14 h-14 object-cover bg-[#206059] rounded-full"
                  alt=""
                />
                <div className="flex flex-col">
                  <h5 className="font-[Poppins] font-bold">
                    {user?.firstName} {user?.lastName}
                  </h5>
                  <p className="px-2 text-gray-600 text-[12px]">Hello 👋</p>
                </div>
              </div>
              <div className="time p-2 text-[10px] ">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 p-3">
              {/* Example Group Cards */}
              <div className="p-3 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 cursor-pointer">
                🧑‍💻 Developers Group
              </div>
              <div className="p-3 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 cursor-pointer">
                🧠 Study Buddies
              </div>
              <div className="p-3 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 cursor-pointer">
                🎮 Gamers Chat
              </div>
            </div>
          )}
        </div>

        {/* Message area (only visible on large screens) */}
        <div className={`hidden md:block md:flex-1 ${showMessages ? 'block' : 'hidden'}`}>
          <Messages />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
