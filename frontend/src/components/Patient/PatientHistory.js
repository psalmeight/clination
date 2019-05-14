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
import Paper from '@material-ui/core/Paper';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

import { ActionBar, PatientHistoryForm } from 'components'
import { _getPatientHistoriesByPatient, _deletePatientHistory } from '../../rest/patient_history.api'

import { CConfirm } from 'components'

import _ from 'lodash'

const styles = theme => ({
   root: {
      flexGrow: 1,
   },
   grow: {
      flexGrow: 1,
   },
   chip: {
     margin: theme.spacing.unit,
   },
   heading: {
      textTransform: 'uppercase'
   }
})

class PatientHistory extends React.Component {
   state = {
      expanded: 0,
      data: [],
      openDataForm: false,
   }

   componentDidMount(){
      this.fetchData()
      console.log(this.props)
   }

   fetchData = () => {
      // _getPatientHistoriesByPatient(this.props.match.param.patientID, data => {
      //    this.setState({
      //       data
      //    })
      // })
   }

   handleChange = panel => (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false,
      })
   }

   handleDelete = () => {
      alert('You clicked the delete icon.')
   }

   openDataForm = val => {
      this.setState({ openDataForm: val })
   }

   onDeleteData = (val, dataID) => {
      this.setState({ openDataForm: val, selectedDataID: dataID })
   }

   deleteDataSuccess = () => {
      _deletePatientHistory(this.state.selectedDataID, () => {
         this.fetchData()
         this.onDeleteData(false, '')
      })
   }

   render() {
      const { classes } = this.props

      return (
         <div className={classes.root}>

            <ActionBar style={{ marginBottom: 10 }}>
               <Button color="primary" onClick={() => this.openDataForm(true)}>
                  Add New Patient History Record
               </Button>
            </ActionBar>

            {
               _.map(this.state.data, (record, idx) => {
                  return <ExpansionPanel>
                     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}><strong>{record.user.lastname}, {record.user.firstname} {record.user.middlename} ({record.user.role})</strong></Typography>
                     </ExpansionPanelSummary>
                     <ExpansionPanelDetails>
                        <Grid container spacing={8}>
                           <Grid item md={12} style={{ width: '100%' }}>
                              <Paper>
                                 {/* <Table>
                                    <TableBody>
                                       <TableRow>
                                          <TableCell>
                                             <strong>Email</strong>
                                          </TableCell>
                                          <TableCell>{record.user.email}</TableCell>
                                       </TableRow>
                                       <TableRow>
                                          <TableCell>
                                          <strong>Birthdate</strong>
                                          </TableCell>
                                          <TableCell>{record.user.dob}</TableCell>
                                       </TableRow>
                                       <TableRow>
                                          <TableCell>
                                          <strong>Contact</strong>
                                          </TableCell>
                                          <TableCell>{record.user.contact_no}</TableCell>
                                       </TableRow>
                                    </TableBody>
                                 </Table> */}
                              </Paper>
                           </Grid>
                        </Grid>

                     </ExpansionPanelDetails>
                     <ExpansionPanelActions style={{ justifyContent: 'flex-start' }}>
                        <Button size="small" color="secondary" onClick={() => this.onDeleteData(true, record.id)}>
                           DELETE RECORD
                        </Button>
                     </ExpansionPanelActions>
                  </ExpansionPanel>
               })
            }
            
            <PatientHistoryForm 
               open={this.state.openDataForm} 
               closeForm={() => this.openDataForm(false)} 
               refreshList={() => this.fetchData()}   
            />

            <CConfirm
               open={this.state.deleteUserOpen}
               onClose={() => this.deleteCardOpen(false)}
               onOk={() => this.deleteCardOpen(false)}
               title={'Delete Confirmation'}
               message={`Are you sure you want to delete this record?`}
               actions={[
                  { actionTitle: 'Confirm', action: () => this.deleteRecord(), actionType: 'primary' },
                  { actionTitle: 'Cancel', action: () => this.onDeleteUser(false, ''), actionType: 'secondary' }
               ]}
            />
         </div>
      )
   }
}

PatientHistory.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(PatientHistory)