import { createSlice, nanoid } from '@reduxjs/toolkit'
import {sub} from 'date-fns'

const initialState = [
    { 
        id: '1', title: 'First Post!', content: 'Hello!', 
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
    },
    { id: '2', title: 'Second Post', content: 'More text',
        date: sub(new Date(), {minutes: 8}).toISOString(),
        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
    }
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
                        date: new Date().toISOString(),
                        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},
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
        },
        reactToAPost(state, action){
            const {postId, reaction} = action.payload
            const existingPost = state.find(post => post.id === postId)
            existingPost.reactions[reaction]++
        }
    }
})

export const {addAPost, deleteAPost, updateAPost, reactToAPost} = postsSlice.actions

export default postsSlice.reducer