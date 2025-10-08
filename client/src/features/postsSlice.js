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

// create Post

export const createPosts = createAsyncThunk("posts/createPost", async (postData, { rejectWithValue }) => {
    try {
        return await postsApi.createPost(postData);
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// updatePost
export const updatePosts = createAsyncThunk("posts/update", async ({ id, updated }, { rejectWithValue }) => {
    try {
        return postsApi.updatePost(id, updated)
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// delete Post
export const deletePosts = createAsyncThunk("posts/delete", async (id, { rejectWithValue }) => {
    try {
        return postsApi.deletePost(id)
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// get post by userId
export const GetPostByUser = createAsyncThunk("posts/getPostByUser", async (id, { rejectWithValue }) => {
    try {
        return await postsApi.PostByUser(id)
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
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

            // createPost
            .addCase(createPosts.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(createPosts.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(state.posts)) {
                    state.posts.unshift(action.payload.post); // add new post at the top
                } else {
                    state.posts = [action.payload.post];
                }
            })

            .addCase(createPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })

            // updatePost
            .addCase(updatePosts.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(updatePosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.post
            })
            .addCase(updatePosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })

            // delete Post
            .addCase(deletePosts.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(deletePosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = state.posts.filter((post) => post._id !== action.payload)
            })
            .addCase(deletePosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })
            // getPost byUSer
            .addCase(GetPostByUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(GetPostByUser.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload
            })
            .addCase(GetPostByUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.error
            })
    }
})


export default postsSlice.reducer