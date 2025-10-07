import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CoverSection from '../components/forms/CoverFileUpload';
import Profile from '../components/Profile';
import Info from '../components/Info';
import MyPost from '../components/MyPost';
import CreatePost from '../components/CreatePost';
import { myPosts } from '../features/postsSlice';

const MyProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(myPosts());
  }, [dispatch]);

  if (loading) {
    return <div className="p-6 sm:p-10 text-center text-gray-500">Loading profile...</div>;
  }

  if (!user) {
    return <div className="p-6 sm:p-10 text-center text-red-500">No user found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col">
      {/* Cover */}
      <div className="p-2 sm:p-4">
        <CoverSection user={user} />
      </div>

      {/* Profile */}
      <div className="p-2 sm:p-4 border-b border-gray-300">
        <Profile user={user} />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6 px-2 sm:px-4">
        {/* Sidebar Info */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Info user={user} />
        </div>

        {/* Posts Section */}
        <div className="w-full md:flex-1">
          <CreatePost user={user} />

          {/* User posts */}
          {posts && posts.length > 0 ? (
            <div className="mt-4 space-y-4">
              {posts
                .filter((post) => post?.createdBy?._id === user?._id)
                .map((post) => (
                  <MyPost key={post._id} post={post} user={user} />
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

export default MyProfile;
