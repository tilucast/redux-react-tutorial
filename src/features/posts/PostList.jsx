import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {deleteAPost} from '../posts/postsSlice'
import PostAuthor from '../posts/PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostsList = () => {
    const posts = useSelector(state => state.posts)

    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

    const dispatch = useDispatch()

    const deletePost = (index) => {
        dispatch(
            deleteAPost({index})
        )
    }

    const renderedPosts = orderedPosts.map((post, index) => {
        return (
            <article className="post-excerpt" key={post.id}>
                <Link to={`/posts/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
                <div>
                    <PostAuthor userId={post.user} />
                    <TimeAgo timestamp={post.date} />
                </div>
                <p className="post-content">{post.content.substring(0,100)}</p>
                <span onClick={() => deletePost(index)}>X</span>
                <ReactionButtons post={post} />
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