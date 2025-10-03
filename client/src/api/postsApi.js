import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_API


// createPost
export const createPost = async (postData) => {
    const res = await axios.post(`${apiUrl}/post/create`, postData, { withCredentials: true })
    return res.data
}

// getPosts
export const getPost = async () => {
    const res = await axios.get(`${apiUrl}/post/all`, { withCredentials: true })
    return res.data.posts
}

// update Post
export const updatePost = async (id, updated) => {
    const res = await axios.put(`${apiUrl}/post/${id}`, updated, { withCredentials: true })
    return res.data
}

// deletePost

export const deletePost = async (id) => {
    const res = await axios.delete(`${apiUrl}/post/${id}`, { withCredentials: true })
    return res.data
}
// myPosts

export const myPost = async () => {
    const res = await axios.get(`${apiUrl}/post/myPosts`, { withCredentials: true })
    return res.data.posts
}