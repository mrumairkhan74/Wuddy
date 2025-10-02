import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice'
import taskReducer from './features/TaskSlice'
import notificationReducer from './features/notificationSlice'
import postsReducer from './features/postsSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
        notification: notificationReducer,
        post: postsReducer
    }
})
