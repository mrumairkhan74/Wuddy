import React, { useState } from "react";
import { FaHome, FaHeart } from "react-icons/fa";
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { updatedUser } from "../features/authSlice";

const Info = () => {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.auth)
  const [info, setInfo] = useState(false);
  const [details, setDetails] = useState(false);
  const [form, setForm] = useState({ bio: user?.bio || "", address: user?.address, city: user?.city, country: user?.country, phoneNo: user?.phoneNo, education: user?.education })

  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updatedUser({ userId: user._id, updateData: { bio: form.bio } }))
    setInfo(false)
  }

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    await dispatch(updatedUser({ userId: user._id, updateData: { address: form.address, city: form.city, country: form.country, education: form.education } }))
    setDetails(false)
  }

  return (
    <>
      <div className="rounded-md bg-[#206059]/10 w-full flex-[1] p-5 mb-5">
        <h6 className="font-bold font-[Poppins] p-3">Intro</h6>

        <p className="text-center p-5 text-xl">
          "{user?.bio}"
        </p>

        <button
          onClick={() => setInfo(!info)}
          className="bg-gray-300 p-2 rounded-md w-full mb-3"
        >
          Edit Bio
        </button>

        {/* details */}
        <div className="m-2">
          <div className="p-2 flex items-center gap-2">
            <GiGraduateCap className="text-[#206059] text-2xl" />
            <span>B.S. Software Engineering</span>
          </div>

          <div className="p-2 flex items-center gap-2">
            <FaHome className="text-[#206059] text-2xl" />
            <span>
              Lives in <span className="font-bold">Jand, Punjab, Pakistan</span>
            </span>
          </div>

          <div className="p-2 flex items-center gap-2">
            <FaLocationDot className="text-[#206059] text-2xl" />
            <span>
              From <span className="font-bold">Attock, Pakistan</span>
            </span>
          </div>

          <div className="p-2 flex items-center gap-2">
            <FaHeart className="text-[#206059] text-2xl" />
            <span>Single</span>
          </div>

          <div className="p-2 flex items-center gap-2">
            <FaClock className="text-[#206059] text-2xl" />
            <span>
              Joined in{" "}
              <span className="font-bold">
                {new Date(user.createdAt).getFullYear()}
              </span>
            </span>
          </div>

          <button onClick={() => setDetails(!details)} className="bg-gray-300 p-2 rounded-md w-full my-3">
            Edit details
          </button>
        </div>
      </div>

      {/* Popup */}
      {info && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[400px] h-[300px] rounded-md shadow-lg p-5 relative">
            <button
              onClick={() => setInfo(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Bio</h2>
            <textarea
              className="w-full h-40 p-2 border rounded-md"
              placeholder={`${user.bio}`}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            ></textarea>
            <button className="mt-4 bg-[#206059] text-white px-4 py-2 rounded-md" onClick={handleUpdate}>
              Save
            </button>

          </div>
        </div>
      )}
      {/* details */}
      {details && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[400px] md:w-[600px] h-[300px] overflow-y-auto md:h-[600px] rounded-md shadow-lg relative">
            <div className="flex bg-[#206059] rounded-t-md p-5">
              <h4 className="font-[Poppins] text-xl">Edit Details</h4>
              <button
                onClick={() => setInfo(false)}
                className="absolute top-2 right-2 text-white hover:text-black"
              >
                ✕
              </button>
            </div>




            <button className="mt-4 bg-[#206059] text-white px-4 py-2 rounded-md" onClick={handleUpdate}>
              Save
            </button>

          </div>
        </div>
      )}


    </>
  );
};

export default Info;
