import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as postsApi from '../api/postsApi'


// all posts
export const getPosts = createAsyncThunk("posts/getAll", async (_, { rejectWithValue }) => {
    try {
        return await postsApi.getPost()
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})
// get my Posts
export const myPosts = createAsyncThunk("posts/myPost", async (_, { rejectWithValue }) => {
    try {
        return await postsApi.myPost()
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const postsSlice = createSlice({
    name: 'post',
    initialState: { posts: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // all posts
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })

            // myPosts
            .addCase(myPosts.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(myPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload
            })
            .addCase(myPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })
    }
})


export default postsSlice.reducer