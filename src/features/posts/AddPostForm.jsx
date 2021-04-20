import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {addAPost} from './postsSlice'
import {nanoid} from '@reduxjs/toolkit'

const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch()

    const savePost = (event) => {
        event.preventDefault()

        dispatch(
            addAPost({
                id: nanoid(),
                title,
                content
            })
        )

        setTitle("")
        setContent("")
    }

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

                <label htmlFor="postContent">Content:</label>
                <input 
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={event => setContent(event.target.value)}
                    required
                />
                <button type="submit">Save Post</button>
            </form>
        </section>
    )
}
 export default AddPostForm