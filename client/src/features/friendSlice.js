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


// send friend request
export const sendFriendRequest = createAsyncThunk('/friends/send-request/:id', async (receiverId, { rejectWithValue }) => {
    try {
        const res = await FriendApi.sendRequest(receiverId)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
})


// accept friend request
export const acceptFriendRequest = createAsyncThunk('/friends/accept-request/:id', async (senderId, { rejectWithValue }) => {
    try {
        const res = await FriendApi.acceptRequest(senderId)
        return res.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})


// reject friend request
export const rejectFriendRequest = createAsyncThunk('friends/reject-request/:id', async (senderId, { rejectWithValue }) => {
    try {
        const res = await FriendApi.rejectRequest(senderId)
        return res.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

// remove friends

export const removeFriendRequest = createAsyncThunk('friend/remove-friend/:id', async (friendId, { rejectWithValue }) => {
    try {
        const res = await FriendApi.removeFriend(friendId)
        return res.data

    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

// get friends requests

export const getFriendsRequests = createAsyncThunk('friends/getRequests', async (_, { rejectWithValue }) => {
    try {
        const res = await FriendApi.getRequests()
        return res.data
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
            // get friend request
            .addCase(getFriendsRequests.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getFriendsRequests.fulfilled, (state, action) => {
                state.loading = false,
                    state.friends = action.payload
            })
            .addCase(getFriendsRequests.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })

            // accept request
            .addCase(acceptFriendRequest.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(acceptFriendRequest.fulfilled, (state, action) => {
                state.loading = false,
                    state.friends = action.payload
            })
            .addCase(acceptFriendRequest.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })
            // send friend request
            .addCase(sendFriendRequest.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(sendFriendRequest.fulfilled, (state, action) => {
                state.loading = false,
                    state.friends = action.payload
            })
            .addCase(sendFriendRequest.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })
            // reject friend request
            .addCase(rejectFriendRequest.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(rejectFriendRequest.fulfilled, (state, action) => {
                state.loading = false,
                    state.friends = action.payload
            })
            .addCase(rejectFriendRequest.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })
            // remove friend 
            .addCase(removeFriendRequest.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(removeFriendRequest.fulfilled, (state, action) => {
                state.loading = false,
                    state.friends = action.payload
            })
            .addCase(removeFriendRequest.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.error
            })

    }

})



export default friendSlice.reducer