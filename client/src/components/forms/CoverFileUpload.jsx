import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa";

const CoverSection = ({ user }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // open file picker
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // preview or send to backend
    console.log("Selected file:", file);

    // Example: send file to backend with FormData
    // const formData = new FormData();
    // formData.append("coverPfp", file);
    // await axios.post("/api/user/upload-cover", formData);
  };

  return (
    <div className="relative rounded-md w-full h-[200px] overflow-hidden flex">
      {user && user.coverPfp ? (
        <img
          src={user.coverPfp}
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

      {/* Hidden File Input */}
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
