import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical, BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { deletePosts, getPosts } from "../features/postsSlice";
import { Link } from 'react-router-dom'
import { likePosts } from "../features/likeSlice";

const PostPage = () => {
  const { posts, loading, error } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth); // 👈 logged-in user
  // const { likes } = useSelector((state) => state.like); // 👈 logged-in user
  const dispatch = useDispatch();
  const [openPostId, setOpenPostId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const toggleMenu = (id) => {
    setOpenPostId(openPostId === id ? null : id);
  };

  const handleDelete = (id) => {
    dispatch(deletePosts(id));
  };

  // handle likes 
  const handleLikes = (id) => {
    dispatch(likePosts(id));
    // dispatch(fetchLikes(id))
  }



  const getHDImage = (url) => {
    if (!url) return "/default-avatar.png";
    return url.replace("/upload/", "/upload/f_auto,q_auto:best/");
  };

  if (loading) return <p className="text-center">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-xl mx-auto my-5 space-y-6">
      {posts.map((post, index) => (
        <div
          key={post._id || index}
          className="p-5 shadow-md rounded-md bg-white relative"
        >
          {/* Top Section: Profile */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={getHDImage(post.createdBy?.profileImg?.url)}
                  alt="profile"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <Link to={`/user/${post.createdBy?._id}`} className="flex flex-col">
                <h4 className="font-semibold text-sm">
                  {post.createdBy?.firstName} {post.createdBy?.lastName}
                </h4>
                <p className="text-[11px] text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </Link>
            </div>

            {/* Menu button (only for post owner) */}
            {post.createdBy?._id === user?._id && (
              <button onClick={() => toggleMenu(post._id)}>
                {openPostId === post._id ? (
                  <BsThreeDotsVertical />
                ) : (
                  <BsThreeDots />
                )}
              </button>
            )}
          </div>

          {/* Post Text */}
          <div className="mt-3 text-[18px] text-gray-800">{post.text}</div>

          {/* Post Media */}
          {post.postImg?.length > 0 && (
            <div
              className={`mt-3 ${post.postImg.length === 1 ? "w-full" : "grid grid-cols-2 gap-2"
                }`}
            >
              {post.postImg.length === 1 ? (
                <img
                  src={getHDImage(post.postImg[0].url)}
                  alt="post"
                  loading="lazy"
                  className="rounded-md w-full max-h-[600px] object-contain"
                />
              ) : (
                post.postImg.map((img, i) => (
                  <img
                    key={i}
                    src={getHDImage(img.url)}
                    alt={`post-${i}`}
                    loading="lazy"
                    className="rounded-md w-full max-h-[400px] object-contain"
                  />
                ))
              )}
            </div>
          )}


          {/* Divider */}
          <div className="border-t mt-3"></div>

          {/* Actions */}
          <div className="flex justify-around text-gray-600 text-sm mt-1">
            <button onClick={() => handleLikes(post._id)} className="flex items-center gap-1 hover:text-[#206059] cursor-pointer py-2 w-full justify-center">
              👍 Like
            </button>
            <button className="flex items-center gap-1 hover:text-[#206059] cursor-pointer py-2 w-full justify-center">
              💬 Comment
            </button>
            <button className="flex items-center gap-1 hover:text-[#206059] cursor-pointer py-2 w-full justify-center">
              ↗ Share
            </button>
          </div>

          {/* Post Menu (only for owner) */}
          {openPostId === post._id && post.createdBy?._id === user?._id && (
            <div className="absolute right-5 top-12 bg-white border shadow-md rounded-md w-40">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b">
                ✏ Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostPage;
