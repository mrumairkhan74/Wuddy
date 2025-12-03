import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_API


// createPost
export const createPost = async (postData) => {
    const res = await axios.post(`${apiUrl}/api/post/create`, postData, { withCredentials: true })
    return res.data
}

// getPosts
export const getPost = async () => {
    const res = await axios.get(`${apiUrl}/api/post/all`, { withCredentials: true })
    return res.data.posts
}

// update Post
export const updatePost = async (id, updated) => {
    const res = await axios.put(`${apiUrl}/api/post/${id}`, updated, { withCredentials: true })
    return res.data
}

// deletePost

export const deletePost = async (id) => {
    const res = await axios.delete(`${apiUrl}/api/post/${id}`, { withCredentials: true })
    return res.data
}
// myPosts

export const myPost = async () => {
    const res = await axios.get(`${apiUrl}/api/post/myPosts`, { withCredentials: true })
    return res.data.posts
}

// gtePost by userId
export const PostByUser = async (id) => {
    const res = await axios.get(`${apiUrl}/api/post/user/${id}`, { withCredentials: true })
    return res.data.posts
}