import React, { useState } from 'react'
import Task from '../components/Task'
import Birthday from '../components/Birthday'
import Friend from '../components/Friend'
import Groups from '../components/Groups'
import CreatePost from '../components/CreatePost'
import PostPage from '../components/PostPage'
import { useSelector } from 'react-redux'
import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import { MdOutlineMenuOpen } from "react-icons/md";

const Home = () => {
  const { user } = useSelector((state) => state.auth)
  const [isTaskOpen, setIsTaskOpen] = useState(false)

  return (
    <div className="z-0 container mx-auto relative">
      <div className="flex flex-wrap items-start justify-center gap-3">

        <button onClick={() => setIsTaskOpen(!isTaskOpen)} className='hidden md:flex items-start cursor-pointer justify-center text-3xl text-[#206059]'>
          {isTaskOpen ? <LuPanelRightOpen /> : <LuPanelLeftOpen />}
        </button>
        {/* Left Sidebar (hidden on mobile) */}
        {
          isTaskOpen &&
          <div className="hidden md:flex flex-col shadow-md rounded-md">
            <Task />
            <Birthday />
            {/* <Friend /> */}
            {/* <Groups /> */}
          </div>
        }

        {/* Main Content (always visible) */}
        <div className="flex-1 min-h-[700px] rounded-md p-3">
          {/* Create post stays fixed */}
          <div className="flex justify-center items-center mb-2">
            <CreatePost user={user} />
          </div>

          {/* Posts container */}
          <h1 className='text-center md:block hidden  bg-[#206059] rounded-t-md shadow-md p-2 text-white text-2xl  z-20 '>All Posts</h1>

          <div className="bg-white shadow-md rounded-md h-[550px] overflow-y-auto">

            <PostPage />
          </div>
        </div>


        {/* Right Sidebar (hidden on mobile) */}
        

      </div>
    </div>
  )
}

export default Home
