import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical, BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { deletePosts, getPosts } from "../features/postsSlice";
import { Link } from "react-router-dom";
import { fetchLikes, likePosts, unlikePosts } from "../features/likeSlice";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";


const PostPage = () => {
  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { likes } = useSelector((state) => state.like);

  const [openPostId, setOpenPostId] = useState(null);

  // Load all posts
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // Load likes only once when posts length changes
  useEffect(() => {
    if (posts.length > 0) {
      posts.forEach((post) => {
        dispatch(fetchLikes(post._id));
      });
    }
  }, [dispatch, posts]);

  const toggleMenu = (id) => {
    setOpenPostId(openPostId === id ? null : id);
  };

  const handleDelete = (id) => {
    dispatch(deletePosts(id));
  };

  const handleLikes = (id) => {
    if (!user) return alert("Please log in to like posts.");
    dispatch(likePosts(id));
  };
  const handleUnlike = (id) => {
    dispatch(unlikePosts(id));
  }
  const getHDImage = (url) => {
    if (!url) return "/default-avatar.png";
    return url.replace("/upload/", "/upload/f_auto,q_auto:best/");
  };

  if (loading) return <p className="text-center">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-xl mx-auto my-5 space-y-6">
      {posts.map((post) => {
        // const postLikes = likes[post._id]?.likes || [];
        const count = likes[post._id]?.count || 0;
        const isLiked = user?.isLikedPost?.includes(post._id);


        return (
          <div key={post._id} className="p-5 shadow-md rounded-md bg-white relative">

            {/* Top Section */}
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

              {/* Menu (Owner Only) */}
              {post.createdBy?._id === user?._id && (
                <button onClick={() => toggleMenu(post._id)}>
                  {openPostId === post._id ? <BsThreeDotsVertical /> : <BsThreeDots />}
                </button>
              )}
            </div>

            {/* Post Text */}
            <div className="mt-3 text-[18px] text-gray-800">{post.text}</div>

            {/* Post Images */}
            {post.postImg?.length > 0 && (
              <div
                className={`mt-3 ${post.postImg.length === 1
                  ? "w-full"
                  : "grid grid-cols-2 gap-2"
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

            {/* Likes Display */}
            <p className="text-gray-500 text-[12px] mt-1">
              {count > 0 ? `${count} ${count === 1 ? "like" : "likes"}` : "No likes yet"}
            </p>

            <div className="border-t mt-3"></div>

            {/* Actions */}
            <div className="flex justify-around text-gray-600 text-sm mt-1">
              <button

                onClick={
                  () => {
                    if (isLiked) {
                      handleUnlike(post._id);
                    } else {
                      handleLikes(post._id);
                    }
                  }
                }
                className={`flex items-center gap-1 cursor-pointer py-2 w-full justify-center ${isLiked ? "text-[#206059]" : "text-gray-600"
                  } hover:text-[#206059]`}
              >
                {isLiked ? <div className="flex gap-2 items-center text-[#206059]"><FaThumbsUp /><p>Liked</p></div> : <div className="flex gap-2 items-center"><FaRegThumbsUp /><p>Like</p></div>}
              </button>

              <button className="flex items-center gap-1 hover:text-[#206059] cursor-pointer py-2 w-full justify-center">
                💬 Comment
              </button>

              <button className="flex items-center gap-1 hover:text-[#206059] cursor-pointer py-2 w-full justify-center">
                ↗ Share
              </button>
            </div>

            {/* Menu Options */}
            {
              openPostId === post._id && post.createdBy?._id === user?._id && (
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
              )
            }
          </div>
        );
      })}
    </div >
  );
};

export default PostPage;
