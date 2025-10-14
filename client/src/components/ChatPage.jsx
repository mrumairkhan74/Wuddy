import { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";

import { FaUserEdit } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Messages from './Messages';
import { getGroupsByUser } from '../features/chatSlice'


const ChatPage = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState(false);
  const [group, setGroup] = useState(false)
  const [showMessages, setShowMessages] = useState(false);
  const [activeTab, setActiveTab] = useState('messages'); // 👈 new state for toggle
  const { user } = useSelector((state) => state.auth);
  const { groups, loading } = useSelector((state) => state.chat)
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      dispatch(getGroupsByUser())
    }
  }, [dispatch, user])


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
        <div className="flex items-center justify-center gap-2">
          <IoSearch
            className="text-2xl cursor-pointer text-[#206059] hover:opacity-70 transition"
            onClick={() => setSearch(!search)}
            title='search'
          />
          <FaUserEdit
            className="text-2xl cursor-pointer text-[#206059] hover:opacity-70 transition"
            title='Create Group'
            onClick={() => setGroup(!group)}
          />
        </div>
        {
          group && (
            <div className="absolute right-10 top-16 bg-white  w-[300px] h-[200px] rounded-md z-50">

              <div className="flex flex-col justify-center gap-2 items-center">
                <h5 className='text-white bg-[#206059] w-full text-center p-2 rounded-t-md text-xl'>Create Group</h5>
                <input type='text' placeholder='GroupName' className='text-xl rounded-md border p-2' />
                <div className="flex gap-2 justify-center items-center m-2">
                  <select name="" id="" className='text-sm rounded-md border p-2'>
                    <option value="">Add Member</option>
                  </select>
                  <button className='bg-[#206059] text-white  p-2 rounded-md'>Create </button>
                </div>
              </div>

            </div>
          )
        }

        {search && (
          <input
            type="text"
            placeholder="Search messages..."
            className="absolute right-20 top-2 mt-2 w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#206059] transition-all ease-in-out duration-500"
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
              className={`p-4 text-xl w-full text-center rounded-t-md transition ${activeTab === 'messages'
                ? 'bg-[#206059] text-white'
                : 'hover:bg-[#206059]/20 text-gray-700'
                }`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`p-4 text-xl w-full text-center rounded-t-md transition ${activeTab === 'groups'
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
              {loading ? (
                <p className="text-center text-gray-500">Loading groups...</p>
              ) : groups?.length > 0 ? (
                groups.map((group) => (
                  <div
                    key={group._id}
                    className="bg-gray-200 flex justify-between items-center rounded-md p-2 cursor-pointer hover:bg-gray-300 transition"
                    onClick={handleOpenChat}
                  >
                    <div className="flex items-center gap-2 justify-center">
                      <img src={group.groupProfile?.url} className='w-15 h-15 object-cover rounded-full' alt="" />
                      <div className="flex flex-col gap-2 p-2">
                        <h5 className='font-[Poppins] font-bold tracking-[2px] text-xl'>{group.chatName}</h5>
                        <p>{group.lastMessage?.firstName} {group.lastMessage?.lastName}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">No groups found</p>
              )}

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
