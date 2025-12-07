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

// getUSerByID
export const getUserById = createAsyncThunk("auth/getById", async (userId, { rejectWithValue }) => {
    try {
        const user = await authApi.getById(userId)
        return user
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

// logout User
export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        return await authApi.logout();
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }

})

// update User
export const updatedUser = createAsyncThunk("auth/update", async ({ userId, updateData }, { rejectWithValue }) => {
    try {
        return await authApi.updateUser(userId, updateData)
    }
    catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

// all user

export const getAllUser = createAsyncThunk("auth/user/all", async (_, { rejectWithValue }) => {
    try {
        return await authApi.getAll()
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, profile: null, token: null, loading: false, error: null },
    reducers: {
        logout: (state) => { state.user = null; state.token = null },
        updateUser: (state, action) => { state.user = action.payload },
        updateUserStatus: (state, action) => {
            const { userId, activeStatus } = action.payload;
            const user = state.users?.find(u => u._id === userId);
            if (user) user.activeStatus = activeStatus;
        }

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
            .addCase(updatedUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    ...state.user,       // keep existing fields (name, email, etc.)
                    ...action.payload.user, // overwrite with updated fields like coverImg
                };
            })
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
            })
            // getByID
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.error
            })

            // get all user
            .addCase(getAllUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.error
            })
    }

})


export const { logout, updateUser, updateUserStatus } = authSlice.actions;
export default authSlice.reducer