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

import { PatientInformation, PatientHistory, PatientVaccination } from 'components'

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
  }
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
         patient_name: this.state.patient.fullname,
         details: this.state.patient.gender + ' | ' + this.state.patient.dob,
         avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
      }

    return (
      <div className={classes.root}>

        <div>
          <Fragment key={patient.id}>
              <ListItem button>
                <Avatar alt="Profile Picture" src={patient.avatar} />
                <ListItemText primary={patient.patient_name} secondary={patient.details} />
              </ListItem>
          </Fragment>
          <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="History" />
                {/* <Tab label="Medications" /> */}
                <Tab label="Vaccinations" />
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
                <PatientInformation {...this.props} />
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