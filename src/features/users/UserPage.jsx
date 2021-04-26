import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllPosts } from '../posts/postsSlice'
import { selectUserById } from './usersSlice'

export const UserPage = ({match}) => {

    const {id} = match.params

    const user = useSelector(state => selectUserById(state, id))

    const userPosts = useSelector(state => {
        const allPosts = selectAllPosts(state)
        console.log(allPosts);
        return allPosts.filter(post => post.user === id)
    })

    //console.log(userPosts, user);

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