import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from './TimeAgo'
import PostAuthor from '../posts/PostAuthor'
import ReactionButtons from './ReactionButtons'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

let PostExcerpt = ({postId, deleteAPostFunction}) => {

    const post = useSelector(state => selectPostById(state, postId))
    const postContent = post.content.length > 100 ? post.content.substring(0,100) + ' ...' : post.content
    
    return (
        <article className="post-excerpt">
            <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
            </Link>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{postContent}</p>
            <span onClick={() => deleteAPostFunction()}>X</span>
            <ReactionButtons post={post} />
        </article>
    )
}

PostExcerpt = React.memo(PostExcerpt)

export default PostExcerpt