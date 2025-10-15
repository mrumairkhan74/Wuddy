import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as chatApi from '../api/chatApi'
import * as messageApi from '../api/messageApi'

export const getGroupsByUser = createAsyncThunk("chat/getByUser", async (_, { rejectWithValue }) => {
    try {
        const res = await chatApi.getGroup()
        return res
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})


export const getMessagesByChat = createAsyncThunk("chat/getMessages", async (chatId, { rejectWithValue }) => {
    try {
        const res = await messageApi.get(chatId)
        return res
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

export const sendMessage = createAsyncThunk("chat/sendMessage", async (data, { rejectWithValue }) => {
    try {
        const res = await messageApi.send(data)
        return res
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})




const chatSlice = createSlice({
    name: 'chat',
    initialState: { groups: [], messages: [], currentChat: null, loading: false, error: null },
    reducers: {
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload,
            state.messages = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGroupsByUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getGroupsByUser.fulfilled, (state, action) => {
                state.loading = false,
                    state.groups = action.payload.chat || []
            })
            .addCase(getGroupsByUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })
            // messages
            .addCase(getMessagesByChat.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getMessagesByChat.fulfilled, (state, action) => {
                state.loading = false,
                    state.messages = action.payload.messages || []
            })
            .addCase(getMessagesByChat.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })
            // send message
            .addCase(sendMessage.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false,
                    state.messages.push(action.payload.message)
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })
    }
})

export const { setCurrentChat } = chatSlice.actions
export default chatSlice.reducer