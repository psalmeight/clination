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
      selectedDataID: ''
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
      this.setState({ openDataForm: val })
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
         <div className={classes.root}>

            <ActionBar style={{ marginBottom: 10 }}>
               <Button color="primary" onClick={() => this.openDataForm(true)}>
                  Add New Vaccination Record
               </Button>
            </ActionBar>

            {
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

                  return <ExpansionPanel>
                     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}><strong>{moment(record.vaccination_date).format("MM/DD/YYYY")} - {vaccineString}</strong></Typography>
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
                                                      <strong>Vaccination Date</strong>
                                                   </TableCell>
                                                   <TableCell>{record.vaccination_date}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                   <TableCell>
                                                   <strong>Vaccination Notes</strong>
                                                   </TableCell>
                                                   <TableCell>{record.vaccination_notes}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                   <TableCell>
                                                   <strong>Next Vaccination Schedule</strong>
                                                   </TableCell>
                                                   <TableCell>{record.next_vaccination_schedule}</TableCell>
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
            
            <PatientVaccinationForm 
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

PatientVaccination.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(PatientVaccination)