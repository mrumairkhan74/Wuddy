import React from 'react'
import Task from '../components/Task'
import Birthday from '../components/Birthday'

const Home = () => {
  return (
    <div className="z-0 m-5 p-4 ">
      <div className="flex flex-wrap items-start justify-center gap-3">

        {/* Left Sidebar (hidden on mobile) */}
        <div className="hidden md:flex flex-col shadow-md rounded-md">
          <Task />
          <Birthday />
        </div>

        {/* Main Content (always visible) */}
        <div className="flex-1 min-h-screen rounded-md p-3 overflow-y-auto shadow-md">
          <h2 className="text-[#206059] text-xl font-bold mb-4">Main Content Area</h2>
          {/* Your posts, feed, etc. */}
        </div>

        {/* Right Sidebar (hidden on mobile) */}
        <div className="hidden md:flex flex-col w-[300px] min-h-screen rounded-md p-3 shadow-md">
          <h2 className="text-[#206059]  text-xl font-bold mb-4">Right Sidebar</h2>
        </div>
      </div>
    </div>
  )
}

export default Home
