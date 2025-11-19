import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserById } from '../features/authSlice'
import { myPosts } from '../features/postsSlice'
import UserPosts from '../components/UserPosts'
import UserCover from '../components/forms/UserCover'

const UserProfile = () => {
    const { id } = useParams() // e.g. /user/:id
    const dispatch = useDispatch()

    const { profile, loading: authLoading } = useSelector((state) => state.auth || {})
    const { posts } = useSelector((state) => state.post || {})

    useEffect(() => {
        if (id) {
            dispatch(getUserById(id))
            dispatch(myPosts())
        }
    }, [dispatch, id])

    if (authLoading || !profile) {
        return <div>Loading profile...</div>
    }

    const userPosts =
        posts?.filter((post) => post?.createdBy?._id === profile?._id) || []

    return (
        <div className="max-w-6xl mx-auto flex flex-col">
            {/* Cover */}
            <div className="p-2 sm:p-4">
                <UserCover profile={profile} />
            </div>

            {/* Profile */}
            <div className="p-2 sm:p-4 border-b border-gray-300">
                <Profile profile={profile} />
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6 px-2 sm:px-4">
                {/* Sidebar Info */}
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <Info profile={profile} />
                </div>

                {/* Posts Section */}
                <div className="w-full md:flex-1">

                    {/* User posts */}
                    {posts && posts.length > 0 ? (
                        <div className="mt-4 space-y-4">
                            {userPosts
                                .map((post) => (
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

export default UserProfile
