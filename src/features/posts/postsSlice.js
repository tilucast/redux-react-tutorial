import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import {client} from '../../api/client'

const postsAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null
})

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
        deleteAPost(state, {payload: {id}}){
            //const actualPost = state.entities[postId]
            postsAdapter.removeOne(state, id)
        },
        updateAPost(state, {payload: {id, title, content}}){
            //const post = state.posts.find(post => id === post.id)
            const post = state.entities[id]
            post.title = title
            post.content = content
        },
        reactToAPost(state, {payload: {postId, reaction}}){
            //const existingPost = state.posts.find(post => post.id === postId)
            const existingPost = state.entities[postId]
            existingPost.reactions[reaction]++
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            //state.posts = state.posts.concat(action.payload)
            postsAdapter.upsertMany(state, action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [createAPost.fulfilled]: postsAdapter.addOne
    }
})

export const {addAPost, deleteAPost, updateAPost, reactToAPost} = postsSlice.actions

// export const selectAllPosts = state => state.posts.posts

// export const selectPostById = 
//     (state, postId) => state.posts.posts.find(post => post.id === postId)

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
)

export default postsSlice.reducer