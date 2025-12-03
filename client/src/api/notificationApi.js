import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_API

export const createNotification = async (notificationData) => {
    const res = await axios.post(`${apiUrl}/api/notification/create`, notificationData, { withCredentials: true })
    return res.data
}

export const getNotification = async () => {
    const res = await axios.get(`${apiUrl}/api/notification/all`, { withCredentials: true })
    return res.data
}


export const readNotification = async (notificationId, update) => {
    const res = await axios.put(`${apiUrl}/api/notification/${notificationId}/read`, update, { withCredentials: true })
    return res.data
}

export const readAllNotification = async () => {
    const res = await axios.put(`${apiUrl}/api/notification/read-all`, {}, { withCredentials: true })
    return res.data
}