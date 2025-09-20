import React from 'react'

const Birthday = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  // const [Birthdays, setBirthdays] = React.useState([])
  return (
    <>
      {/* Birthday list card */}
      <div className="w-[300px] p-4 bg-[#206059] rounded-md m-2 ">
        <h1 className="text-[#EBF2FD] font-[Poppins] border-b-2 my-2 text-center text-xl">
          Today Birthdays
        </h1>
        {/* {
          Birthdays.length === 0 ? (
            <p className="text-[#EBF2FD] text-center mt-4">No Birthdays today!</p>
          ) : ( */}
            <div className="flex flex-col item-center max-h-[300px] justify-between overflow-y-auto">
              <div className="flex items-center justify-between p-3 bg-white rounded-md mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-[#206059] w-10 h-10 rounded-full"></div>
                  <h5 className="text-[#206059] font-[Poppins]">Umair Khan</h5>
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-[10px] bg-[#206059] rounded-md px-2 py-1 text-[#EBF2FD]"
                >
                  Wish Now
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-md mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-[#206059] w-10 h-10 rounded-full"></div>
                  <h5 className="text-[#206059] font-[Poppins]">Umair Khan</h5>
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-[10px] bg-[#206059] rounded-md px-2 py-1 text-[#EBF2FD]"
                >
                  Wish Now
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-md mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-[#206059] w-10 h-10 rounded-full"></div>
                  <h5 className="text-[#206059] font-[Poppins]">Umair Khan</h5>
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-[10px] bg-[#206059] rounded-md px-2 py-1 text-[#EBF2FD]"
                >
                  Wish Now
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-md mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-[#206059] w-10 h-10 rounded-full"></div>
                  <h5 className="text-[#206059] font-[Poppins]">Umair Khan</h5>
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-[10px] bg-[#206059] rounded-md px-2 py-1 text-[#EBF2FD]"
                >
                  Wish Now
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-md mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-[#206059] w-10 h-10 rounded-full"></div>
                  <h5 className="text-[#206059] font-[Poppins]">Umair Khan</h5>
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-[10px] bg-[#206059] rounded-md px-2 py-1 text-[#EBF2FD]"
                >
                  Wish Now
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-md mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-[#206059] w-10 h-10 rounded-full"></div>
                  <h5 className="text-[#206059] font-[Poppins]">Umair Khan</h5>
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-[10px] bg-[#206059] rounded-md px-2 py-1 text-[#EBF2FD]"
                >
                  Wish Now
                </button>
              </div>
            </div>
          {/* )
        } */}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-[300px] p-5 rounded-md shadow-lg">
            <h2 className="text-[#206059] font-[Poppins] text-lg mb-3 text-center">
              Send a Birthday Wish 🎉
            </h2>
            <textarea
              rows="3"
              placeholder="Write your wish..."
              className="w-full border rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#206059]"
              resize="none"
            ></textarea>
            <div className="flex justify-between">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 rounded-md bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // handle send logic
                  setIsOpen(false)
                }}
                className="px-3 py-1 rounded-md bg-[#206059] text-[#EBF2FD]"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Birthday
