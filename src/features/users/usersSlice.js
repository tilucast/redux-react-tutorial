import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {client} from '../../api/client'

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const users = await client.get('/fakeApi/users')
    return users.users
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            return action.payload
        }
    }
})

export default usersSlice.reducer