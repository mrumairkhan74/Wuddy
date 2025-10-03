import React, { useRef, useState } from "react";
import { updatedUser } from '../features/authSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Profile = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file)); // preview image
    const formData = new FormData();
    formData.append("profileImg", file);

    // send to backend
    dispatch(updatedUser({ userId: user._id, updateData: formData }));
  };



  return (
    <>
      <div className="flex items-center justify-between p-5 border-b-2 border-gray-200">
        {/* profile Details */}
        <div className="flex gap-4 items-center justify-start md:px-5 ">


          <img src={user.profileImg?.url} onClick={handleImageClick} loading="lazy" className="border-2 border-[#206059] overflow-hidden md:w-24 md:h-24 w-18 h-18  object-cover rounded-full" alt="" />

          <div className="flex flex-col">
            <h1 className="md:text-4xl text-[#206059] text-2xl font-bold font-[Poppins]">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-500">@{user.username}</p>
          </div>
        </div>
        {/* active */}
        <div className="bg-green-700 rounded-full p-2 capitalize text-white">
          active
        </div>
      </div>
      {/* links */}
      <div className="flex justify-start items-start p-2 container font-[Poppins] mx-auto">
        <Link className="text-xl p-2 hover:bg-gray-300 rounded-md tracking-wide hover:text-[#206059]">Posts</Link>
        <Link className="text-xl p-2 hover:bg-gray-300 rounded-md tracking-wide hover:text-[#206059]">About</Link>
        <Link className="text-xl p-2 hover:bg-gray-300 rounded-md tracking-wide hover:text-[#206059]">Reels</Link>
        <Link className="text-xl p-2 hover:bg-gray-300 rounded-md tracking-wide hover:text-[#206059]">Photos</Link>

      </div>

      {/* file upload */}
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Update Profile Image</h2>

            {/* Preview */}
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
            ) : (
              <img
                src={user.profileImg?.url || "/default.png"}
                alt="current"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
            )}

            {/* Upload Button */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-[#206059] text-white px-4 py-2 rounded-md"
            >
              Choose Image
            </button>

            {/* Close Button */}
            <div className="mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Profile;
