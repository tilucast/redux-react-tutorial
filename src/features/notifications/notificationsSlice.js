import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";

export const fetchNotifications = 
    createAsyncThunk('notifications/fetchNotifications', async (_, {getState}) => {
        const notifications = selectAllNotifications(getState())
        const [latestNotification] = notifications
        const latestTimestamp = latestNotification ? latestNotification.date : ''
        const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`)
        return response.notifications
})

const notificationsAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})
const initialState = notificationsAdapter.getInitialState({status: 'idle'})

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        allNotificationsAreRead(state, action) {
            Object.values(state.entities).forEach(notification => notification.read = true)
            //state.notifications.forEach(notification => notification.read = true)
        }
    },
    extraReducers: {
        [fetchNotifications.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchNotifications.fulfilled]: (state, action) => {
            Object.values(state.entities).forEach(notification => notification.isNew = !notification.read)
            //state.notifications.forEach(notification => notification.isNew = !notification.read)
            notificationsAdapter.upsertMany(state, action.payload)
            //state.notifications.push(...action.payload)
            //state.notifications.sort((a,b) => b.date.localeCompare(a.date))
            state.status = 'succeeded'
        }
    }
})

export const {allNotificationsAreRead} = notificationsSlice.actions

export default notificationsSlice.reducer

//export const selectAllNotifications = state => state.notifications

export const {
    selectAll: selectAllNotifications
} = notificationsAdapter.getSelectors(state => state.notifications)