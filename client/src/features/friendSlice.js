import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as FriendApi from "../api/friendApi";

export const GetFriends = createAsyncThunk("friends/get", async (_, { rejectWithValue }) => {
  try {
    return await FriendApi.getFriends();
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const sendFriendRequest = createAsyncThunk("friends/send-request", async (receiverId, { rejectWithValue }) => {
  try {
    return await FriendApi.sendRequest(receiverId);
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const acceptFriendRequest = createAsyncThunk("friends/accept-request", async (senderId, { rejectWithValue }) => {
  try {
    return await FriendApi.acceptRequest(senderId);
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const rejectFriendRequest = createAsyncThunk("friends/reject-request", async (senderId, { rejectWithValue }) => {
  try {
    return await FriendApi.rejectRequest(senderId);
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const removeFriendRequest = createAsyncThunk("friend/remove-friend", async (friendId, { rejectWithValue }) => {
  try {
    return await FriendApi.removeFriend(friendId);
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const getFriendsRequests = createAsyncThunk("friends/getRequests", async (_, { rejectWithValue }) => {
  try {
    return await FriendApi.getRequests();
  } catch (error) {
    return rejectWithValue(error.response?.data || { error: "Failed to fetch requests" });
  }
});

const friendSlice = createSlice({
  name: "friend",
  initialState: {
    friends: [],
    friendRequests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all friends
      .addCase(GetFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload.friends;
      })
      .addCase(GetFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })

      // Get friend requests
      .addCase(getFriendsRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFriendsRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.friendRequests = action.payload;
      })
      .addCase(getFriendsRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })

      // Send, accept, reject, remove
      .addCase(sendFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendFriendRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.newFriend) {
          state.friends.push(action.payload.newFriend);
        }
      })
      .addCase(rejectFriendRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = state.friends.filter(f => f._id !== action.meta.arg);
      });
  },
});

export default friendSlice.reducer;
