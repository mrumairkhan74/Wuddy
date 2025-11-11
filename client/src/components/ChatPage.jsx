import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Messages from "../components/Messages";
import { getGroupsByUser } from "../features/chatSlice";

const ChatPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { groups, loading } = useSelector((state) => state.chat);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) dispatch(getGroupsByUser());
  }, [dispatch, user]);

  const handleOpenChat = (chatId) => {
    setCurrentChatId(chatId);
    if (window.innerWidth < 768) {
      navigate(`/chat/message/${chatId}`);
    } else {
      setShowMessages(true);
    }
  };

  return (
    <div className="w-full min-h-screen p-3">
      {/* Header */}
      <div className="flex justify-between items-center p-5 shadow-md relative mt-1">
        <h3 className="text-[#206059] text-xl md:text-2xl font-bold font-[Poppins]">
          Messages
        </h3>
        <div className="flex items-center gap-2">
          <IoSearch
            className="text-2xl cursor-pointer text-[#206059]"
            onClick={() => setSearch(!search)}
          />
          <FaUserEdit
            className="text-2xl cursor-pointer text-[#206059]"
            onClick={() => setGroupModal(!groupModal)}
          />
        </div>

        {groupModal && (
          <div className="absolute right-10 top-16 bg-white w-[300px] h-[200px] rounded-md z-50 p-3">
            <h5 className="text-white bg-[#206059] w-full text-center p-2 rounded-t-md text-xl">
              Create Group
            </h5>
            <input type="text" placeholder="Group Name" className="text-xl rounded-md border p-2 w-full my-2" />
            <button className="bg-[#206059] text-white p-2 rounded-md w-full">Create</button>
          </div>
        )}

        {search && (
          <input
            type="text"
            placeholder="Search messages..."
            className="absolute right-20 top-2 mt-2 w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#206059]"
          />
        )}
      </div>

      {/* Chat list + message view */}
      <div className="flex items-start justify-center gap-2 mt-3 flex-wrap md:flex-nowrap">
        {/* Sidebar */}
        <div className="flex flex-col gap-2 shadow-md w-full md:w-[400px] overflow-y-auto p-2 rounded-md bg-white">
          {loading ? (
            <p className="text-center text-gray-500">Loading groups...</p>
          ) : groups?.length > 0 ? (
            groups.map((group) => (
              <div
                key={group._id}
                className="bg-gray-200 flex justify-between items-center rounded-md p-2 cursor-pointer hover:bg-gray-300 transition"
                onClick={() => handleOpenChat(group._id)}
              >
                <div className="flex items-center gap-2">
                  <img src={group.groupProfile?.url} className="w-12 h-12 object-cover rounded-full" alt="" />
                  <div className="flex flex-col">
                    <h5 className="font-bold text-lg">{group.chatName}</h5>
                    <p className="text-sm text-gray-600">
                      {group.lastMessage?.sender?.firstName}: {group.lastMessage?.text}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{group.lastMessage?.createdAt && new Date(group.lastMessage.createdAt).toLocaleTimeString()}</div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No groups found</p>
          )}
        </div>

        {/* Messages */}
        <div className={`hidden md:flex-1 md:block ${showMessages ? "block" : "hidden"}`}>
          {currentChatId && <Messages chatId={currentChatId} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
