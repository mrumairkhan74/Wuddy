import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Messages from "../components/Messages";
import { getChatsByUser, getMessagesByChat, setCurrentChat } from "../features/chatSlice";

const ChatPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { groups, chat, loading, currentChat } = useSelector((state) => state.chat);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) dispatch(getChatsByUser());
  }, [dispatch, user]);

  const handleOpenChat = (chat) => {
    // Set selected chat in redux
    dispatch(setCurrentChat(chat));

    // Fetch messages of this chat
    dispatch(getMessagesByChat(chat._id));

    // Mobile navigation
    if (window.innerWidth < 768) {
      navigate(`/chat/message/${chat._id}`);
    } else {
      setShowMessages(true);
    }
  };

  // Combine 1-on-1 chats and group chats
  const allChats = [...(chat || []), ...(groups || [])];

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

        {/* Group Modal */}
        {groupModal && (
          <div className="absolute right-10 top-16 bg-white w-[300px] h-[200px] rounded-md z-50 p-3">
            <h5 className="text-white bg-[#206059] w-full text-center p-2 rounded-t-md text-xl">
              Create Group
            </h5>
            <input
              type="text"
              placeholder="Group Name"
              className="text-xl rounded-md border p-2 w-full my-2"
            />
            <button className="bg-[#206059] text-white p-2 rounded-md w-full">
              Create
            </button>
          </div>
        )}

        {/* Search Bar */}
        {search && (
          <input
            type="text"
            placeholder="Search messages..."
            className="absolute right-20 top-2 mt-2 w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#206059]"
          />
        )}
      </div>

      {/* Chats + Messages */}
      <div className="flex items-start justify-center gap-2 mt-3 flex-wrap md:flex-nowrap">

        {/* Sidebar */}
        <div className="flex flex-col gap-2 shadow-md w-full md:w-[400px] overflow-y-auto p-2 rounded-md bg-white">
          {loading ? (
            <p className="text-center text-gray-500">Loading chats...</p>
          ) : allChats.length > 0 ? (
            allChats.map((cht) => {
              const friend =
                !cht.isGroupChat &&
                cht.members?.find((m) => m._id !== user._id);

              const name =
                cht.chatName ||
                (friend ? `${friend.firstName} ${friend.lastName}` : "Unknown Chat");

              const profileImg =
                cht.groupProfile?.url ||
                friend?.profileImg?.url ||
                "/default-avatar.png";

              const lm = cht.latestMessage;

              return (
                <div
                  key={cht._id}
                  className="bg-gray-200 flex justify-between items-center rounded-md p-2 cursor-pointer hover:bg-gray-300 transition"
                  onClick={() => handleOpenChat(cht)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={profileImg}
                      className="w-12 h-12 object-cover rounded-full"
                      alt={name}
                    />
                    <div className="flex flex-col">
                      <h5 className="font-bold text-lg">{name}</h5>
                      <p className="text-sm text-gray-600">
                         {lm?.text || ""}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    {lm?.createdAt &&
                      new Date(lm.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400">No chats found</p>
          )}
        </div>

        {/* Messages Area */}
        <div className={`hidden md:flex-1 md:block ${showMessages ? "block" : "hidden"}`}>
          {currentChat ? (
            <Messages chatId={currentChat._id} />
          ) : (
            <div className="p-5 text-gray-500">Select a chat to start messaging</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
