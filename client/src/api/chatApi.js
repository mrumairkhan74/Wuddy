import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_API

export const getGroup = async () => {
    const res = await axios.get(`${apiUrl}/chat/allByUser`, { withCredentials: true })
    return res.data
}

export const getChats = async () => {
    const res = await axios.get(`${apiUrl}/chat/allChats`, { withCredentials: true })
    return res.data
}


// get chat by id 
export const getChatById = async (chatId) => {
    const res = await axios.get(`${apiUrl}/chat/${chatId}`, { withCredentials: true })
    return res.data
}

export const createOrGet = async (receiverId) => {
    const res = await axios.post(`${apiUrl}/chat/messages`, { receiverId: receiverId }, { withCredentials: true })
    return res.data
}

export const createGroup = async (group) => {
    const res = await axios.post(`${apiUrl}/chat/create-group`, group, { withCredentials: true })
    return res.data
}

export const renameGroup = async (chatId, data) => {
    const res = await axios.put(`${apiUrl}/chat/${chatId}/rename-group`, data, { withCredentials: true })
    return res.data
}

export const addMember = async (chatId, userId) => {
    const res = await axios.put(`${apiUrl}/chat/${chatId}/add-member`, { userId }, { withCredentials: true })
    return res.data
}

export const removeMember = async (chatId, memberId) => {
    const res = await axios.delete(`${apiUrl}/chat/${chatId}/remove-member/${memberId}`, { withCredentials: true })
    return res.data
}

// messages
export const get = async (chatId) => {
    const res = await axios.get(`${apiUrl}/chat/messages/${chatId}`, { withCredentials: true })
    return res.data

}


export const send = async (data) => {
    const res = await axios.post(`${apiUrl}/chat/send/${data.chatId}`, data, { withCredentials: true })
    return res.data
}