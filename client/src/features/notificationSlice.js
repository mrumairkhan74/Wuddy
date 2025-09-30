import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as NotificationApi from '../api/notificationApi'


export const getNotifications = createAsyncThunk('notification/all', async (_, { rejectWithValue }) => {
    try {
        return await NotificationApi.getNotification()
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const notificationSlice = createSlice({
    name: 'notification',
    initialState: { notifications: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = false,
                    state.notifications = action.payload
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })
    }
})


export default notificationSlice.reducer