import { useEffect, useState, useRef } from "react";
import { IoCall, IoVideocam } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { sendMessage, getMessagesByChat } from "../features/chatSlice";

const Messages = ({ chatId }) => {
  const { user } = useSelector((state) => state.auth);
  const { messages, groups } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Connect socket once
  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_BACKEND_API, {
      withCredentials: true,
    });

    socketRef.current.on("newMessage", (msg) => {
      // Add received message to Redux manually
      dispatch({
        type: "chat/sendMessage/fulfilled",
        payload: { message: msg },
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [dispatch]);

  // Join the selected chat
  useEffect(() => {
    if (chatId && socketRef.current) {
      socketRef.current.emit("joinChat", chatId);
      dispatch(getMessagesByChat(chatId)); // load old messages
    }
  }, [chatId, dispatch]);

  // Auto scroll down
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const data = {
      chatId,
      senderId: user._id,
      text: message,
    };

    // 1. Send to backend via thunk API (saves to DB)
    const res = await dispatch(sendMessage(data));

    // 2. Emit socket event for real-time update
    if (res.payload?.message) {
      socketRef.current.emit("sendMessage", res.payload.message);
    }

    setMessage("");
  };

  const currentChatUser = groups.find((g) => g._id === chatId);

  return (
    <div className="w-full container mx-auto bg-[#206059]/20 min-h-screen rounded-lg relative">
      {currentChatUser && (
        <div className="flex sticky items-center justify-between bg-white mt-2 h-20 p-5 shadow-md">
          <div className="flex items-center gap-2">
            <img
              src={currentChatUser.profileImg?.url || user.profileImg?.url}
              className="w-12 h-12 object-cover rounded-full"
              alt=""
            />
            <div className="flex flex-col gap-1">
              <h5 className="text-xl text-[#206059] font-[Poppins] tracking-wide">
                {currentChatUser.firstName || user.firstName}{" "}
                {currentChatUser.lastName || user.lastName}
              </h5>
              <p className="bg-green-800 rounded-full p-2 w-[80px] text-center text-[10px] text-white">
                Active now
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
        {messages.map((msg, index) => {
          const isSender = msg.sender?._id === user._id;
          return (
            <div
              key={index}
              className={`flex items-end gap-2 my-2 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {!isSender && (
                <img
                  src={msg.sender?.profileImg?.url}
                  className="object-cover w-10 h-10 rounded-full"
                  alt=""
                />
              )}
              <div
                className={`p-2 rounded-md max-w-[60%] ${
                  isSender
                    ? "bg-[#206059] text-white rounded-br-none"
                    : "bg-white rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs text-gray-400 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
              {isSender && (
                <img
                  src={user?.profileImg?.url}
                  className="object-cover w-10 h-10 rounded-full"
                  alt=""
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Chat input */}
      <div className="absolute flex items-center gap-3 bottom-2 left-1/2 -translate-x-1/2 w-[90%] max-w-[850px] bg-white p-2 rounded-md shadow-md">
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
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 border-b-2 border-[#206059] outline-none"
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
