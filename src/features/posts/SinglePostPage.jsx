import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from '../posts/PostAuthor'
import { selectPostById } from './postsSlice'
import ReactionButtons from './ReactionButtons'

const SinglePostPage = ({match}) => {

    const {id} = match.params

    const post = useSelector(state => selectPostById(state, id))

    if(!post) return (
        <section>
            <h2>Post doest not exist.</h2>
        </section>
    )

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <PostAuthor userId={post.user}/>
                <p className="post-content">{post.content}</p>
                <ReactionButtons post={post}/>
                <Link to={`/editPost/${post.id}`} className="button">Edit Post</Link>
            </article>
        </section>
    )
}

export default SinglePostPage
