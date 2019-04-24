import React from 'react'
import { MainContainer, AccessDenied, HomePage } from 'containers'
import { RouteTo, CheckAuthentication } from 'components/Utils/RouterAction'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { DecideWhere } from '../components/Utils/RouterAction'
import PatientContainer from '../containers/PatientContainer';

function Routes() {
  return (
    <Router>
      <Switch>
        
        <Route exact path="/" component={MainContainer} />
        <Route path="/dashboard" render={props => <HomePage {...props} />} />
        <Route path="/clinic/:clinicID" render={props => <ClinicContainer {...props} />} />
        <Route path="/patient/:patientID" render={props => <PatientContainer {...props} />} />
        <Route component={AccessDenied} />
      </Switch>
    </Router>
  )
}

export default Routes
