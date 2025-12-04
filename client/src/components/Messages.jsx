import { useEffect, useState, useRef } from "react";
import { IoCall, IoVideocam } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

import {
  sendMessage,
  getMessagesByChat,
  chatById,
  addMessage,
  updateChatPreview
} from "../features/chatSlice";

const Messages = ({ chatId: propChatId }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { messages, currentChat } = useSelector((state) => state.chat);

  // Use propChatId if passed, otherwise fallback to currentChat._id
  const chatId = propChatId || currentChat?._id;

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // socket connection
  useEffect(() => {
    if (!chatId) return;

    socketRef.current = io(import.meta.env.VITE_BACKEND_API, {
      withCredentials: true,
    });

  socketRef.current.on("newMessage", (msg) => {
    // Update messages if the chat is open
    if (msg.chatId === currentChat?._id) {
        dispatch(addMessage(msg));
    }

    // Update chat preview in sidebar
    dispatch(updateChatPreview({ chatId: msg.chatId, lastMessage: msg.text }));
});



    return () => {
      socketRef.current.disconnect();
    };
  }, [dispatch, chatId]);

  // load chat details + old messages
  useEffect(() => {
    if (!chatId) return;

    dispatch(chatById(chatId));
    dispatch(getMessagesByChat(chatId));

    socketRef.current?.emit("joinChat", chatId);
  }, [chatId, dispatch]);

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmojiClick = (emojiObj) => {
    setMessage((prev) => prev + emojiObj.emoji);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const data = {
      chatId,
      senderId: user._id,
      text: message,
    };

    const res = await dispatch(sendMessage(data));

    if (res.payload?.message) {
      socketRef.current.emit("sendMessage", res.payload.message);
    }

    setMessage("");
  };

  // friend for header
  const friend =
    currentChat?.members?.find((m) => m._id !== user._id) || null;

  return (
    <div className="w-full container mx-auto bg-[#206059]/20 min-h-screen rounded-lg relative">

      {/* Header */}
      {friend && (
        <div className="flex items-center justify-between bg-white mt-2 h-20 p-5 shadow-md">
          <div className="flex items-center gap-2">
            <img
              src={friend.profileImg?.url || "/default-avatar.png"}
              className="w-12 h-12 object-cover rounded-full"
              alt="user"
            />
            <div>
              <h5 className="text-xl text-[#206059] font-[Poppins]">
                {friend.firstName} {friend.lastName}
              </h5>
              <p className="bg-green-800 text-white px-3 py-1 rounded-full text-xs w-fit">
                {friend.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <IoCall className="text-2xl text-[#206059]" />
            <IoVideocam className="text-2xl text-[#206059]" />
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex flex-col overflow-y-auto h-[calc(100vh-180px)] p-3">
        {messages?.map((msg) => {
          const isSender = msg.sender?._id === user._id;

          return (
            <div
              key={msg._id}
              className={`flex gap-2 my-2 ${isSender ? "justify-end" : "justify-start"}`}
            >
              {!isSender && (
                <img
                  src={msg.sender?.profileImg?.url || "/default-avatar.png"}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
              )}

              <div
                className={`p-2 rounded-md max-w-[60%] ${isSender ? "bg-[#206059] text-white" : "bg-white"
                  }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs text-gray-500 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>

              {isSender && (
                <img
                  src={user?.profileImg?.url || "/default-avatar.png"}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
              )}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* message input */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] bg-white p-2 rounded-md shadow-md flex items-center gap-3">
        <FaSmile
          className="text-2xl text-[#206059] cursor-pointer"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        />

        {showEmojiPicker && (
          <div className="absolute bottom-14 left-10 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <input
          className="w-full p-2 border-b-2 border-[#206059]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type something..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <BsFillSendFill
          className="text-2xl text-[#206059] cursor-pointer"
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default Messages;
