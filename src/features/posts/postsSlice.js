import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addAPost(state, action){
            state.push(action.payload)
        },
        deleteAPost(state, action){
            state.splice(action.payload.index, 1)
        }
    }
})

export const {addAPost, deleteAPost} = postsSlice.actions

export default postsSlice.reducer