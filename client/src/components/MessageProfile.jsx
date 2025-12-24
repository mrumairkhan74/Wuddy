import React, { useState } from 'react';
import { IoCall, IoVideocam, IoPerson } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MessageProfile = () => {
    const { user } = useSelector(state => state.auth);
    const { currentChat } = useSelector(state => state.chat);
    const [activeTab, setActiveTab] = useState("images");

    // Example placeholder media (replace with real chat media later)
    const images = [
        "https://source.unsplash.com/random/200x200?sig=1",
        "https://source.unsplash.com/random/200x200?sig=2",
        "https://source.unsplash.com/random/200x200?sig=3",
        "https://source.unsplash.com/random/200x200?sig=4",
    ];

    const videos = [
        "https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_1mb.mp4",
        "https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_2mb.mp4"
    ];

    const others = [
        { name: "Document.pdf", type: "PDF" },
        { name: "Notes.txt", type: "Text File" }
    ];

    // Determine profile data (group or private)
    const isGroupChat = currentChat?.isGroupChat;

    const profileData = isGroupChat
        ? {
            name: currentChat?.chatName,
            image: currentChat?.groupProfile?.url || "/group-avatar.png",
            subtitle: `${currentChat?.members?.length || 0} members`
        }
        : (() => {
            const friend = currentChat?.members?.find(
                m => m._id !== user._id
            );

            return friend
                ? {
                    name: `${friend.firstName} ${friend.lastName}`,
                    image: friend.profileImg?.url || "/default-avatar.png",
                    subtitle: friend.isOnline ? "Online" : "Offline",
                    userId: friend._id
                }
                : null;
        })();

    if (!currentChat) return null;

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden mt-5">
            {/* Profile Section */}
            <div className="flex flex-col items-center justify-center w-full p-6 bg-[#f9fafa]">
                <img
                    src={profileData?.image || "https://via.placeholder.com/120"}
                    alt="Chat profile"
                    className="w-32 h-32 rounded-full object-cover shadow-md border border-gray-200"
                />
                <h2 className="text-2xl font-semibold mt-3 text-gray-700">
                    {profileData?.name}
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                    {profileData?.subtitle}
                </p>

                {/* Action Icons */}
                <div className="flex justify-center items-center gap-5 mt-2">
                    {!isGroupChat && (
                        <Link to={`/myProfile/${profileData?.userId}`}>
                            <IoPerson className="text-3xl text-[#206059] hover:text-[#1b4e47] cursor-pointer transition-transform hover:scale-110" />
                        </Link>
                    )}
                    <IoCall className="text-3xl text-[#206059] hover:text-[#1b4e47] cursor-pointer transition-transform hover:scale-110" />
                    <IoVideocam className="text-3xl text-[#206059] hover:text-[#1b4e47] cursor-pointer transition-transform hover:scale-110" />
                    <BsThreeDots className="text-3xl text-[#206059] hover:text-[#1b4e47] cursor-pointer transition-transform hover:scale-110" />
                </div>
            </div>

            {/* Navigation Links */}
            <div className="w-full border-t border-gray-100 flex flex-col divide-y divide-gray-100">
                <Link to="#" className="p-5 text-lg text-gray-600 hover:bg-gray-50 transition">Messages</Link>
                <Link to="#" className="p-5 text-lg text-gray-600 hover:bg-gray-50 transition">Chat</Link>
                <Link to="#" className="p-5 text-lg text-gray-600 hover:bg-gray-50 transition">Privacy & Security</Link>
            </div>

            {/* Media Tabs */}
            <div className="w-full p-5">
                <div className="flex justify-around mb-5">
                    <button
                        onClick={() => setActiveTab("images")}
                        className={`text-lg font-medium px-4 py-2 rounded-md transition ${activeTab === "images"
                            ? "bg-[#206059] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Images
                    </button>
                    <button
                        onClick={() => setActiveTab("videos")}
                        className={`text-lg font-medium px-4 py-2 rounded-md transition ${activeTab === "videos"
                            ? "bg-[#206059] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Videos
                    </button>
                    <button
                        onClick={() => setActiveTab("others")}
                        className={`text-lg font-medium px-4 py-2 rounded-md transition ${activeTab === "others"
                            ? "bg-[#206059] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Others
                    </button>
                </div>

                {/* Tab Content */}
                <div className="min-h-[150px]">
                    {activeTab === "images" && (
                        <div className="grid grid-cols-3 gap-3">
                            {images.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt="Chat media"
                                    className="w-full h-24 object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-90 transition"
                                />
                            ))}
                        </div>
                    )}

                    {activeTab === "videos" && (
                        <div className="flex flex-col gap-3">
                            {videos.map((src, i) => (
                                <video
                                    key={i}
                                    controls
                                    className="w-full rounded-lg shadow-sm"
                                >
                                    <source src={src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ))}
                        </div>
                    )}

                    {activeTab === "others" && (
                        <div className="flex flex-col gap-2">
                            {others.map((file, i) => (
                                <div
                                    key={i}
                                    className="p-3 bg-gray-50 border rounded-lg flex justify-between items-center hover:bg-gray-100 transition"
                                >
                                    <span className="text-gray-700">{file.name}</span>
                                    <span className="text-sm text-gray-500">{file.type}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageProfile;
