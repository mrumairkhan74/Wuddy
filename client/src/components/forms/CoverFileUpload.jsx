import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa";

const CoverSection = ({ user }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log("Selected file:", file);
  };

  return (
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

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default CoverSection;
