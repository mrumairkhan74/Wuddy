import React from 'react';
import { useSelector } from 'react-redux';
import CoverSection from './forms/CoverFileUpload';
import Profile from './Profile';
import Info from './Info';
import MyPost from './MyPost';
import CreatePost from './CreatePost';

const MyProfile = () => {
  const { user, loading } = useSelector(state => state.auth);

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
        <div className="flex-[2] flex-col justify-center items-center gap-2">
          <CreatePost />

          {/* Render user posts */}
          {user.posts && user.posts.length > 0 ? (
            user.posts.map((post, index) => (
              <MyPost
                key={index}
                userName={user.firstName + ' ' + user.lastName}
                userInitial={user.firstName?.charAt(0) || 'U'}
                postText={post.text}
                postImage={post.image}
              />
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
