import React, { useRef } from "react";

const Profile = ({ user }) => {
  const fileInputRef = useRef(null);

  // file click using ref
  const handleUploadClick = () => {
    fileInputRef.current.click();
  }

  // file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log("Selected file:", file);
  };

  return (
    <>
      <div className="flex items-center justify-between px-10">
        {/* profile Details */}
        <div className="flex gap-4 items-center justify-start md:px-5">


          <img src={user.profileImg?.url} onClick={handleUploadClick} className="border-2 border-[#206059] overflow-hidden md:w-24 md:h-24 w-18 h-18 bg-[#206059] object-cover rounded-full" alt="" />

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

      {/* other details */}
      {/* address */}
      <div className="flex flex-col">

      </div>


      {/* file upload */}
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
    </>
  );
};

export default Profile;
