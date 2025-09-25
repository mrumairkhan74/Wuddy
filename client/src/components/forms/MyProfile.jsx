import React from 'react'
import { useSelector } from 'react-redux'
import { FaCamera } from "react-icons/fa";
import CoverSection from './CoverFileUpload';

const MyProfile = () => {
    const { user } = useSelector((state) => state.auth)
    // const dispatch = useDispatch();

    return (
        <div className="bg-white p-5 relative">
            {/* Cover Image */}
            <div className="rounded-md w-full h-[200px] overflow-hidden">
                <CoverSection />
            </div>

            {/* Profile Picture */}
            <div className="flex">
                <div className="absolute left-10 transform  -bottom-15 flex">
                    <div className="w-28 h-28 rounded-full border-4 border-white bg-transparent overflow-hidden">
                        {/* If user has profile image */}
                        {/* {user?.profilePfp ? ( */}
                            <img
                                src="/logo.png"
                                // src={user.profilePfp}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        {/* ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                                U
                            </div>
                        )} */}
                    </div>
                </div>
                <div className="absolute left-40 transform">
                    <div className="flex flex-col gap-2">
                        <h1 className='md:text-4xl text-3xl tracking-wide font-[Poppins] font-black text-[#206059] md:mt-5 mt-2 '>{user.firstName} {user.lastName}</h1>
                        <p className='text-gray-700 tracking-wide p-2 -mt-3 '>Backend Developer</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MyProfile