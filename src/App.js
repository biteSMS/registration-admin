import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Admin, Login } from './pages'

export const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Admin} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  )
}