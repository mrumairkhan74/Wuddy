import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as chatApi from '../api/chatApi'


export const getGroupsByUser = createAsyncThunk("chat/getByUser", async (_, { rejectWithValue }) => {
    try {
        const res = await chatApi.getGroup()
        return res
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})



const chatSlice = createSlice({
    name: 'chat',
    initialState: { groups: [], loading: false, error: null },
    reducers: {},
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
    }
})

export default chatSlice.reducer