import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';
import { _getPatient } from '../../rest/patient.api'
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { PatientInformation, PatientHistory, PatientVaccination, PatientPastHistory } from 'components'
import _ from 'lodash'
import moment from 'moment'

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  orangeAvatar: {
      color: '#fff',
      backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
      color: '#fff',
      backgroundColor: deepPurple[500],
  },
})

class PatientDashboard extends React.Component {
  state = {
    value: 0,
    patient: {}
  }

  componentDidMount(){
    this.fetchPatient()
  }

  fetchPatient = () => {
    _getPatient(this.props.match.params.patientID, data => {
      this.fetchPatientSuccess(data)
    })
  }

  fetchPatientSuccess = patient => {
    this.setState({ patient })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
      const { classes } = this.props;
      const { value } = this.state;

      let patient = {
         id: this.state.patient.id,
         patient_name: this.state.patient.fullname + ' (' + moment().diff(this.state.patient.dob, 'years') + ' y.o)',
         details: this.state.patient.gender + ' | ' + moment(this.state.patient.dob).format("MM/DD/YYYY")
      }

      let avatarClass = this.state.patient.gender === 'MALE' ? classes.purpleAvatar : classes.orangeAvatar

      let genderChar = !_.isEmpty(this.state.patient.gender) ? this.state.patient.gender[0] : '-'
    return (
      <div className={classes.root}>

        <div>
          <Fragment key={patient.id}>
              <ListItem button>
                <Avatar className={avatarClass}>{ genderChar || '-' }</Avatar>
                <ListItemText primary={patient.patient_name} secondary={patient.details} />
              </ListItem>
          </Fragment>
          <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="History" />
                <Tab label="Vaccinations" />
                <Tab label="Past History" />
                <Tab label="Information" />
              </Tabs>
          </AppBar>
        </div>
        <div>
          {value === 0 && <TabContainer>
                <PatientHistory {...this.props} />
          </TabContainer>}
          {value === 1 && <TabContainer>
                <PatientVaccination {...this.props} />
          </TabContainer>}
          {value === 2 && <TabContainer>
              <PatientPastHistory 
                  fetchPatient={this.fetchPatient} 
                  patient={this.state.patient} 
                  {...this.props} 
                />
          </TabContainer>}
          {value === 3 && <TabContainer>
                <PatientInformation 
                  fetchPatient={this.fetchPatient} 
                  patient={this.state.patient} 
                  {...this.props} 
                />
          </TabContainer>}
        </div>

      </div>
    );
  }
}

PatientDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PatientDashboard)