import React from 'react'

const Groups = () => {
  const groups = [
    { id: 1, name: "Developers Group", joined: true },
    { id: 2, name: "Designers Hub", joined: false },
    { id: 3, name: "React Learners", joined: true },
    { id: 4, name: "Startup Founders", joined: false },
  ];

  return (
    <div className="w-[300px] bg-[#206059] p-4 m-2 rounded-md shadow-md">
      <h5 className="text-center font-[Poppins] text-[#EDF2FD] tracking-wide text-xl">
        Groups
      </h5>

      <div className="flex flex-col gap-3 mb-2 overflow-y-auto max-h-[300px] mt-5">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex justify-between items-center px-4 py-2 bg-white rounded-md"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#206059] rounded-full"></div>
              <h6 className="text-[12px] font-[Poppins] text-[#206059]">
                {group.name}
              </h6>
            </div>
            <div
              className={`text-[9px] px-2 rounded-md ${
                group.joined
                  ? "bg-[#206059] text-white"
                  : "bg-gray-300 text-[#206059]"
              }`}
            >
              {group.joined ? "Added" : "Join"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
