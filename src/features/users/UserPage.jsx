import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPostsByUser } from '../posts/postsSlice'
import { selectUserById } from './usersSlice'

export const UserPage = ({match}) => {

    const {id} = match.params

    const user = useSelector(state => selectUserById(state, id))

    const userPosts = useSelector(state => selectPostsByUser(state, id))

    const postTitles = userPosts.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user.name}</h2>
            <ul>
                {postTitles}
            </ul>
        </section>
    )
}