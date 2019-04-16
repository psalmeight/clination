import React from 'react'
import { MainContainer, AccessDenied, HomePage } from 'containers'
import { RouteTo, CheckAuthentication } from 'components/Utils/RouterAction'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { DecideWhere } from '../components/Utils/RouterAction'

function Routes() {
  return (
    <Router>
      <Switch>
        
        <Route exact path="/" component={MainContainer} />
        <Route exact path="/user" component={HomePage} />

        <Route component={AccessDenied} />
      </Switch>
    </Router>
  )
}

export default Routes
