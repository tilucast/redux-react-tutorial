import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addAPost: {
            reducer(state, action){
                state.push(action.payload)
            },
            prepare(title, content, userId){
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: userId
                    }
                }
            }
        },
        deleteAPost(state, action){
            state.splice(action.payload.index, 1)
        },
        updateAPost(state, {payload: {id, title, content}}){
            const post = state.find(post => id === post.id)
            post.title = title
            post.content = content
        }
    }
})

export const {addAPost, deleteAPost, updateAPost} = postsSlice.actions

export default postsSlice.reducer