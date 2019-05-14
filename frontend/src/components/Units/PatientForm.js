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
import { _createUser, _getUsers, _deleteUser, _getDoctorsByClinic } from '../../rest/users.api'
import { _createPatient } from '../../rest/patient.api'

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

class PatientForm extends React.Component {
    state =  {
        form: {},
        confirm: false,
        doctors: []
    }

    componentDidMount(){
        this.fetchDoctors()
    }

    showPopup = val => {
        this.setState({ confirm: val })
    }

    fetchDoctors = () => {
        _getDoctorsByClinic(this.props.match.params.clinicID, doctors => {
            this.setState({ doctors })
        })
    }

    submitForm = () => {
        let form = this.state.form;

        form['clinic'] = this.props.match.params.clinicID;

        _createPatient(form, () => {
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

        const { classes } = this.props;

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
                                    New Patient Form
                                </Typography>
                                <form noValidate autoComplete="off">
                                    <Grid container spacing={16}>
                                        <Grid item md={4} xs={12}>
                                            <TextField
                                                id="lastname"
                                                label="Lastname"
                                                placeholder="Enter Lastname"
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                onChange={value => this.handleChange('lastname', value)}
                                                required={true}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{ autoCapitalize: true }}
                                            />
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                            <TextField
                                                id="firstname"
                                                label="Firstname"
                                                placeholder="Enter Firstname"
                                                fullWidth
                                                required={true}
                                                margin="dense"
                                                onChange={value => this.handleChange('firstname', value)}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                            <TextField
                                                id="middlename"
                                                label="Middlename"
                                                placeholder="Enter Middlename"
                                                onChange={value => this.handleChange('middlename', value)}
                                                fullWidth
                                                required={true}
                                                margin="dense"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <TextField
                                        label={'Birthdate'}
                                        onChange={value => this.handleChange('dob', value)}
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
                                        id="gender"
                                        select
                                        label="Gender"
                                        onChange={value => this.handleChange('gender', value)}
                                        value={this.state.form.gender}
                                        SelectProps={{
                                            MenuProps: {
                                            className: classes.menu,
                                            },
                                        }}
                                        fullWidth
                                        required={true}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                                shrink: true,
                                        }}>
                                        <MenuItem value={'MALE'}>MALE</MenuItem>
                                        <MenuItem value={'FEMALE'}>FEMALE</MenuItem>
                                    </TextField>
                                    
                                    <TextField
                                        id="contact_no"
                                        label="Contact Number"
                                        placeholder="Enter Contact Number"
                                        onChange={value => this.handleChange('contact_no', value)}
                                        fullWidth
                                        required={true}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <TextField
                                        id="doctor"
                                        select
                                        label="Attending Physician"
                                        onChange={value => this.handleChange('doctor', value)}
                                        value={this.state.form.doctor}
                                        SelectProps={{
                                            MenuProps: {
                                            className: classes.menu,
                                            },
                                        }}
                                        fullWidth
                                        required={true}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                                shrink: true,
                                        }}>
                                        
                                        {
                                            _.map(this.state.doctors, doctor => {
                                                return <MenuItem value={doctor.id}>Dr. {doctor.lastname}, {doctor.firstname}</MenuItem>
                                            })
                                        }
                                        
                                    </TextField>

                                    <Grid container>
                                        <Grid item md={6} xs={6}>
                                            <Button variant="contained" color="primary" onClick={() => this.showPopup(true)} style={{ marginTop: 20 }}>
                                                Save Patient
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
                    title={'New Patient Confirmation'}
                    message={'Are sure you want to save this patient information?'}
                    actions={[
                        { actionTitle: 'Confirm', action: () => this.submitForm(), actionType: 'primary' },
                        { actionTitle: 'Cancel', action: () => this.showPopup(false), actionType: 'secondary' }
                    ]}
                />

            </div>
        )
    }
}

PatientForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

const PatientFormWrapped = withStyles(styles)(PatientForm)

export default PatientFormWrapped