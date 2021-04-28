import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {deleteAPost, fetchPosts, selectAllPosts} from '../posts/postsSlice'
import PostAuthor from '../posts/PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'
import PostExcerpt from './PostExcerpt'

const PostsList = () => {

    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    const deletePost = (id) => {
        // Not working properly. I am modifying the state itself, not the mock database that was  setup for this project.
        dispatch(
            deleteAPost({id})
        )
    }

    useEffect(() => {
        if(postStatus === 'idle') {
            dispatch(fetchPosts())
            
        }
    }, [postStatus, dispatch])

    let content

    if(postStatus === 'loading'){
        content = <div className="loader">Loading ...</div>
    } else if(postStatus === 'succeeded'){
        const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

        content = orderedPosts.map((post, index) => (
            // <article className="post-excerpt" key={post.id}>
            //      <Link to={`/posts/${post.id}`}>
            //          <h3>{post.title}</h3>
            //      </Link>
            //      <div>
            //          <PostAuthor userId={post.user} />
            //          <TimeAgo timestamp={post.date} />
            //      </div>
            //      <p className="post-content">{post.content.substring(0,100) + '...'}</p>
            //      <span onClick={() => deletePost(index)}>X</span>
            //      <ReactionButtons post={post} />
            //  </article>
            <PostExcerpt post={post} key={post.id} deleteAPostFunction={() => deletePost(post.id)}/>
        ))

    } else if(postStatus === 'failed'){
        content = <div className="">{error}</div>
    }

    //React.memo(content)

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList