import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from '../api/authApi';



export const signUpUser = createAsyncThunk("auth/signupUser", async (userData, { rejectWithValue }) => {
    try {
        return await authApi.signUp(userData);
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (credential, { rejectWithValue }) => {
    try {
        return await authApi.login(credential)
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
})


// getUserData
export const GetMe = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
    try {
        const res = await authApi.getMe();
        return res.user;
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})


export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        return await authApi.logout();
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }

})

export const updatedUser = createAsyncThunk("auth/update", async ({ userId, updateData }, { rejectWithValue }) => {
    try {
        return await authApi.updateUser(userId, updateData)
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, loading: false, error: null },
    reducers: {
        logout: (state) => { state.user = null; state.token = null },
        updateUser: (state, action) => { state.user = action.payload }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })
            // login case
            .addCase(loginUser.pending, ((state) => {
                state.loading = true;
                state.error = null
            }))
            .addCase(loginUser.fulfilled, ((state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            }))
            .addCase(loginUser.rejected, ((state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            }))
            .addCase(updatedUser.pending, ((state) => {
                state.loading = true;
                state.error = null
            }))
            .addCase(updatedUser.fulfilled, ((state, action) => {
                state.loading = false;
                state.user = action.payload.user;

            }))
            .addCase(updatedUser.rejected, ((state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            }))
            // 
            .addCase(GetMe.pending, (state) => { state.loading = true; })
            .addCase(GetMe.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
            .addCase(GetMe.rejected, (state) => { state.loading = false; state.user = null; })
            // logout
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error;
            });
    }

})


export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer