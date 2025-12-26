import { useEffect, useState, useRef } from "react";
import { IoCall, IoVideocam } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../socket";

import { getMessagesByChat, chatById, addMessage, updateChatPreview } from "../features/chatSlice";
import { Link } from "react-router";

const Messages = ({ chatId: propChatId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { messages, currentChat } = useSelector(state => state.chat);

  const chatId = propChatId || currentChat?._id;

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const isGroupChat = currentChat?.isGroupChat;

  // Header data
  const headerData = isGroupChat
    ? {
      name: currentChat?.chatName,
      image: currentChat?.groupProfile?.url || "/group-avatar.png",
      status: `${currentChat?.members?.length || 0} members`,
    }
    : (() => {
      const friend = currentChat?.members?.find(m => m._id !== user._id);
      return friend
        ? {
          name: `${friend.firstName} ${friend.lastName}`,
          image: friend.profileImg?.url || "/default-avatar.png",
          status: friend.isOnline ? "Online" : "Offline",
        }
        : null;
    })();

  // Join chat + listen for messages
  useEffect(() => {
    if (!chatId) return;

    socket.emit("joinChat", chatId);

    const handleNewMessage = (msg) => {
      console.log("New message received:", msg);
      // Only add messages for this chat
      if (msg.chatId._id === chatId) {
        dispatch(addMessage(msg));
        dispatch(updateChatPreview({ chatId: msg.chatId._id, lastMessage: msg.text }));
      }
    };

    socket.on("newMessage", handleNewMessage);


    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [chatId, dispatch]);

  // Load chat + messages
  useEffect(() => {
    if (!chatId) return;
    dispatch(chatById(chatId));
    dispatch(getMessagesByChat(chatId));
  }, [chatId, dispatch]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Emoji handler
  const handleEmojiClick = (emojiObj) => setMessage(prev => prev + emojiObj.emoji);

  // Send message via socket
  const handleSend = () => {
    if (!message.trim() || !chatId) return;

    const msgData = { chatId, senderId: user._id, text: message };

    // Emit to socket for real-time update
    socket.emit("sendMessage", msgData);

    // Optimistically add to UI immediately
    dispatch(addMessage({
      ...msgData,
      _id: Date.now().toString(), // temporary id
      sender: { _id: user._id, firstName: user.firstName, lastName: user.lastName, profileImg: user.profileImg },
      createdAt: new Date().toISOString()
    }));

    setMessage("");
  };


  return (
    <div className="w-full container mx-auto bg-[#206059]/20 min-h-screen rounded-lg relative">
      {/* Header */}
      {headerData && (
        <Link className="flex items-center justify-between bg-white mt-2 h-20 p-5 shadow-md" to={`/message/${chatId}`}>
          <div className="flex items-center gap-2">
            <img src={headerData.image} className="w-12 h-12 object-cover rounded-full" alt="chat" />
            <div>
              <div className="flex gap-2 items-center">
                <h5 className="text-xl text-[#206059] font-[Poppins]">{headerData.name}</h5>
                <p className="bg-[#206059] px-2 py-1 text-white rounded-full text-[10px] tracking-lg w-fit">
                  {headerData.status}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <IoCall className="text-2xl text-[#206059]" />
            <IoVideocam className="text-2xl text-[#206059]" />
          </div>
        </Link>
      )}

      {/* Messages */}
      <div className="flex flex-col overflow-y-auto h-[calc(100vh-180px)] p-3">
        {messages?.map((msg) => {
          const isSender = msg.sender?._id === user._id;
          return (
            <div key={msg._id} className={`flex gap-2 my-2 ${isSender ? "justify-end" : "justify-start"}`}>
              {!isSender && <img src={msg.sender?.profileImg?.url || "/default-avatar.png"} className="w-10 h-10 rounded-full" alt="" />}
              <div className={`p-2 rounded-md max-w-[60%] ${isSender ? "bg-[#206059] text-white" : "bg-white"}`}>
                {isGroupChat && !isSender && <p className="text-xs font-semibold text-[#206059]">{msg.sender?.firstName}</p>}
                <p>{msg.text}</p>
                <p className="text-xs text-gray-500 text-right">{new Date(msg.createdAt).toLocaleTimeString()}</p>
              </div>
              {isSender && <img src={user?.profileImg?.url || "/default-avatar.png"} className="w-10 h-10 rounded-full" alt="" />}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] bg-white p-2 rounded-md shadow-md flex items-center gap-3">
        <FaSmile className="text-2xl text-[#206059] cursor-pointer" onClick={() => setShowEmojiPicker(prev => !prev)} />
        {showEmojiPicker && (
          <div className="absolute bottom-14 left-0 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <input
          className="w-full p-2 border-b-2 border-[#206059]"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type something..."
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <BsFillSendFill className="text-2xl text-[#206059] cursor-pointer" onClick={handleSend} />
      </div>
    </div>
  );
};

export default Messages;
