import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allNotificationsAreRead, fetchNotifications, selectAllNotifications } from './notificationsSlice'
import {selectAllUsers} from '../users/usersSlice'
import { parseISO } from 'date-fns/esm'
import { formatDistanceToNow } from 'date-fns'
import classnames from 'classnames'

export const NotificationsList = () => {

    const dispatch = useDispatch()
    const notifications = useSelector(selectAllNotifications)
    const notificationStatus = useSelector(state => state.notifications.status)
    const users = useSelector(selectAllUsers)

    useEffect(() => {
        if(notificationStatus === 'idle'){
            dispatch(fetchNotifications())
        }
        dispatch(allNotificationsAreRead())
    } ,[dispatch, notificationStatus])

    const renderedNotifications = notifications.map(notification => {
        const date = parseISO(notification.date)
        const timeAgo = formatDistanceToNow(date)
        const user = users.find(user => user.id === notification.user) || {
            name: 'Unknown User'
        }

        const notificationClassname = classnames('notification', {
            new: notification.isNew
        })

        return (
            <div key={notification.id} className={notificationClassname}>
                <div>
                    <b>{user.name}</b> {notification.message}
                </div>
                <div title={notification.date}>
                    <i>{timeAgo} ago</i>
                </div>
            </div>
        )
    })

    return (
        <section className="notificationsList">
            <h2>Notifications</h2>
            {renderedNotifications}
        </section>
    )
}