import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_API

// signupApi

export const signUp = async (userData) => {
    const res = await axios.post(`${apiUrl}/user/create`, userData)
    return res.data;
}

export const login = async (credentials) => {
    const res = await axios.post(`${apiUrl}/user/login`, credentials);
    return res.data;
}

export const updateUser = async (userId, updateData) => {
    const res = await axios.put(`${apiUrl}/user/${userId}`, updateData, { withCredentials: true })
    return res.data;
}