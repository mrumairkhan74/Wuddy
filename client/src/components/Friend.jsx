import React, { useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { IoCallSharp, IoVideocam } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetFriends } from "../features/friendSlice";

const Friend = () => {
  const { friends } = useSelector((state) => state.friend);
  const dispatch = useDispatch();

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

  return (
    <div className="space-y-3 p-2">
      {friends.map((friend) => (
        <div
          key={friend._id}
          className="flex justify-between items-center shadow-md rounded-md p-3 bg-white"
        >
          <div className="flex items-center gap-4">
            <img
              src={friend?.profileImg?.url || "/default-avatar.png"}
              alt={friend?.firstName}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h3 className="font-[Poppins] text-lg font-medium">
                {friend?.firstName} {friend?.lastName}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to={`/chat/${friend._id}`}>
              <FiMessageCircle
                className="text-[#206059] text-2xl hover:text-gray-300 cursor-pointer"
                title="Send Message"
              />
            </Link>
            <Link to={`/call/audio/${friend._id}`}>
              <IoCallSharp
                className="text-[#206059] text-2xl hover:text-gray-300 cursor-pointer"
                title="Audio Call"
              />
            </Link>
            <Link to={`/call/video/${friend._id}`}>
              <IoVideocam
                className="text-[#206059] text-2xl hover:text-gray-300 cursor-pointer"
                title="Video Call"
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friend;
