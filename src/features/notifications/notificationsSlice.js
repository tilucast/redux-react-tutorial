import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";

export const fetchNotifications = 
    createAsyncThunk('notifications/fetchNotifications', async (_, {getState}) => {
        const {notifications} = selectAllNotifications(getState())
        const [latestNotification] = notifications
        const latestTimestamp = latestNotification ? latestNotification.date : ''
        const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`)
        return response.notifications
})

const initialState = {
    notifications: [],
    status: 'idle'
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        allNotificationsAreRead(state, action) {
            state.notifications.forEach(notification => notification.read = true)
        }
    },
    extraReducers: {
        [fetchNotifications.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchNotifications.fulfilled]: (state, action) => {
            state.notifications.forEach(notification => notification.isNew = !notification.read)
            state.notifications.push(...action.payload)
            state.notifications.sort((a,b) => b.date.localeCompare(a.date))
            state.status = 'succeeded'
        }
    }
})

export const {allNotificationsAreRead} = notificationsSlice.actions

export default notificationsSlice.reducer

export const selectAllNotifications = state => state.notifications