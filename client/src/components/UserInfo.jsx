import React from 'react'
import { FaHome, FaHeart } from "react-icons/fa";
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
const UserInfo = ({ profile }) => {
    return (
        <>
            <div className="rounded-md bg-[#206059]/10 w-full flex-[1] p-5 mb-5">
                <h6 className="font-bold font-[Poppins] p-3">Bio</h6>

                <p className="text-center p-5 text-xl">
                    "{profile?.bio}"
                </p>



                {/* details */}
                <div className="m-2">
                    <div className="p-2 flex items-center gap-2">
                        <GiGraduateCap className="text-[#206059] text-2xl" />
                        <span>{profile?.education}</span>
                    </div>

                    <div className="p-2 flex items-center gap-2">
                        <FaHome className="text-[#206059] text-2xl" />
                        <span>
                            Lives in <span className="font-bold">{profile?.address} </span>
                        </span>
                    </div>

                    <div className="p-2 flex items-center gap-2">
                        <FaLocationDot className="text-[#206059] text-2xl" />
                        <span>
                            From <span className="font-bold">{profile?.city},{profile?.country}</span>
                        </span>
                    </div>

                    <div className="p-2 flex items-center gap-2">
                        <FaHeart className="text-[#206059] text-2xl" />
                        <span>{profile?.status}</span>
                    </div>

                    <div className="p-2 flex items-center gap-2">
                        <FaClock className="text-[#206059] text-2xl" />
                        <span>
                            Joined in{" "}
                            <span className="font-bold">
                                {new Date(profile.createdAt).getFullYear()}
                            </span>
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserInfo