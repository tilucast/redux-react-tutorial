import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {deleteAPost, fetchPosts, selectPostIds} from '../posts/postsSlice'
import PostExcerpt from './PostExcerpt'

const PostsList = () => {

    const dispatch = useDispatch()
    const orderedPostIds = useSelector(selectPostIds)
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
        content = orderedPostIds.map((postId) => (
            <PostExcerpt postId={postId} key={postId} deleteAPostFunction={() => deletePost(postId)}/>
        ))

    } else if(postStatus === 'failed'){
        content = <div className="">{error}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList