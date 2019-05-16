import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment'

import { CConfirm } from 'components'
import { _createPatientHistory } from '../../rest/patient_history.api'
import { DatePicker } from "material-ui-pickers"
import moment from 'moment'
import _ from 'lodash'



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
})

class PatientHistoryForm extends React.Component {
   state =  {
      form: {},
      confirm: false,
   }

   showPopup = val => {
      this.setState({ confirm: val })
   }

   submitForm = () => {
      let form = this.state.form;

      form['patient'] = this.props.dataID;

      if(_.isEmpty(this.state.form.visit_datetime)){
         form['visit_datetime'] = moment().format("MM/DD/YYYY")
      }

      _createPatientHistory(form, () => {
         this.showPopup(false)
         this.props.closeForm()
         this.props.refreshList()
      })
   }
   handleDateChange = (field, e) => {
      let form = this.state.form
      form[field] = moment(e).format("MM/DD/YYYY")
      
      this.setState({
         form
      })
   }

   handleChange = (field, e) => {
      let form = this.state.form
      form[field] = e.target.value
      
      this.setState({
         form
      })
   }

   render() {

      return (
            <div>
                <Modal open={this.props.open}>
                    <Grid 
                        container
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <Grid item>
                            <Paper elevation={2} style={{ padding: 20 }}>
                                <Typography variant="h6" style={{ marginBottom: 20 }}>
                                    New Patient History Record
                                </Typography>
                                <form noValidate autoComplete="off">
                                    <Grid container>
                                        <Grid item md={4} xs={12} style={{ paddingRight: 5 }}>
                                            <DatePicker
                                                keyboard
                                                label="Date of Visit"
                                                format={"MM/DD/YYYY"}
                                                placeholder={moment().format("MM/DD/YYYY")}
                                                mask={value =>
                                                    // handle clearing outside if value can be changed outside of the component
                                                    value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : []
                                                }
                                                value={this.state.form.visit_datetime}
                                                onChange={value => this.handleDateChange('visit_datetime', value)}
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

                                            <TextField
                                                id="chief_complaint"
                                                label="Chief Complaint"
                                                placeholder="Enter Chief Complaint"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={value => this.handleChange('chief_complaint', value)}
                                                inputProps={{ autoCapitalize: true }}
                                            />

                                            <TextField
                                                id="history_present_illness"
                                                label="History of Illness"
                                                placeholder="Enter of Illness"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                onChange={value => this.handleChange('history_present_illness', value)}
                                                
                                                InputLabelProps={{
                                                        shrink: true,
                                                }}
                                                inputProps={{ autoCapitalize: true }}
                                            />

                                            <TextField
                                                id="physical_exam"
                                                label="Physical Exam"
                                                placeholder="Enter Physical Exam"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                onChange={value => this.handleChange('physical_exam', value)}
                                                
                                                InputLabelProps={{
                                                        shrink: true,
                                                }}
                                                inputProps={{ autoCapitalize: true }}
                                            />

                                            <TextField
                                                id="diagnosis"
                                                label="Diagnosis"
                                                placeholder="Enter Diagnosis"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                onChange={value => this.handleChange('diagnosis', value)}
                                                
                                                InputLabelProps={{
                                                        shrink: true,
                                                }}
                                                inputProps={{ autoCapitalize: true }}
                                            />
                                        </Grid>
                                        <Grid item md={4} xs={12} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                            <TextField
                                                id="init_weight"
                                                label="Weight"
                                                placeholder="Enter Weight"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                onChange={value => this.handleChange('init_weight', value)}
                                                
                                                InputLabelProps={{
                                                        shrink: true,
                                                }}
                                                InputProps={{
                                                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                                    }}
                                            />

                                            <TextField
                                                id="init_height"
                                                label="Height"
                                                placeholder="Enter Height"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                onChange={value => this.handleChange('init_height', value)}
                                                InputLabelProps={{
                                                        shrink: true,
                                                }}
                                                InputProps={{
                                                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                                }}
                                            />

                                            <TextField
                                                id="init_temp"
                                                label="Temperature"
                                                placeholder="Enter Temperature"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                onChange={value => this.handleChange('init_temp', value)}
                                                
                                                InputLabelProps={{
                                                        shrink: true,
                                                }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">C</InputAdornment>,
                                                }}
                                            />

                                            <TextField
                                                id="init_pulse_rate"
                                                label="Pulse Rate"
                                                placeholder="Enter Pulse Rate"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                onChange={value => this.handleChange('init_pulse_rate', value)}
                                                
                                                InputLabelProps={{
                                                        shrink: true,
                                                }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">bpm</InputAdornment>,
                                                }}
                                            />

                                            <TextField
                                                id="init_resp_rate"
                                                label="Respiratory Rate"
                                                placeholder="Enter Respiratory Rate"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                onChange={value => this.handleChange('init_resp_rate', value)}
                                                
                                                InputLabelProps={{
                                                        shrink: true,
                                                }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">bpm</InputAdornment>,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item md={4} xs={12} style={{ paddingLeft: 5 }}>
                                            <TextField
                                                id="medications"
                                                label="Medications"
                                                placeholder="Enter Medications"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                onChange={value => this.handleChange('medications', value)}
                                                InputLabelProps={{
                                                        shrink: true,
                                                }}
                                            />

                                            <TextField
                                                id="diagnostics"
                                                label="Diagnostics/Labs"
                                                placeholder="Enter Diagnostics/Labs"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                onChange={value => this.handleChange('diagnostics', value)}
                                                
                                                InputLabelProps={{
                                                        shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item md={6} xs={6}>
                                            <Button variant="contained" color="primary" onClick={() => this.showPopup(true)} style={{ marginTop: 20 }}>
                                                Save History Record
                                            </Button>
                                        </Grid>
                                        <Grid item md={6} xs={6} style={{ textAlign: 'right' }}>
                                            <Button variant="contained" color="secondary" onClick={() => this.props.closeForm()} style={{ marginTop: 20 }}>
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Modal>

                <CConfirm
                    open={this.state.confirm}
                    onClose={() => this.showPopup(false)}
                    onOk={() => this.showPopup(false)}
                    title={'Saving Confirmation'}
                    message={'Are sure you want to save this patient history data?'}
                    actions={[
                        { actionTitle: 'Confirm', action: () => this.submitForm(), actionType: 'primary' },
                        { actionTitle: 'Cancel', action: () => this.showPopup(false), actionType: 'secondary' }
                    ]}
                />
            </div>
        )
    }
}

PatientHistoryForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

const PatientHistoryFormWrapped = withStyles(styles)(PatientHistoryForm)

export default PatientHistoryFormWrapped