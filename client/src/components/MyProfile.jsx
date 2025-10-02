import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CoverSection from './forms/CoverFileUpload';
import Profile from './Profile';
import Info from './Info';
import MyPost from './MyPost';
import CreatePost from './CreatePost';
import { myPosts } from '../features/postsSlice';

const MyProfile = () => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector(state => state.auth);
  const { posts } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(myPosts())
  }, [dispatch])


  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading profile...</div>;
  }

  if (!user) {
    return <div className="p-10 text-center text-red-500">No user found</div>;
  }

  return (
    <div className="container mx-auto flex flex-col">
      {/* Cover */}
      <div className="p-2">
        <CoverSection user={user} />
      </div>

      {/* Profile */}
      <div className="p-2 border-b-2 border-gray-300">
        <Profile user={user} />
      </div>

      {/* Content */}
      <div className="container flex flex-col md:flex-row gap-3 mt-5 mx-auto w-full">
        {/* Sidebar Info */}
        <div className="flex-1 flex-col items-center gap-2">
          <Info user={user} />
        </div>

        {/* Posts Section */}
        {/* Posts Section */}
        <div className="flex-[2] flex-col justify-center items-center gap-2 container mx-auto">
          <CreatePost />

          {/* Render user posts */}
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <MyPost key={post._id} post={post} />
            ))
          ) : (
            <div className="text-gray-500 text-center mt-3">
              No posts yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyProfile;
