import React from 'react'
import { MainContainer, AccessDenied, HomePage } from 'containers'
import { RouteTo, CheckAuthentication } from 'components/Utils/RouterAction'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { DecideWhere } from '../components/Utils/RouterAction'
import ManageClinicPage from '../containers/ManageClinicPage';

function Routes() {
  return (
    <Router>
      <Switch>
        
        <Route exact path="/" component={MainContainer} />
        <Route path="/dashboard" render={props => <HomePage {...props} />} />
        <Route path="/clinic/:clinicID" render={props => <ManageClinicPage {...props} />} />
        <Route component={AccessDenied} />
      </Switch>
    </Router>
  )
}

export default Routes
