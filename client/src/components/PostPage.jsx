import React from "react";

const PostPage = () => {
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Example array of posts (replace this with backend data)
  const posts = [1,2]; 

  return (
    <div className="w-full max-w-xl mx-auto my-5 space-y-6">
      {posts.map((post, index) => (
        <div key={index} className="p-5 shadow-md rounded-md p-4 bg-white">
          {/* Top Section: Profile */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#206059] rounded-full overflow-hidden flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold text-sm">Umair Khan</h4>
              <p className="text-[11px] text-gray-500">{today}</p>
            </div>
          </div>

          {/* Post Text */}
          <div className="mt-3 text-sm text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos aut,
            odit nemo ipsam dolor nesciunt qui voluptates.
          </div>

          {/* Post Media */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <img
              src="/banner.jpg"
              alt=""
              className="rounded-md w-full h-48 object-cover"
            />
          </div>

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
      ))}
    </div>
  );
};

export default PostPage;
