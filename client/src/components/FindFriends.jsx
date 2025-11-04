import React, { useEffect } from 'react';
import { IoIosArrowRoundBack, IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from "react-icons/fa";
import { getAllUser } from '../features/authSlice';
import { sendFriendRequest } from '../features/friendSlice'
import { toast, ToastContainer } from 'react-toastify'
const FindFriends = () => {
  const { profile, user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile || profile.length === 0) {
      dispatch(getAllUser());
    }
  }, [dispatch, profile]);

  // send friend Request
  const sendRequest = async (id) => {
    try {
      const res = await dispatch(sendFriendRequest(id)).unwrap(); // waits for async thunk to finish
      toast.success(res?.message || "Friend request sent successfully");
    } catch (error) {
      const msg =
        error?.response?.data?.error || error?.error || "Something went wrong";
      toast.error(msg);
    }
  };




  if (loading)
    return (
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Loading...
      </p>
    );

  // ✅ Filter out the logged-in user and their existing friends
  const suggestedFriends =
    profile?.filter(
      (person) =>
        person._id !== user?._id && // exclude yourself
        !user?.friends?.some((f) => f._id === person._id) // exclude users already in your friends list
    ) || [];




  return (
    <div className="container mx-auto px-3 py-2">
      <ToastContainer position='top-right' duration="500" />
      {/* Header */}
      <div className="flex justify-start rounded-t-md gap-5 mt-2 bg-[#206059] text-white font-[Poppins] items-center p-3">
        <button className="cursor-pointer" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={50} />
        </button>
        <h4 className="text-2xl">Suggested Friends</h4>
      </div>

      {/* Suggested Friends List */}
      {suggestedFriends.length > 0 ? (
        suggestedFriends.map((friend) => (
          <div
            key={friend._id}
            className="rounded-md mt-2 p-3 shadow-md m-2 flex flex-col md:flex-row gap-5 items-center justify-between"
          >
            {/* Image & Name */}
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
                <p className="text-gray-500">suggestion for you</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 items-center">
              <button
                className="flex items-center gap-2 rounded-full px-4 py-2 bg-[#206059] text-white hover:bg-[#184b45]"
                onClick={() => sendRequest(friend._id)}
              >
                <IoMdPersonAdd size={20} /> Add Friend
              </button>
              <button
                className="flex items-center gap-2 rounded-full px-4 py-2 bg-red-500 text-white hover:bg-red-600"
                onClick={() => console.log('Remove', friend._id)}
              >
                <FaTrash size={20} /> Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500">
          No friend suggestions available
        </p>
      )}
    </div>
  );
};

export default FindFriends;
