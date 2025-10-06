import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../features/authSlice";
import { myPosts } from "../features/postsSlice";
import MyPost from "./MyPost";
import Info from "./Info";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedUser, loading } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id)); // Fetch user by ID (you'll need to define this in authSlice)
      dispatch(myPosts()); // Get all posts (or create a getUserPosts(id) API)
    }
  }, [dispatch, id]);

  if (loading || !selectedUser) {
    return (
      <div className="p-6 sm:p-10 text-center text-gray-500">
        Loading user profile...
      </div>
    );
  }

  const userPosts = posts?.filter(
    (post) => post.createdBy._id === selectedUser._id
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col">
      {/* Cover */}
      <div className="p-2 sm:p-4">
        <div className="relative w-full h-52 md:h-72 bg-gray-200 rounded-xl overflow-hidden">
          {selectedUser.coverImg?.url ? (
            <img
              src={selectedUser.coverImg.url}
              alt="cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
              No Cover Image
            </div>
          )}
        </div>
      </div>

      {/* Profile */}
      <div className="p-2 sm:p-4 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <img
              src={selectedUser.profileImg?.url || "/default.png"}
              alt={selectedUser.firstName}
              className="border-2 border-[#206059] md:w-24 md:h-24 w-18 h-18 object-cover rounded-full"
            />
            <div>
              <h1 className="md:text-4xl text-[#206059] text-2xl font-bold font-[Poppins]">
                {selectedUser.firstName} {selectedUser.lastName}
              </h1>
              <p className="text-gray-500">@{selectedUser.username}</p>
            </div>
          </div>
          <div className="bg-green-700 rounded-full p-2 capitalize text-white">
            active
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-start items-start p-2 container font-[Poppins] mx-auto">
        <p className="text-xl p-2 hover:bg-gray-300 rounded-md tracking-wide hover:text-[#206059]">
          Posts
        </p>
        <p className="text-xl p-2 hover:bg-gray-300 rounded-md tracking-wide hover:text-[#206059]">
          About
        </p>
        <p className="text-xl p-2 hover:bg-gray-300 rounded-md tracking-wide hover:text-[#206059]">
          Reels
        </p>
        <p className="text-xl p-2 hover:bg-gray-300 rounded-md tracking-wide hover:text-[#206059]">
          Photos
        </p>
      </div>

      {/* Info + Posts */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6 px-2 sm:px-4">
        {/* Sidebar Info */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Info user={selectedUser} />
        </div>

        {/* User Posts */}
        <div className="w-full md:flex-1">
          {userPosts && userPosts.length > 0 ? (
            <div className="mt-4 space-y-4">
              {userPosts.map((post) => (
                <MyPost key={post._id} post={post} user={selectedUser} />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center mt-4">
              No posts yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
