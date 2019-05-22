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
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { unstable_Box as Box } from '@material-ui/core/Box'

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
      selectedDataID: '',
      selectedData: {},
      mode: 'add'
   }

   componentDidMount(){
      this.fetchData()
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
      this.setState({ mode: 'add', selectedData: {}, openDataForm: val })
   }

   onEditData = (val, data) => {
      this.setState({ mode: 'edit', selectedData: data, openDataForm: val  })
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
         <div className={classes.root} style={{ padding: 10 }}>
            
            <Paper elevation={2} style={{ padding: 20 }}>
               <Grid container>
                  <Grid item>
                     <Typography variant="h6" style={{ marginBottom: 20 }}>
                        Patient History
                     </Typography>
                  </Grid>
                  <Grid item style={{ justifyContent: 'flex-end', textAlign: 'right' }}>
                     <ActionBar style={{ marginBottom: 10 }}>
                        <Button color="primary" onClick={() => this.openDataForm(true)}>
                           Add New History Record
                        </Button>
                     </ActionBar>
                  </Grid>
               </Grid>

               {
                  _.map(this.state.data, (record, idx) => {

                     let expanded = idx == 0 ? true : null
                     let bgColor = idx == 0 ? '#e0f1ff80' : '#fff'

                     return <ExpansionPanel expanded={expanded} style={{ backgroundColor: bgColor }}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                           <Typography className={classes.heading}><strong>{moment(record.visit_datetime).format("MM/DD/YYYY")} - {record.chief_complaint}</strong></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                           <Paper style={{ marginBottom: 10, width: '100%' }}>
                              <Grid container display="block">
                                 <Grid item md={4} xs={12} style={{ paddingRight: 5 }}>
                                    <Table>
                                       <TableBody>
                                          <TableRow>
                                             <TableCell>
                                                <strong>Chief Complaint</strong>
                                             </TableCell>
                                             <TableCell style={{ textAlign: 'right' }}><p style={{ whiteSpace: 'pre-line' }}>{record.chief_complaint || 'N/A'}</p></TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell>
                                             <strong>History of Illness</strong>
                                             </TableCell>
                                             <TableCell style={{ textAlign: 'right' }}><p style={{ whiteSpace: 'pre-line' }}>{record.history_present_illness || 'N/A'}</p></TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell>
                                             <strong>Physical Exam</strong>
                                             </TableCell>
                                             <TableCell style={{ textAlign: 'right' }}><p style={{ whiteSpace: 'pre-line' }}>{record.physical_exam || 'N/A' }</p></TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell>
                                             <strong>Diagnosis</strong>
                                             </TableCell>
                                             <TableCell style={{ textAlign: 'right' }}><p style={{ whiteSpace: 'pre-line' }}>{record.diagnosis || 'N/A'}</p></TableCell>
                                          </TableRow>
                                       </TableBody>
                                    </Table>
                                 </Grid>
                                 <Grid item md={4} xs={12} style={{ paddingLeft: 5 }}>
                                    <Table>
                                       <TableBody>
                                          <TableRow>
                                             <TableCell>
                                                <strong>Weight/Height</strong>
                                             </TableCell>
                                             <TableCell style={{ textAlign: 'right' }}>{record.init_weight || '--'} kg / {record.init_height || '--'} cm</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell>
                                                <strong>Head Circumference</strong>
                                             </TableCell>
                                             <TableCell style={{ textAlign: 'right' }}>{record.init_head_circumference || '--'} cm</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell>
                                             <strong>Temperature</strong>
                                             </TableCell>
                                             <TableCell style={{ textAlign: 'right' }}>{record.init_temp || '--'} C</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell>
                                             <strong>Pulse</strong>
                                             </TableCell>
                                             <TableCell style={{ textAlign: 'right' }}>{record.init_pulse_rate || '--'} bpm</TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell>
                                             <strong>Respiratory</strong>
                                             </TableCell>
                                             <TableCell style={{ textAlign: 'right' }}>{record.init_resp_rate || '--'} bpm</TableCell>
                                          </TableRow>
                                       </TableBody>
                                    </Table>
                                 </Grid>
                                 <Grid item md={4} xs={12} style={{ paddingLeft: 5 }}>
                                    <Table>
                                       <TableBody>
                                          <TableRow>
                                             <TableCell>
                                                <strong>Medications</strong>
                                             </TableCell>
                                             <TableCell style={{ textAlign: 'right' }}><p style={{ whiteSpace: 'pre-line' }}>{record.medications || '--'}</p></TableCell>
                                          </TableRow>
                                          <TableRow>
                                             <TableCell>
                                             <strong>Diagnostics/Labs</strong>
                                             </TableCell>
                                             <TableCell style={{ textAlign: 'right' }}><p style={{ whiteSpace: 'pre-line' }}>{record.diagnostics || '--'}</p></TableCell>
                                          </TableRow>
                                       </TableBody>
                                    </Table>
                                 </Grid>
                              </Grid>
                           </Paper>
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions style={{ justifyContent: 'flex-start' }}>
                           <Button size="small" color="primary" onClick={() => this.onEditData(true, record)}>
                              EDIT RECORD
                           </Button>
                           <Button size="small" color="secondary" onClick={() => this.onDeleteData(true, record.id)}>
                              DELETE RECORD
                           </Button>
                        </ExpansionPanelActions>
                     </ExpansionPanel>
                  })
               }
            </Paper>
            
            <PatientHistoryForm 
               open={this.state.openDataForm} 
               closeForm={() => this.openDataForm(false)} 
               refreshList={() => this.fetchData()}
               dataID={this.props.match.params.patientID}
               mode={this.state.mode}
               data={this.state.selectedData}
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