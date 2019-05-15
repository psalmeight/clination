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

class PatientVaccinationForm extends React.Component {
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
                                    New Vaccination Record
                                </Typography>
                                <form noValidate autoComplete="off">

                                    <Grid container>
                                        <Grid item md={6} xs={12} style={{ paddingRight: 5 }}>
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

                                            <DatePicker
                                                keyboard
                                                label="Vaccination Date"
                                                format={"MM/DD/YYYY"}
                                                placeholder={moment().format("MM/DD/YYYY")}
                                                mask={value =>
                                                    // handle clearing outside if value can be changed outside of the component
                                                    value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : []
                                                }
                                                value={this.state.form.vaccination_date}
                                                onChange={value => this.handleDateChange('vaccination_date', value)}
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

                                            <TextField
                                                id="vaccination_notes"
                                                label="Vaccination Notes"
                                                placeholder="Enter Vaccination Notes"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                onChange={value => this.handleChange('diagnosis', value)}
                                                
                                                InputLabelProps={{
                                                        shrink: true,
                                                }}
                                                inputProps={{ autoCapitalize: true }}
                                            />

                                            <DatePicker
                                                keyboard
                                                label="Next Vaccination Schedule"
                                                format={"MM/DD/YYYY"}
                                                placeholder={moment().format("MM/DD/YYYY")}
                                                mask={value =>
                                                    // handle clearing outside if value can be changed outside of the component
                                                    value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : []
                                                }
                                                value={this.state.form.next_vaccination_schedule}
                                                onChange={value => this.handleDateChange('next_vaccination_schedule', value)}
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12} style={{ paddingLeft: 5, paddingRight: 5 }}>


                                        </Grid>
                                    </Grid>


                                    <Grid container>
                                        <Grid item md={6} xs={6}>
                                            <Button variant="contained" color="primary" onClick={() => this.showPopup(true)} style={{ marginTop: 20 }}>
                                                Save Vaccination Record
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
                    message={'Are sure you want to save this vaccination data?'}
                    actions={[
                        { actionTitle: 'Confirm', action: () => this.submitForm(), actionType: 'primary' },
                        { actionTitle: 'Cancel', action: () => this.showPopup(false), actionType: 'secondary' }
                    ]}
                />
            </div>
        )
    }
}

PatientVaccinationForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

const PatientVaccinationFormWrapped = withStyles(styles)(PatientVaccinationForm)

export default PatientVaccinationFormWrapped