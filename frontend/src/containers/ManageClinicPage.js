import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import {
  Modal, AppBar, Toolbar, Typography, Button, IconButton, Grid, Paper, TextField
} from '@material-ui/core'

import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { CDrawerLayout, Patients, Appointments, ClinicDashboard  } from 'components'
import _ from 'lodash'

const styles = {
   root: {
     flexGrow: 1,
   },
   grow: {
     flexGrow: 1,
   }
}

class ManageClinicPage extends React.Component {
   state = {
      data: {},
      clinicID: 0
   }

   componentDidMount(){
      this.setState({ clinicID: this.props.match.params.clinicID })
      this.fetchData()
   }

   fetchData = () => {
      let data = {
         clinic: {
            id: 1,
            clinic_name: 'Ace Dermatology'
         },
         patients: [
            { id: 1, patient: 'Ace Jordan Lumaad', gender: 'M', dob: '03/13/1990' },
            { id: 2, patient: 'Gwen Lumaad', gender: 'F', dob: '03/13/1990' },
            { id: 3, patient: 'Micah Lumaad', gender: 'M', dob: '03/13/1990' },
            { id: 4, patient: 'Caye Britani Lumaad', gender: 'F', dob: '03/13/1990' },
         ],
         appointments: [
            { id: 1, patient: 'Ace Jordan Lumaad', gender: 'M', dob: '03/13/1990' },
            { id: 2, patient: 'Gwen Lumaad', gender: 'F', dob: '03/13/1990' },
            { id: 3, patient: 'Micah Lumaad', gender: 'M', dob: '03/13/1990' },
            { id: 4, patient: 'Caye Britani Lumaad', gender: 'F', dob: '03/13/1990' },
         ]
      }

      this.setState({ data })
   }

   render() {
      const { classes, theme } = this.props;

      let drawers = [
         { name: 'Dashboard', route: `/clinic/${this.state.clinicID}`, icon: <InboxIcon /> },
         { name: 'Patients', route: `/clinic/${this.state.clinicID}/patients`, icon: <InboxIcon /> },
         { name: 'Appointments', route: `/clinic/${this.state.clinicID}/appointments`, icon: <MailIcon /> },
         { name: 'Logout', route: '/', icon: <MailIcon /> }
      ]

      return (
         <CDrawerLayout drawers={drawers} {...this.props}>
            <Route exact path={`/clinic/${this.state.clinicID}`} render={() => <ClinicDashboard />} />
            <Route exact path={`/clinic/${this.state.clinicID}/patients`} render={() => <Patients />} />
            <Route exact path={`/clinic/${this.state.clinicID}/appointments`} render={() => <Appointments />} />
         </CDrawerLayout>
      )
   }
}


export default withStyles(styles, { withTheme: true })(ManageClinicPage)