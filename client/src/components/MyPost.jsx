import React, { useState } from "react";
import { BsThreeDotsVertical, BsThreeDots } from "react-icons/bs";

const MyPost = ({ post }) => {
  const [openPostId, setOpenPostId] = useState(null);
  const toggleMenu = (id) => {
    setOpenPostId(openPostId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-6">
      <div className="p-3 sm:p-4 shadow-md rounded-md bg-white relative">
        {/* Top Section */}
        <div className="flex justify-between items-center">
          {/* Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#206059] rounded-full overflow-hidden flex items-center justify-center text-white font-semibold">
              {post.createdBy?.profileImg?.url ? (
                <img
                  src={post.createdBy.profileImg.url}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm sm:text-base">
                  {post.createdBy.firstName?.[0]}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold text-[14px] sm:text-sm md:text-base">
                {post.createdBy.firstName} {post.createdBy.lastName}
              </h4>
              <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => toggleMenu(post._id)}
            className="p-1 sm:p-2 hover:bg-gray-100 rounded-full"
          >
            {openPostId === post._id ? <BsThreeDotsVertical /> : <BsThreeDots />}
          </button>
        </div>

        {/* Post Text */}
        {post.text && (
          <div className="mt-3 text-[18px] md:text-base text-gray-800 break-words">
            {post.text}
          </div>
        )}

        {/* Post Media */}
        {post.postImg?.length > 0 && (
          <div
            className={`mt-3 ${
              post.postImg.length === 1
                ? "w-full"
                : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2"
            }`}
          >
            {post.postImg.length === 1 ? (
              <img
                src={post.postImg[0].url}
                alt="post"
                className="rounded-md w-full md:h-[400px] h-[300px]  object-cover"
              />
            ) : (
              post.postImg.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={`post-${i}`}
                  className="rounded-md w-full h-32 sm:h-40 md:h-48 object-cover"
                />
              ))
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t mt-3"></div>

        {/* Actions */}
        <div className="flex sm:flex-row justify-around text-gray-600 text-xs sm:text-sm mt-1">
          <button className="flex items-center gap-1 hover:text-[#206059] cursor-pointer py-2 w-full sm:w-auto justify-center">
            👍 Like
          </button>
          <button className="flex items-center gap-1 hover:text-[#206059] cursor-pointer py-2 w-full sm:w-auto justify-center">
            💬 Comment
          </button>
          <button className="flex items-center gap-1 hover:text-[#206059] cursor-pointer py-2 w-full sm:w-auto justify-center">
            ↗ Share
          </button>
        </div>

        {/* Dropdown Menu */}
        {openPostId === post._id && (
          <div className="absolute right-2 sm:right-5 top-12 bg-white border shadow-md rounded-md w-32 sm:w-40 z-10">
            <button className="w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-100 border-b text-xs sm:text-sm">
              ✏ Edit
            </button>
            <button className="w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-100 text-red-600 text-xs sm:text-sm">
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPost;
