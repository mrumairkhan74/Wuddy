import React from "react";
import { GoDotFill } from "react-icons/go";
import { GrSend } from "react-icons/gr";

const Friend = () => {
    // Example friends data (later you can fetch from backend)
    const friends = [
        { id: 1, name: "Umair Khan", active: true },
        { id: 2, name: "Ali Raza", active: true },
        { id: 3, name: "Ayesha Noor", active: true },
        { id: 4, name: "Sara Ahmed", active: true },
    ];

    return (
        <div className="w-[300px] bg-[#206059] p-4 m-2 rounded-md shadow-md">
            <h5 className="text-[#EBF2FD] font-[Poppins] border-b-2 my-2 text-center text-xl">
                Active Friends
            </h5>


            <div className="flex flex-col item-center max-h-[300px] justify-between overflow-y-auto">

                {friends.map((friend) => (
                    <div
                        key={friend.id}
                        className="flex items-center justify-between px-2 bg-white rounded-md mb-2"
                    >
                        <div className="flex gap-2 items-center p-2">
                            {/* Avatar Placeholder (you can replace with <img /> later) */}
                            <div className="w-10 h-10 rounded-full bg-[#206059]"></div>
                            <h6 className="font-[Poppins] text-[#206059]">{friend.name}</h6>
                        </div>

                        <div className="flex items-center gap-2">
                            <GoDotFill
                                className={friend.active ? "text-green-600" : "text-gray-400"}
                                title={friend.active ? "active" : "offline"}
                            />
                            <GrSend
                                className="text-[#206059] hover:cursor-pointer text-2xl"
                                title="send message"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Friend;
