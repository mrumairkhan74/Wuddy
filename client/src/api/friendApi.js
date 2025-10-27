import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_API



// get all friends
export const getFriends = async () => {
    const res = await axios.get(`${apiUrl}/friend/`, { withCredentials: true })
    return res.data
}

// send friend request
export const sendRequest = async (receiverId) => {
    const res = await axios.post(`${apiUrl}/friend/send-request/${receiverId}`, { withCredentials: true })
    return res.data
}

// accept request
export const acceptRequest = async (senderId) => {
    const res = await axios.post(`${apiUrl}/friend/accept-request/${senderId}`, { withCredentials: true })
    return res.data
}

// reject request
export const rejectRequest = async (senderId) => {
    const res = await axios.delete(`${apiUrl}/friend/reject-request/${senderId}`, { withCredentials: true })
    return res.data
}

// remove friend
export const removeFriend = async (friendId) => {
    const res = await axios.delete(`${apiUrl}/friend/reject-request/${friendId}`, { withCredentials: true })
    return res.data
}

// get friends requests
export const getRequests = async () => {
    const res = await axios.get(`${apiUrl}/friend/friend-requests/`, { withCredentials: true })
    return res.data
}