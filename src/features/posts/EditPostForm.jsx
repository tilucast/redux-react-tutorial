import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { updateAPost } from './postsSlice'

const EditPostForm = ({match}) => {

    const {id} = match.params

    const dispatch = useDispatch()

    const post = useSelector(state => state.posts.find(post => post.id === id))

    const history = useHistory()

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const savePost = (event) => {
        event.preventDefault()

        dispatch(updateAPost({id, content, title}))
        history.push(`/posts/${id}`)
    }

    return (
        <section>
            <h2>Edit a post</h2>

            <form onSubmit={savePost}>
                <label htmlFor="postTitle">Post Title:</label>
                <input 
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="Give your post a title boi"
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

export default EditPostForm