import axios from 'axios';
const apiUrl = import.meta.env.VITE_BACKEND_API



export const get = async (chatId) => {
    const res = await axios.get(`${apiUrl}/message/${chatId}`, { withCredentials: true })
    return res.data

}


export const send = async(data)=>{
    const res = await axios.post(`${apiUrl}/message/send`,data, { withCredentials: true })
    return res.data
}