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


  const handleEducation = () => {

  }
  const handleAddress = () => {

  }
  const handleSkills = () => {

  }
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
      <div className="flex flex-col md:flex-row items-center justify-around gap-2 mx-auto p-5">
        <div className="flex flex-col md:h-[300px] md:w-[400px] w-full rounded-md  overflow-hidden">
          <div className="flex items-center justify-between">
            <h6 className="font-[Poppins] p-3 text-center font-bold tracking-wide text-[#206059] text-2xl">Address</h6>
            <button onClick={handleAddress} className="bg-[#206059] px-3 py-2 rounded-md text-center font-[Poppins] text-white">+</button>
          </div>
          <div className="w-full border border-gray-300"></div>
          <div className="p-3">
            <p className="text-xl px-2 text-gray-600">Moh Hussain Abad Jand</p>
          </div>
        </div>
        <div className="flex flex-col md:h-[300px] md:w-[400px] w-full rounded-md  overflow-hidden">
          <div className="flex items-center justify-between">
            <h6 className="font-[Poppins] p-3 text-center font-bold tracking-wide text-[#206059] text-2xl">Education</h6>
            <button onClick={handleEducation} className="bg-[#206059] px-3 py-2 rounded-md text-center font-[Poppins] text-white">+</button>
          </div>
          <div className="w-full border border-gray-300"></div>
          <div className="p-3 gap-3 flex flex-col">
            <div className="flex justify-between items-center shadow-md p-3">
              <div className="flex-col">
                <h6 className="text-xl">Bs Software Engineering</h6>
                <p className="text-[12px] text-gray-500">Virtual University Of Pakistan</p>
              </div>
              <div className="">
                2020 - 2025
              </div>
            </div>
            <div className="flex justify-between items-center shadow-md p-2">
              <div className="flex-col">
                <h6 className="text-xl">Bs Software Engineering</h6>
                <p className="text-[12px] text-gray-500">Virtual University Of Pakistan</p>
              </div>
              <div className="">
                2020 - 2025
              </div>
            </div>
            <div className="flex justify-between items-center shadow-md p-2">
              <div className="flex-col">
                <h6 className="text-xl">Bs Software Engineering</h6>
                <p className="text-[12px] text-gray-500">Virtual University Of Pakistan</p>
              </div>
              <div className="">
                2020 - 2025
              </div>
            </div>

          </div>
        </div>
        <div className="flex flex-col wrap  md:h-[300px] md:w-[400px] w-full rounded-md  overflow-hidden">
          <div className="flex items-center justify-between">
            <h6 className="font-[Poppins] p-3 text-center font-bold tracking-wide text-[#206059] text-2xl">Skills</h6>
            <button onClick={handleSkills} className="bg-[#206059] px-3 py-2 rounded-md text-center font-[Poppins] text-white">+</button>
          </div>
          <div className="w-full border border-gray-300"></div>
          <div className="p-3 flex gap-3 flex-wrap justify-center items-center">
            <p className="bg-[#206059] p-2 rounded-full text-white tracking-wide  text-center">Html</p>
            <p className="bg-[#206059] p-2 rounded-full text-white tracking-wide  text-center">CSS</p>
            <p className="bg-[#206059] p-2 rounded-full text-white tracking-wide  text-center">Javascript</p>
            <p className="bg-[#206059] p-2 rounded-full text-white tracking-wide  text-center">ReactJs</p>
            <p className="bg-[#206059] p-2 rounded-full text-white tracking-wide  text-center">Nodejs</p>

          </div>
        </div>
      </div>


      {/* file upload */}
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
    </>
  );
};

export default Profile;
