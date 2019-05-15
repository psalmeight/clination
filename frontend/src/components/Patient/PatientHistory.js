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

import moment from 'moment'

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
      selectedDataID: ''
   }

   componentDidMount(){
      this.fetchData()
      console.log(this.props)
   }

   fetchData = () => {
      _getPatientHistoriesByPatient(this.props.match.params.patientID, data => {
         this.setState({
            data
         })
      })
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
      this.setState({ confirmDelete: val, selectedDataID: dataID })
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
                        <Typography className={classes.heading}><strong>{moment(record.visit_datetime).format("MM/DD/YYYY")} - {record.chief_complaint}</strong></Typography>
                     </ExpansionPanelSummary>
                     <ExpansionPanelDetails>
                        <Grid container spacing={8}>
                           <Grid item md={12} style={{ width: '100%' }}>
                              
                                 <Grid container>
                                    <Grid item md={6} xs={12} style={{ paddingRight: 5 }}>
                                       <Paper style={{ marginBottom: 10 }}>
                                          <Table>
                                             <TableBody>
                                                <TableRow>
                                                   <TableCell>
                                                      <strong>Chief Complaint</strong>
                                                   </TableCell>
                                                   <TableCell>{record.chief_complaint}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                   <TableCell>
                                                   <strong>History of Illness</strong>
                                                   </TableCell>
                                                   <TableCell>{record.history_present_illness}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                   <TableCell>
                                                   <strong>Physical Exam</strong>
                                                   </TableCell>
                                                   <TableCell>{record.physical_exam}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                   <TableCell>
                                                   <strong>Diagnosis</strong>
                                                   </TableCell>
                                                   <TableCell>{record.diagnosis}</TableCell>
                                                </TableRow>
                                             </TableBody>
                                          </Table>
                                       </Paper>
                                    </Grid>
                                    <Grid item md={6} xs={12} style={{ paddingLeft: 5 }}>
                                       <Paper>
                                          <Table>
                                             <TableBody>
                                                <TableRow>
                                                   <TableCell>
                                                      <strong>Weight/Height</strong>
                                                   </TableCell>
                                                   <TableCell>{record.init_weight || '--'} kg / {record.init_height || '--'} cm</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                   <TableCell>
                                                   <strong>Temperature</strong>
                                                   </TableCell>
                                                   <TableCell>{record.init_temp} C</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                   <TableCell>
                                                   <strong>Pulse</strong>
                                                   </TableCell>
                                                   <TableCell>{record.init_pulse_rate} bpm</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                   <TableCell>
                                                   <strong>Respiratory</strong>
                                                   </TableCell>
                                                   <TableCell>{record.init_resp_rate} bpm</TableCell>
                                                </TableRow>
                                             </TableBody>
                                          </Table>
                                       </Paper>
                                    </Grid>
                                 </Grid>
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
               dataID={this.props.match.params.patientID}
            />

            <CConfirm
               open={this.state.confirmDelete}
               onClose={() => this.onDeleteData(false, '')}
               onOk={() => this.onDeleteData(false, '')}
               title={'Delete Confirmation'}
               message={`Are you sure you want to delete this record?`}
               actions={[
                  { actionTitle: 'Confirm', action: () => this.deleteDataSuccess(), actionType: 'primary' },
                  { actionTitle: 'Cancel', action: () => this.onDeleteData(false, ''), actionType: 'secondary' }
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