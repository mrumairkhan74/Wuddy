import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as chatApi from '../api/chatApi'

export const getChatsByUser = createAsyncThunk("chat/getByUser", async (_, { rejectWithValue }) => {
    try {
        const res = await chatApi.getChats()
        return res
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})


export const getMessagesByChat = createAsyncThunk("chat/getMessages", async (chatId, { rejectWithValue }) => {
    try {
        const res = await chatApi.get(chatId)
        return res
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

export const sendMessage = createAsyncThunk("chat/sendMessage", async (data, { rejectWithValue }) => {
    try {
        const res = await chatApi.send(data)
        return res
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

export const createOrGetMessage = createAsyncThunk("chat/1-on-1", async (receiverId, { rejectWithValue }) => {
    try {
        const res = await chatApi.createOrGet(receiverId)
        return res

    }
    catch (error) {
        return rejectWithValue(error.response?.data);
    }
})


export const chatById = createAsyncThunk("chat/chatById", async (chatId, { rejectWithValue }) => {
    try {
        const res = await chatApi.getChatById(chatId)
        return res
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

const chatSlice = createSlice({
    name: 'chat',
    initialState: { groups: [], messages: [], chat: [], currentChat: null, loading: false, error: null },
    reducers: {
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload,
                state.messages = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChatsByUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getChatsByUser.fulfilled, (state, action) => {
                state.loading = false;

                state.groups = action.payload.chat?.groupChats || [];
                state.chat = action.payload.chat?.privateChats || [];
            })

            .addCase(getChatsByUser.rejected, (state, action) => {
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
            .addCase(sendMessage.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })

            // create a one-one chat
            .addCase(createOrGetMessage.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(createOrGetMessage.fulfilled, (state, action) => {
                state.loading = false,
                    state.chat = action.payload.chat
            })
            .addCase(createOrGetMessage.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })

            // chat by id
            .addCase(chatById.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(chatById.fulfilled, (state, action) => {
                state.loading = false,
                    state.currentChat = action.payload.chat
            })
            .addCase(chatById.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })


    }


})

export const { setCurrentChat } = chatSlice.actions
export default chatSlice.reducer