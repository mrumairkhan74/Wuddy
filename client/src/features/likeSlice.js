import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as likeAPI from '../api/likeApi';

// Fetch likes for a specific post
export const fetchLikes = createAsyncThunk(
  'likes/fetchLikes',
  async (postId, { rejectWithValue }) => {
    try {
      const res = await likeAPI.getPostLikes(postId);
      return res; // include postId with likes and count
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likePosts = createAsyncThunk(
  'likes/likePosts',
  async (postId, { rejectWithValue }) => {
    try {
      const res = await likeAPI.likePost(postId);
      return { postId, ...res };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unlikePosts = createAsyncThunk(
  'likes/unlikePosts',
  async (postId, { rejectWithValue }) => {
    try {
      const res = await likeAPI.unlikePost(postId);
      return { postId, ...res };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const likeSlice = createSlice({
  name: 'likes',
  initialState: {
    likes: {}, // store likes per post
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, likes, count } = action.payload;
        state.likesByPost[postId] = { likes, count };
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = action.payload;

      })
      .addCase(unlikePosts.fulfilled, (state, action) => {
        const { postId, likes, count } = action.payload;
        state.likesByPost[postId] = { likes, count };
      });
  }
});

export default likeSlice.reducer;
