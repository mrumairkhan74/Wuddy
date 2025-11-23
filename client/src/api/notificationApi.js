import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_API

export const createNotification = async (notificationData) => {
    const res = await axios.post(`${apiUrl}/notification/create`, notificationData, { withCredentials: true })
    return res.data
}

export const getNotification = async () => {
    const res = await axios.get(`${apiUrl}/notification/all`, { withCredentials: true })
    return res.data
}


export const readNotification = async (notificationId, update) => {
    const res = await axios.put(`${apiUrl}/notification/${notificationId}/read`, update, { withCredentials: true })
    return res.data
}

export const readAllNotification = async () => {
    const res = await axios.patch(`${apiUrl}/notification/read-all`, {}, { withCredentials: true })
    return res.data
}