import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import AddPostForm from './features/posts/AddPostForm'
import PostsList from './features/posts/PostList'
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'
import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'
import { NotificationsList } from './features/notifications/NotificationsList'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <AddPostForm />
                <PostsList />
              </>
            )}
          />
          <Route path="/posts/:id" component={SinglePostPage} />
          <Route path="/editPost/:id" component={EditPostForm} />
          <Route path="/users" component={UsersList} exact/>
          <Route path="/users/:id" component={UserPage}/>
          <Route path="/notifications" component={NotificationsList} exact/>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
