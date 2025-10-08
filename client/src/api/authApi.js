import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_API

// signupApi

export const signUp = async (userData) => {
    const res = await axios.post(`${apiUrl}/user/create`, userData, { withCredentials: true })
    return res.data;
}
// login api
export const login = async (credentials) => {
    const res = await axios.post(`${apiUrl}/user/login`, credentials, { withCredentials: true });
    return res.data;
}
// update Api
export const updateUser = async (userId, updateData) => {
    const res = await axios.put(`${apiUrl}/user/${userId}`, updateData, {
        withCredentials: true
    })
    return res.data;
}
// get verify
export const getMe = async () => {
    const res = await axios.get(`${apiUrl}/user/me`, { withCredentials: true })
    return res.data
}

// logout
export const logout = async () => {
    const res = await axios.get(`${apiUrl}/user/logout`, { withCredentials: true })
    return res.data
}

// getUserById
export const getById = async (userId) => {
    const res = await axios.get(`${apiUrl}/user/${userId}`, { withCredentials: true })
    return res.data.users
}