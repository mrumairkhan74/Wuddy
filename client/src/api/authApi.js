import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_API

// signupApi

export const signUp = async (userData) => {
    const res = await axios.post(`${apiUrl}/user/create`, userData, { withCredentials: true })
    return res.data;
}

export const login = async (credentials) => {
    const res = await axios.post(`${apiUrl}/user/login`, credentials, { withCredentials: true });
    return res.data;
}

export const updateUser = async (userId, updateData) => {
    const res = await axios.put(`${apiUrl}/user/${userId}`, updateData, { withCredentials: true })
    return res.data;
}

export const getMe = async () => {
    const res = await axios.get(`${apiUrl}/user/me`, { withCredentials: true })
    return res.data
}