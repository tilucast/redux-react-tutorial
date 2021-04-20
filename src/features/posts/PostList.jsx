import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {deleteAPost} from '../posts/postsSlice'

const PostsList = () => {
    const posts = useSelector(state => state.posts)

    const dispatch = useDispatch()

    const deletePost = (index) => {
        dispatch(
            deleteAPost({index})
        )
    }

    const renderedPosts = posts.map((post, index) => {
        return (
            <article className="post-excerpt" key={post.id}>
                <h3>{post.title}</h3>
                <p className="post-content">{post.content.substring(0,100)}</p>
                <span onClick={() => deletePost(index)}>X</span>
            </article>
        )
    })

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList