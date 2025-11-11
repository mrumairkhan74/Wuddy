import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as taskApi from '../api/taskApi'


export const createTasks = createAsyncThunk('task/create', async (taskData, { rejectWithValue }) => {
    try {
        return await taskApi.createTask(taskData)
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
});

// getTask
export const getTasks = createAsyncThunk('task/get', async (_, { rejectWithValue }) => {
    try {
        return await taskApi.getTask()
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }

})

// delete Task 
export const deleteTasks = createAsyncThunk('task/delete', async (id, { rejectWithValue }) => {
    try {
        await taskApi.deleteTask(id)
        return id
    } catch (error) {
        return rejectWithValue(error.response.error)
    }
})

const taskSlice = createSlice({
    name: 'task',
    initialState: { tasks: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTasks.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(createTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload.task);
            })
            .addCase(createTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })
            // get Task
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })
            // delete task
            .addCase(deleteTasks.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(deleteTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter((task) => task._id !== action.payload)
            })
            .addCase(deleteTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })
    }
})

export default taskSlice.reducer