import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_API


export const likePost = async (postId) => {
    const res = await axios.post(`${apiUrl}/like/${postId}`, {}, { withCredentials: true });
    return res.data;
}

export const unlikePost = async (postId) => {
    const res = await axios.post(`${apiUrl}/like/unlike/${postId}`, {}, { withCredentials: true });
    return res.data;
}

export const getPostLikes = async (postId) => {
    const res = await axios.get(`${apiUrl}/like/post/${postId}/likes`, { withCredentials: true });
    return res.data;
}