import React from "react";

const MyPost = ({ post }) => {
    return (
        <div className="w-full bg-[#206059]/10 shadow-md rounded-md mb-4">
            <div className="p-4 shadow-md rounded-md bg-white">
                {/* Top Section: Profile */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#206059] rounded-full overflow-hidden flex items-center justify-center text-white font-semibold">
                            <img src={post.createdBy?.profileImg?.url} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <h4 className="font-semibold text-sm">
                                {post.createdBy.firstName} {post.createdBy.lastName}
                            </h4>
                            <p className="text-[11px] text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Post Text */}
                {post.text && (
                    <div className="mt-3 text-sm text-gray-800 break-words">
                        {post.text}
                    </div>
                )}

                {/* Post Media */}
                {post.postImg?.length > 0 && (
                    <div
                        className={`mt-3 ${post.postImg.length === 1
                            ? "w-full"
                            : "grid grid-cols-2 gap-2"
                            }`}
                    >
                        {post.postImg.length === 1 ? (
                            <img
                                src={post.postImg[0].url}
                                alt="post"
                                className="rounded-md w-full max-h-[400px] object-cover"
                            />
                        ) : (
                            post.postImg.map((img, i) => (
                                <img
                                    key={i}
                                    src={img.url}
                                    alt={`post-${i}`}
                                    className="rounded-md w-full h-48 object-cover"
                                />
                            ))
                        )}
                    </div>
                )}

                {/* Divider */}
                <div className="border-t mt-3"></div>

                {/* Actions */}
                <div className="flex justify-around text-gray-600 text-sm mt-1">
                    <button className="flex items-center gap-1 hover:text-[#206059] cursor-pointer py-2 w-full justify-center">
                        👍 Like
                    </button>
                    <button className="flex items-center gap-1 hover:text-[#206059] cursor-pointer py-2 w-full justify-center">
                        💬 Comment
                    </button>
                    <button className="flex items-center gap-1 hover:text-[#206059] cursor-pointer py-2 w-full justify-center">
                        ↗ Share
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyPost;
