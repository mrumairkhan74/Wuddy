import { FaCamera } from "react-icons/fa";
import React, { useRef, useState } from "react";
import { updatedUser } from '../../features/authSlice'
import { useDispatch } from 'react-redux'

const CoverSection = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleUploadClick = () => {
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file)); // preview image
    const formData = new FormData();
    formData.append("coverImg", file);

    // send to backend
    dispatch(updatedUser({ userId: user._id, updateData: formData }));
  };

  return (
    <>
      <div className="relative w-full md:h-64 h-38 overflow-hidden rounded-md z-0">
        {user && user.coverImg ? (
          <img
            src={user.coverImg?.url}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#206059]" />
        )}

        {/* Upload Button */}
        <button
          onClick={handleUploadClick}
          className="absolute bottom-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
        >
          <FaCamera />
        </button>

      </div>
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
                src={user.coverImg?.url || "/default.png"}
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

export default CoverSection;
