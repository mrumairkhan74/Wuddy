import React, { useState, useRef, useEffect } from 'react';
import { IoCall, IoVideocam, IoPerson, IoCamera } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { renameGroupApi, updateGroupProfileApi } from '../features/chatSlice';
import { MdEdit } from "react-icons/md";

const MessageProfile = () => {
    const { user } = useSelector(state => state.auth);
    const { currentChat } = useSelector(state => state.chat);
    const dispatch = useDispatch();
    const [isOpenDropDown, setIsOpenDropDown] = useState(false)
    const [activeTab, setActiveTab] = useState("images");
    const [groupProfile, setGroupProfile] = useState(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [groupName, setGroupName] = useState("");
    const dropdownRef = useRef(null);



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenDropDown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!currentChat || !user) return null;

    const isGroupChat = currentChat.isGroupChat;



    // Close dropdown when clicking outside



    const isGroupAdmin =
        isGroupChat &&
        currentChat.groupAdmin?.toString() === user._id?.toString();


    const updateProfile = () => {
        if (!groupProfile) return;

        const formData = new FormData();
        formData.append("groupProfile", groupProfile);

        dispatch(
            updateGroupProfileApi({
                chatId: currentChat._id,
                formData,
            })
        );
    };

    const handleGroupRename = () => {
        dispatch(
            renameGroupApi({
                chatId: currentChat._id,
                data: { chatName: groupName }
            })
        );
    };
    const profileData = isGroupChat
        ? {
            name: currentChat.chatName,
            image: currentChat.groupProfile?.url || "/group-avatar.png",
            subtitle: `${currentChat.members?.length || 0} members`,
        }
        : (() => {
            const friend = currentChat.members?.find(
                m => m._id !== user._id
            );

            return friend
                ? {
                    name: `${friend.firstName} ${friend.lastName}`,
                    image: friend.profileImg?.url || "/default-avatar.png",
                    subtitle: friend.isOnline ? "Online" : "Offline",
                    userId: friend._id,
                }
                : null;
        })();

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden mt-5">
            {/* Profile Section */}
            <div className="flex flex-col items-center w-full p-6 bg-[#f9fafa]">
                <div className="relative">
                    <img
                        src={groupProfile ? URL.createObjectURL(groupProfile) : profileData?.image}
                        alt="Chat profile"
                        className="w-32 h-32 rounded-full object-cover shadow-md border"
                    />

                    {/* ✅ Admin-only upload */}
                    {isGroupAdmin && (
                        <label className="absolute bottom-1 right-1 bg-white p-2 rounded-full cursor-pointer shadow">
                            <IoCamera className="text-xl text-[#206059]" />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => setGroupProfile(e.target.files[0])}
                            />
                        </label>
                    )}
                </div>

                <div className="relative flex items-center gap-2 mt-3">
                    {!isEditingName ? (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-700">
                                {groupName || profileData?.name}
                            </h2>

                            {isGroupAdmin && (
                                <button
                                    onClick={() => setIsEditingName(true)}
                                    className="bg-white p-1 rounded-full shadow"
                                >
                                    <MdEdit className="text-[#206059]" />
                                </button>
                            )}
                        </>
                    ) : (
                        isGroupAdmin && (
                            <input
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                onBlur={() => setIsEditingName(false)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setIsEditingName(false);
                                        // later: dispatch update group name API here
                                        handleGroupRename();
                                    }
                                }}
                                placeholder={profileData?.name}
                                className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 w-full outline-[#206059]"
                                autoFocus
                            />
                        )
                    )}
                </div>

                <p className="text-gray-500 text-sm mb-4">
                    {profileData?.subtitle}
                </p>

                {/* ✅ Admin-only update button */}
                {isGroupAdmin && groupProfile && (
                    <button
                        onClick={updateProfile}
                        className="px-4 py-2 bg-[#206059] text-white rounded-lg mt-2 hover:bg-[#1b4e47]"
                    >
                        Update Group Profile
                    </button>
                )}

                {/* Action Icons */}
                <div className="flex gap-5 mt-4" ref={dropdownRef} >
                    {!isGroupChat && (
                        <Link to={`/myProfile/${profileData?.userId}`}>
                            <IoPerson className="text-3xl text-[#206059]" />
                        </Link>
                    )}
                    <IoCall className="text-3xl text-[#206059]" />
                    <IoVideocam className="text-3xl text-[#206059]" />
                    <BsThreeDots className="text-3xl text-[#206059]" onClick={() => setIsOpenDropDown(!isOpenDropDown)} />
                </div>
            </div>

            {isOpenDropDown && (
                <div className="flex flex-col justify-center items-center w-80 h-40 rounded-md border-2 border-[#206059] overflow-y-auto p-2">
                    <ul className='flex flex-col justify-center items-center w-full'>
                        <Link className="p-2 mt-1 text-md border-b-2 border-gray-400 flex gap-2 items-center w-full text-[#206059]">See member</Link>
                        {isGroupAdmin ? (
                            <div className="flex flex-col justify-center items-center w-full">
                                <Link className="p-2 mt-1 text-md border-b-2 border-gray-400 flex gap-2 items-center w-full text-[#206059]">Add member</Link>
                                <Link className="p-2 mt-1 text-md flex gap-2 items-center w-full text-red-500 font-bold">Remove member</Link>
                            </div>
                        ) : (
                            <Link className="p-2 mt-1 text-md flex gap-2 items-center w-full text-red-500 font-bold">Leave Group</Link>
                        )}
                    </ul>
                </div>

            )}
            {/* Media Tabs */}
            <div className="w-full p-5">
                <div className="flex justify-around mb-5">
                    {["images", "videos", "others"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md ${activeTab === tab
                                ? "bg-[#206059] text-white"
                                : "text-gray-600"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MessageProfile;
