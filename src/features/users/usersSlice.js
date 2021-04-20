import {createSlice} from '@reduxjs/toolkit'

const initialState = [
    {id: '0', name: 'Za Hando'},
    {id: '1', name: 'Crazy Diamond'},
    {id: '2', name: 'Star Platinum'},
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export default usersSlice.reducer