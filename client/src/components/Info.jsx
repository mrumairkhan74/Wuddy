import React, { useState } from "react";
import { FaHome, FaHeart } from "react-icons/fa";
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { updatedUser } from "../features/authSlice";

const Info = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [info, setInfo] = useState(false);
  const [details, setDetails] = useState(false);
  const [form, setForm] = useState({ bio: user?.bio || "", address: user?.address, city: user?.city, country: user?.country, phoneNo: user?.phoneNo, education: user?.education, zipCode: user?.zipCode })

  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updatedUser({ userId: user._id, updateData: { bio: form.bio } }))
    setInfo(false)
  }

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    await dispatch(updatedUser({ userId: user._id, updateData: { address: form.address, city: form.city, country: form.country, education: form.education, zipCode: form.zipCode } }))
    setDetails(false)
  }

  return (
    <>
      <div className="rounded-md bg-[#206059]/10 w-full flex-[1] p-5 mb-5">
        <h6 className="font-bold font-[Poppins] p-3">Bio</h6>

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
            <span>{user?.education}</span>
          </div>

          <div className="p-2 flex items-center gap-2">
            <FaHome className="text-[#206059] text-2xl" />
            <span>
              Lives in <span className="font-bold">{user?.address} </span>
            </span>
          </div>

          <div className="p-2 flex items-center gap-2">
            <FaLocationDot className="text-[#206059] text-2xl" />
            <span>
              From <span className="font-bold">{user?.city},{user?.country}</span>
            </span>
          </div>

          <div className="p-2 flex items-center gap-2">
            <FaHeart className="text-[#206059] text-2xl" />
            <span>{user?.status}</span>
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
          <div className="bg-white w-[400px] md:w-[600px] h-[600px] md:h-[400px] overflow-y-auto rounded-md shadow-lg relative">
            <div className="flex bg-[#206059] rounded-t-md p-5 sticky">
              <h4 className="font-[Poppins] text-xl text-white tracking-wide">Edit Details</h4>
              <button
                onClick={() => setDetails(false)}
                className="absolute top-2 right-2 text-white hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* form details */}

            <div className="flex items-center justify-center">
              <form className="flex flex-col items-center justify-center p-5">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-col gap-2 items-center">
                      <label htmlFor="address">Address:</label>
                      <input type="text" className="bg-white w-full border p-2 rounded-md" placeholder={`${user?.address}`} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                    </div>
                    <div className="flex-col gap-2 items-center">
                      <label htmlFor="city">City:</label>
                      <input type="text" className="bg-white w-full border p-2 rounded-md" placeholder={`${user?.city}`} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-col gap-2 items-center">
                      <label htmlFor="country">Country:</label>
                      <input type="text" className="bg-white w-full border p-2 rounded-md" placeholder={`${user?.country}`} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                    </div>
                    <div className="flex-col gap-2 items-center">
                      <label htmlFor="zipCode">ZipCode:</label>
                      <input type="number" className="bg-white w-full border p-2 rounded-md" placeholder={`${user?.zipCode}`} value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-col gap-2 items-center">
                      <label htmlFor="education">Education:</label>
                      <input type="text" className="bg-white w-full border p-2 rounded-md" placeholder={`${user?.education}`} value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} />
                    </div>
                  </div>



                </div>
                <button className="mt-4 bg-[#206059] text-white px-4 py-2 rounded-md" onClick={handleUpdateDetails}>
                  Save
                </button>
              </form>
            </div>

          </div>
        </div>
      )}


    </>
  );
};

export default Info;
