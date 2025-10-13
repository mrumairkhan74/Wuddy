import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_API

export const getGroup = async () => {
    const res = await axios.get(`${apiUrl}/chat/allByUser`, { withCredentials: true })
    return res.data
}