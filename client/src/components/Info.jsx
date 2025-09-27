import React from "react";
import { FaHome, FaHeart } from "react-icons/fa";
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";

const Info = ({ user }) => {
  return (
    <div className="rounded-md bg-[#206059]/10 w-full flex-[1] p-5 mb-5">
      <h6 className="font-bold font-[Poppins] p-3">Intro</h6>

      <p className="text-center p-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, doloremque
        earum aliquid fuga fugit excepturi.
      </p>

      <button className="bg-gray-300 p-2 rounded-md w-full mb-3">Edit Bio</button>

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
            Joined in <span className="font-bold">{new Date(user.createdAt).getFullYear()}</span>
          </span>
        </div>

        <button className="bg-gray-300 p-2 rounded-md w-full my-3">
          Edit details
        </button>
      </div>
    </div>
  );
};

export default Info;
