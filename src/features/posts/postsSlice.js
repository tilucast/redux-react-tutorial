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
        },
        updateAPost(state, {payload: {id, title, content}}){
            const post = state.find(postId => id === postId)
            post.title = title
            post.content = content
        }
    }
})

export const {addAPost, deleteAPost, updateAPost} = postsSlice.actions

export default postsSlice.reducer