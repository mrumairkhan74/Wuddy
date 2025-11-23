import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as NotificationApi from "../api/notificationApi";

// Get all notifications
export const getNotifications = createAsyncThunk(
  "notification/all",
  async (_, { rejectWithValue }) => {
    try {
      return await NotificationApi.getNotification();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Read one notification
export const readSingleNotifications = createAsyncThunk(
  "notification/single-read",
  async (notificationId, { rejectWithValue }) => {
    try {
      return await NotificationApi.readNotification(notificationId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Read all notifications
export const readAllNotifications = createAsyncThunk(
  "notification/read-all",
  async (_, { rejectWithValue }) => {
    try {
      return await NotificationApi.readAllNotification();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })

      // Read single
      .addCase(readSingleNotifications.fulfilled, (state, action) => {
        const id = action.meta.arg;
        const index = state.notifications.findIndex((n) => n._id === id);
        if (index !== -1) {
          state.notifications[index].read = true;
        }
      })

      // Read all
      .addCase(readAllNotifications.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({
          ...n,
          read: true
        }));
      });
  }
});

export default notificationSlice.reducer;
