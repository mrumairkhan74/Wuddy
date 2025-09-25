import React from 'react'
import Task from '../components/Task'
import Birthday from '../components/Birthday'
import Friend from '../components/Friend'
import Groups from '../components/Groups'
import CreatePost from '../components/CreatePost'
import PostPage from '../components/PostPage'

const Home = () => {
  return (
    <div className="z-0 md:m-2 p-4 ">
      <div className="flex flex-wrap items-start justify-center gap-3">

        {/* Left Sidebar (hidden on mobile) */}
        <aside className="hidden md:flex flex-col shadow-md rounded-md">
          <Task className="" />
          <Birthday />
        </aside>

        {/* Main Content (always visible) */}
        <div className="flex-1 min-h-[700px] rounded-md p-3">
          {/* Create post stays fixed */}
          <div className="flex justify-center items-center mb-2">
            <CreatePost />
          </div>

          {/* Posts container */}
          <div className="bg-white shadow-md rounded-md h-[600px] overflow-y-auto">
            <PostPage />
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
