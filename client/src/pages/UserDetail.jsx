import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getUserById } from '../features/authSlice'
import { GetPostByUser } from '../features/postsSlice'
import UserCover from '../components/forms/UserCover'
import UserInfo from '../components/UserInfo'
import UserProfile from '../components/UserProfile'
import UserPosts from '../components/UserPosts'
import { IoIosArrowRoundBack } from "react-icons/io";
const UserDetail = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { profile, loading } = useSelector((state) => state.auth)
    const { posts } = useSelector((state) => state.post)
    const navigate = useNavigate()

    // ✅ Fetch user only when needed
    useEffect(() => {
        if (id && (!profile || profile._id !== id)) {
            dispatch(getUserById(id))
        }
    }, [id, dispatch])  // <-- only depends on id, not profile

    // ✅ Fetch posts only once when id changes
    useEffect(() => {
        if (id) {
            dispatch(GetPostByUser(id))
        }
    }, [id, dispatch])

    // ✅ Prevent endless "Loading..." render
    if (loading && !profile) return <p className="text-center py-10">Loading...</p>

    if (!profile) return <p className="text-center py-10">User not found.</p>

    return (
        <div className="max-w-6xl mx-auto flex flex-col">
            {/* Cover */}
            <div className="p-2 sm:p-4 flex relative">
                <button onClick={() => navigate(-1)} aria-label="Go back">
                    <IoIosArrowRoundBack size={50} className='text-[#206059] z-[999] absolute left-5 top-5 cursor-pointer' />
                </button>
                <UserCover profile={profile} />
            </div>

            {/* Profile */}
            <div className="p-2 sm:p-4 border-b border-gray-300">
                <UserProfile profile={profile} />
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6 px-2 sm:px-4">
                {/* Sidebar Info */}
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <UserInfo profile={profile} />
                </div>

                {/* Posts Section */}
                <div className="w-full md:flex-1">
                    <div className="flex items-start justify-center gap-4">
                        <Link className="font-semibold text-[#206059]">Posts</Link>
                        <Link className="text-gray-500 hover:text-[#206059]">Reels</Link>
                        <Link className="text-gray-500 hover:text-[#206059]">Others</Link>
                    </div>

                    {/* User posts */}
                    {posts && posts.length > 0 ? (
                        <div className="mt-4 space-y-4">
                            {posts.map((post) => (
                                <UserPosts key={post._id} post={post} profile={profile} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center mt-4">
                            No posts yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserDetail
