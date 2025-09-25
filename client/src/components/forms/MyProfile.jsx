import React from 'react'
import { useSelector } from 'react-redux'

const MyProfile = () => {
    const { user } = useSelector((state) => state.auth)
    // const dispatch = useDispatch();
    return (
        <div>
            <h1>{user?.name}</h1>
            <h1>{user?.gender}</h1>
            <h1>{user?.role}</h1>
            <h1>{user?.username}</h1>
        </div>
    )
}

export default MyProfile