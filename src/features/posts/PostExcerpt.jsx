import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from './TimeAgo'
import PostAuthor from '../posts/PostAuthor'
import ReactionButtons from './ReactionButtons'

let PostExcerpt = ({post, deleteAPostFunction}) => {
    
    return (
        <article className="post-excerpt">
            <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
            </Link>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0,100) + '...'}</p>
            <span onClick={() => deleteAPostFunction()}>X</span>
            <ReactionButtons post={post} />
        </article>
    )
}

PostExcerpt = React.memo(PostExcerpt)

export default PostExcerpt