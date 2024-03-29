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

import { ActionBar, PatientVaccinationForm } from 'components'
import { _getPatientVaccinationsByPatient, _deletePatientVaccination } from '../../rest/patient_vaccination.api'

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

class PatientVaccination extends React.Component {
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
      _getPatientVaccinationsByPatient(this.props.match.params.patientID, data => {
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
      _deletePatientVaccination(this.state.selectedDataID, () => {
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
                        Patient Vaccinations
                     </Typography>
                  </Grid>
                  <Grid item style={{ justifyContent: 'flex-end', textAlign: 'right' }}>
                     <ActionBar style={{ marginBottom: 10 }}>
                        <Button color="primary" onClick={() => this.openDataForm(true)}>
                           Add New Vaccination Record
                        </Button>
                     </ActionBar>
                  </Grid>
               </Grid>

               {
                  !_.isEmpty(this.state.data) ? (
                  _.map(this.state.data, (record, idx) => {

                     let vaccinationRecord = record.vaccination_details ? JSON.parse(record.vaccination_details) : []
                     let vaccineString = '';

                     if(!_.isEmpty(vaccinationRecord)){   
                        vaccinationRecord.forEach((vRec, i) => {
                           if(i == 0)
                              vaccineString = vaccineString + vRec.vaccine + '(' + vRec.route + ')'
                           else
                              vaccineString = vaccineString + ', ' + vRec.vaccine + '(' + vRec.route + ')'
                        })
                     }

                     let expanded = idx == 0 ? true : null
                     let bgColor = idx == 0 ? '#e0f1ff80' : '#fff'

                     return <ExpansionPanel expanded={expanded} style={{ backgroundColor: bgColor }}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                           <Typography className={classes.heading}><strong>{moment(record.vaccination_date).format("MM/DD/YYYY")} - {vaccineString}</strong></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                           <Grid container spacing={8}>
                              <Paper style={{ width: '100%' }}>
                              <Grid item md={12}>
                                 <Grid container>
                                    <Grid item md={6} xs={12} style={{ paddingRight: 5 }}>
                                       <Table>
                                          <TableBody>
                                             <TableRow>
                                                <TableCell>
                                                   <strong>Vaccination Date</strong>
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'right' }}>{moment(record.vaccination_date).format("MM/DD/YYYY")}</TableCell>
                                             </TableRow>
                                             <TableRow>
                                                <TableCell>
                                                <strong>Vaccination Notes</strong>
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'right' }}><p style={{ whiteSpace: 'pre-line' }}>{record.vaccination_notes || 'N/A'}</p></TableCell>
                                             </TableRow>
                                             <TableRow>
                                                <TableCell>
                                                <strong>Next Vaccination Schedule</strong>
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'right' }}>{moment(record.next_vaccination_schedule).format("MM/DD/YYYY")}</TableCell>
                                             </TableRow>
                                          </TableBody>
                                       </Table>
                                    </Grid>
                                    <Grid item md={6} xs={12} style={{ paddingLeft: 5 }}>
                                       <Table>
                                          <TableBody>
                                             <TableRow>
                                                <TableCell>
                                                      <strong>Vaccine</strong>
                                                </TableCell>
                                                <TableCell>
                                                      <strong>Route</strong>
                                                </TableCell>
                                             </TableRow>
                                                {
                                                   _.map(vaccinationRecord, data => {
                                                      return <TableRow>
                                                         <TableCell>
                                                            {data.vaccine}
                                                         </TableCell>
                                                         <TableCell>
                                                            {data.route}
                                                         </TableCell>
                                                      </TableRow>
                                                   })
                                                }
                                             </TableBody>
                                       </Table>
                                    </Grid>
                                 </Grid>
                              </Grid>
                              </Paper>
                           </Grid>
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
                  })) : <Typography style={{ color: 'rgb(169, 169, 169)' }} variant="h5">No patient vaccinations data</Typography>
               }
            </Paper>
            
            <PatientVaccinationForm 
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

PatientVaccination.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(PatientVaccination)