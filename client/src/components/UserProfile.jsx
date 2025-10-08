import React from 'react'

const UserProfile = ({profile}) => {
    return (
        <>  <div className="flex items-center justify-between p-5 border-b-2 border-gray-200">
            {/* profile Details */}
            <div className="flex gap-4 items-center justify-start md:px-5 ">


                <img src={profile.profileImg?.url} loading="lazy" className="border-2 border-[#206059] overflow-hidden md:w-24 md:h-24 w-18 h-18  object-cover rounded-full" alt="" />

                <div className="flex flex-col">
                    <h1 className="md:text-4xl text-[#206059] text-2xl font-bold font-[Poppins]">{profile?.firstName} {profile?.lastName}</h1>
                    <p className="text-gray-500">@{profile?.username}</p>
                </div>
            </div>
            {/* active */}
            <div className="bg-green-700 rounded-full p-2 capitalize text-white">
                active
            </div>
        </div></>
    )
}

export default UserProfile