import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import {createAPost} from './postsSlice'

const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [_, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    const users = useSelector(selectAllUsers)
    const canSave = 
        [title, content, userId].every(Boolean) //!!title && !!content && !!userId

    const savePost = async (event) => {
        event.preventDefault()

        if(canSave){
            try{
                setRequestStatus('pending')
                const result = await dispatch(createAPost({title, content, user: userId}))
                unwrapResult(result)
                setTitle("")
                setContent("")
                setUserId("")

            }catch(error){
                console.error(error);
            } finally{
                setRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user => {
        return (
            <option key={user.id} value={user.id}>
                {user.name}
            </option>
        )
    })

    return (
        <section>
            <h2>Add a new post</h2>
            <form onSubmit={savePost}>
                <label htmlFor="postTitle">Post title:</label>
                <input 
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    required
                />

                <label htmlFor="postAuthor">Author:</label>
                <select 
                    id="postAuthor" 
                    value={userId}
                    onChange={event => setUserId(event.target.value)}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>

                <label htmlFor="postContent">Content:</label>
                <input 
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={event => setContent(event.target.value)}
                    required
                />
                <button type="submit" disabled={!canSave}>Save Post</button>
            </form>
        </section>
    )
}
 export default AddPostForm