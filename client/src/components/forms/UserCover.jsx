import React from 'react'

const UserCover = ({ profile }) => {
    return (
        <div className="relative w-full md:h-64 h-38 overflow-hidden rounded-md z-0 mt-2">
            {profile && profile?.coverImg ? (
                <img
                    src={profile?.coverImg?.url}
                    alt="Cover"
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-[#206059]" />
            )}
        </div>
    )
}

export default UserCover