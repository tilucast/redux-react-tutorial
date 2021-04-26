import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {client} from '../../api/client'

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}
    // { 
    //     id: '1', title: 'First Post!', content: 'Hello!', 
    //     date: sub(new Date(), {minutes: 10}).toISOString(),
    //     reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
    // },
    // { id: '2', title: 'Second Post', content: 'More text',
    //     date: sub(new Date(), {minutes: 8}).toISOString(),
    //     reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
    // }

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
})

export const createAPost = createAsyncThunk('posts/createAPost', async postBody => {
    const response = await client.post('/fakeApi/posts', {post: postBody})

    return response.post
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // addAPost: {
        //     reducer(state, action){
        //         state.posts.push(action.payload)
        //     },
        //     prepare(title, content, userId){
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 date: new Date().toISOString(),
        //                 reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},
        //                 title,
        //                 content,
        //                 user: userId
        //             }
        //         }
        //     }
        // },
        deleteAPost(state, action){
            state.posts.splice(action.payload.index, 1)
        },
        updateAPost(state, {payload: {id, title, content}}){
            const post = state.posts.find(post => id === post.id)
            post.title = title
            post.content = content
        },
        reactToAPost(state, action){
            const {postId, reaction} = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            existingPost.reactions[reaction]++
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [createAPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload)
        }
    }
})

export const {addAPost, deleteAPost, updateAPost, reactToAPost} = postsSlice.actions

export const selectAllPosts = state => state.posts.posts

export const selectPostById = 
    (state, postId) => state.posts.posts.find(post => post.id === postId)

export default postsSlice.reducer