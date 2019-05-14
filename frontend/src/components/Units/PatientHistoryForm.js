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
import { CConfirm } from 'components'
import { _createPatientHistory } from '../../rest/patient_history.api'

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
        confirm: false
    }

    showPopup = val => {
        this.setState({ confirm: val })
    }

    submitForm = () => {
        let form = this.state.form;

        form['patient'] = this.props.dataID;

        _createPatientHistory(form, () => {
            this.showPopup(false)
            this.props.closeForm()
            this.props.refreshList()
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

                                    <TextField
                                        label={'Visit Date/Time'}
                                        onChange={value => this.handleChange('visit_datetime', value)}
                                        type="date"
                                        defaultValue="03/13/1990"
                                        fullWidth
                                        required={true}
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
                                       onChange={value => this.handleChange('chief_complaint', value)}
                                       required={true}
                                       InputLabelProps={{
                                             shrink: true,
                                       }}
                                       inputProps={{ autoCapitalize: true }}
                                    />

                                    <TextField
                                       id="history_present_illness"
                                       label="Chief Complaint"
                                       placeholder="Enter Chief Complaint"
                                       fullWidth
                                       margin="dense"
                                       variant="outlined"
                                       onChange={value => this.handleChange('history_present_illness', value)}
                                       required={true}
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
                                       required={true}
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
                                       required={true}
                                       InputLabelProps={{
                                             shrink: true,
                                       }}
                                       inputProps={{ autoCapitalize: true }}
                                    />

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