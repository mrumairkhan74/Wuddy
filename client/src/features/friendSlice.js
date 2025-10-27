import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as FriendApi from '../api/friendApi'

// get All friends

export const GetFriends = createAsyncThunk('friends/get', async (_, { rejectWithValue }) => {
    try {
        return await FriendApi.getFriends()

    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})



const friendSlice = createSlice({
    name: 'friend',
    initialState: { friends: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetFriends.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(GetFriends.fulfilled, (state, action) => {
                state.loading = false,
                    state.friends = action.payload.friends
            })
            .addCase(GetFriends.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })
    }

})



export default friendSlice.reducer