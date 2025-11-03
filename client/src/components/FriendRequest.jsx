import React, { useEffect } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaTrash } from "react-icons/fa";
import { getFriendsRequests } from '../features/friendSlice';

const FriendRequest = () => {
  const { friends, loading } = useSelector((state) => state.friend);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendsRequests());
  }, [dispatch]);

  if (loading)
    return (
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Loading...
      </p>
    );

  return (
    <div className="container mx-auto">
      {/* main heading */}
      <div className="flex justify-start rounded-t-md gap-5 mt-2 bg-[#206059] text-white font-[Poppins] items-center p-3">
        <button className="cursor-pointer" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={50} />
        </button>
        <h4 className="text-2xl">Friend Requests</h4>
      </div>

      {/* conditional rendering */}
      {friends && friends.length > 0 ? (
        friends.map((friend) => (
          <div
            key={friend._id}
            className="rounded-md mt-2 p-3 shadow-md m-2 flex items-center justify-between"
          >
            {/* main name and img */}
            <div className="flex items-center gap-4">
              <img
                src={friend?.profileImg?.url || '/default-avatar.png'}
                alt={`${friend?.firstName || 'User'} profile`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h3 className="text-2xl font-[Poppins]">
                  {friend?.firstName} {friend?.lastName}
                </h3>
                <p className="text-gray-500">sent you a friend request</p>
              </div>
            </div>

            {/* buttons */}
            <div className="flex gap-2 items-center">
              <button className="flex items-center gap-2 rounded-full px-4 py-2 bg-[#206059] text-white cursor-pointer">
                <FaCheck size={20} /> Accept
              </button>
              <button className="flex items-center gap-2 rounded-full px-4 py-2 bg-red-500 text-white cursor-pointer">
                <FaTrash size={20} /> Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500">
          No friend requests available
        </p>
      )}
    </div>
  );
};

export default FriendRequest;
