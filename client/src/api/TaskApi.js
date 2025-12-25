import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_API

// create Task
export const createTask = async (taskData) => {
    const res = await axios.post(`${apiUrl}/task/create`, taskData, { withCredentials: true })
    return res.data
}

// myTask
export const getTask = async () => {
    const res = await axios.get(`${apiUrl}/task/myTask`, { withCredentials: true })
    return res.data.tasks
}

// Delete Task
export const deleteTask = async (id) => {
    const res = await axios.delete(`${apiUrl}/task/${id}`, { withCredentials: true })
    return res.data
}


