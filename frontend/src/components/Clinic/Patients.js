import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton'

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

import { RouteTo } from '../Utils/RouterAction'
import { PatientForm, CConfirm } from 'components'
import { _getPatientsByClinic } from '../../rest/patient.api'

import _ from 'lodash'

const styles = theme => ({
   root: {
      flexGrow: 1,
   },
   grow: {
      flexGrow: 1,
   },
   searchRoot: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
   },
   chip: {
     margin: theme.spacing.unit,
   },
   input: {
      marginLeft: 8,
      flex: 1,
      width: '100%'
   },
   iconButton: {
      padding: 10,
   },
   avatar: {
      margin: 10,
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
function ListItemLink(props) {
   return <ListItem button component="a" {...props} />;
}
 
class Patients extends React.Component {
   state = {
      expanded: 0,
      data: [],
      openPatientForm: false,
      search: ''
   }

   componentDidMount(){
      this.fetchData()
   }

   searchPatient = search => {
      this.setState({ search: search.target.value }, () => this.fetchData())
   }

   fetchData = () => {
      _getPatientsByClinic(this.props.match.params.clinicID, this.state.search, data => {
         this.setState({ data })
      })
   }

   openPatientForm = val => {
      this.setState({ openPatientForm: val })
   }

   handleChange = panel => (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false,
      })
   }

   handleDelete = () => {
      alert('You clicked the delete icon.')
   }

   patientSelect = record => {
      this.goTo('/patient/' + record.id)
   }

   goTo = path => {
      RouteTo(this.props, path)
   }

   render() {
      const { classes, theme } = this.props
      const { expanded } = this.state
      
      return (
         <div className={classes.root}>

               <Grid container>
                  <Grid item md={10} xs={8}>
                     <Paper className={classes.searchRoot} style={{ marginBottom: 10, paddingLeft: 10 }}>
                        <InputBase className={classes.input} placeholder="Search patient" onChange={val => this.searchPatient(val)} />
                     </Paper>
                  </Grid>
                  <Grid item md={2} xs={4} style={{ paddingLeft: 10 }}>
                     <Button variant="contained" color="primary" style={{ width: '100%' }} onClick={() => this.openPatientForm(true)}>ADD PATIENT</Button>
                  </Grid>
               </Grid>

            <List component="nav">
               {
                  _.map(this.state.data, (record, idx) => {
                     let avatarClass = record.gender === 'M' ? classes.purpleAvatar : classes.orangeAvatar
                     
                     return <ListItem button style={{ paddingLeft: 0 }} onClick={() => this.patientSelect(record)}>
                        <ListItemIcon>
                           <Avatar className={avatarClass}>{record.gender[0]}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={`${record.lastname}, ${record.firstname} ${record.middlename}`} />
                     </ListItem>
                  })
               }
            </List>

            <PatientForm 
               open={this.state.openPatientForm} 
               closeForm={() => this.openPatientForm(false)}
               refreshList={() => this.fetchData()}
               {...this.props}
            />
            
         </div>
      )
   }
}

Patients.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(Patients)