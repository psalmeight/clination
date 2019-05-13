import React from 'react'
import { MainContainer, AccessDenied, HomePage } from 'containers'
import { RouteTo, CheckAuthentication } from 'components/Utils/RouterAction'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { DecideWhere } from '../components/Utils/RouterAction'
import PatientContainer from '../containers/PatientContainer';
import ClinicContainer from '../containers/ClinicContainer';
import { ClinicListPage } from '../containers';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainContainer} />
        <Route path="/dashboard" render={props => CheckAuthentication(<HomePage {...props} />, ['OWNER','ADMIN','MAIN_OWNER'])} />
        <Route path="/clinics" render={props => <ClinicListPage {...props} />} />
        <Route path="/clinic/:clinicID" render={props => <ClinicContainer {...props} />} />
        <Route path="/patient/:patientID" render={props => <PatientContainer {...props} />} />
        <Route component={AccessDenied} />
      </Switch>
    </Router>
  )
}

export default Routes
