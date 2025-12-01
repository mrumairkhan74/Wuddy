import React, { useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { IoCallSharp, IoVideocam } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetFriends } from "../features/friendSlice";
import { createOrGetMessage } from '../features/chatSlice';

const Friend = () => {
  const { friends } = useSelector((state) => state.friend);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetFriends());
  }, [dispatch]);

  if (!friends || friends.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No friends found
      </div>
    );
  }

  const createChat = async (id) => {
    const res = await dispatch(createOrGetMessage(id));
    const chatId = res.payload.chat._id;
    navigate(`/chat/message/${chatId}`);
  };

  return (
    <div className="space-y-3 p-2">
      {friends.map((fri) => (
        <div
          key={fri._id}
          className="flex justify-between items-center shadow-md rounded-md p-3 bg-white"
        >
          <Link to={`/user/${fri._id}`} className="flex items-center gap-4">
            <img
              src={fri?.profileImg?.url || "/default-avatar.png"}
              alt={fri?.firstName}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h3 className="font-[Poppins] text-lg font-medium">
                {fri?.firstName} {fri?.lastName}
              </h3>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button onClick={() => createChat(fri._id)}>
              <FiMessageCircle
                className="text-[#206059] text-2xl hover:text-gray-300 cursor-pointer"
                title="Send Message"
              />
            </button>

            <Link to={`/call/audio/${fri._id}`}>
              <IoCallSharp className="text-[#206059] text-2xl hover:text-gray-300 cursor-pointer" />
            </Link>

            <Link to={`/call/video/${fri._id}`}>
              <IoVideocam className="text-[#206059] text-2xl hover:text-gray-300 cursor-pointer" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friend;
