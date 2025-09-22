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






const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, loading: false, error: null },
    reducers: {
        logout: (state) => { state.user = null; state.token = null },
        updateUser: (state, action) => { state.user = action.payload }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => { state.loading = true; state.error = null })
            .addCase(signUpUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; state.token = action.payload.token })
            .addCase(signUpUser.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message })
    }

})


export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer