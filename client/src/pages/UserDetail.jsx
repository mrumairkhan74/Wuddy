
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserById } from '../features/authSlice'
import UserCover from '../components/forms/UserCover'
import UserInfo from '../components/UserInfo'
import UserProfile from '../components/UserProfile'
import { myPosts } from '../features/postsSlice'
import UserPosts from '../components/UserPosts'

const UserDetail = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { profile, loading } = useSelector((state) => state.auth)
    const { posts } = useSelector((state) => state.post);

    useEffect(() => {
        if (id && (!profile || profile._id !== id)) {
            dispatch(getUserById(id))
        }
    }, [id, profile, dispatch])

    useEffect(() => {
        if (id && (!profile || profile._id !== id)) {
            dispatch(myPosts(id))
        }
    }, [id, profile, dispatch])

    if (loading) return <p>Loading...</p>

    return (
        <div className="max-w-6xl mx-auto flex flex-col">
            {/* Cover */}
            <div className="p-2 sm:p-4">
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

                    {/* User posts */}
                    {posts && posts.length > 0 ? (
                        <div className="mt-4 space-y-4">
                            {posts
                                .filter((post) => post?.createdBy?._id === profile?._id)
                                .map((post) => (
                                    <UserPosts key={post._id} post={post} user={profile} />
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
