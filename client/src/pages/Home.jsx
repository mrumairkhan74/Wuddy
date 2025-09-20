import React from 'react'
import Task from '../components/Task'
import Birthday from '../components/Birthday'
import Friend from '../components/Friend'
import Groups from '../components/Groups'

const Home = () => {
  return (
    <div className="z-0 md:m-5 p-4 ">
      <div className="flex flex-wrap items-start justify-center gap-3">

        {/* Left Sidebar (hidden on mobile) */}
        <div className="hidden md:flex flex-col shadow-md rounded-md">
          <Task />
          <Birthday />
        </div>

        {/* Main Content (always visible) */}
        <div className="flex-1 min-h-screen rounded-md p-3 overflow-hidden shadow-md">
          <div className="flex justify-center items-center mb-2">
            {/* post */}
          </div>
        </div>

        {/* Right Sidebar (hidden on mobile) */}
         <div className="hidden md:flex flex-col shadow-md rounded-md">
          <Friend />
          <Groups />
        </div>

      </div>
    </div>
  )
}

export default Home
