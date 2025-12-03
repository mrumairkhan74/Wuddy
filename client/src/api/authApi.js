import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_API

// signupApi

export const signUp = async (userData) => {
    const res = await axios.post(`${apiUrl}/api/user/create`, userData, { withCredentials: true })
    return res.data;
}
// login api
export const login = async (credentials) => {
    const res = await axios.post(`${apiUrl}/api/user/login`, credentials, { withCredentials: true });
    return res.data;
}
// update Api
export const updateUser = async (userId, updateData) => {
    const res = await axios.put(`${apiUrl}/api/user/${userId}`, updateData, {
        withCredentials: true
    })
    return res.data;
}
// get verify
export const getMe = async () => {
    try {
        const res = await axios.get(`${apiUrl}/api/user/me`, { withCredentials: true })
        return res.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Access token expired — try refreshing
            const refresh = await refreshAccessToken()
            if (refresh.success) {
                const retry = await axios.get(`${apiUrl}/api/user/me`, { withCredentials: true })
                return retry.data
            }
        }
        throw error
    }
}


// logout
export const logout = async () => {
    const res = await axios.get(`${apiUrl}/api/user/logout`, { withCredentials: true })
    return res.data
}

// getUserById
export const getById = async (userId) => {
    const res = await axios.get(`${apiUrl}/api/user/${userId}`, { withCredentials: true })
    return res.data.users
}


export const getAll = async () => {
    const res = await axios.get(`${apiUrl}/api/user/all`, { withCredentials: true })
    return res.data.users
}

export const refreshAccessToken = async () => {
    const res = await axios.post(`${apiUrl}/api/user/refresh`, {}, { withCredentials: true })
    return res.data
}
