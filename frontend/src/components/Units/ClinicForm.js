import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { CConfirm } from 'components'
import { _createClinic } from '../../rest/clinic.api'

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

class ClinicForm extends React.Component {
    state =  {
        form: {},
        confirm: false
    }

    showPopup = val => {
        this.setState({ confirm: val })
    }

    submitForm = () => {
        _createClinic(this.state.form, () => {
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
            <Modal
                open={this.props.open}
                onClose={this.handleClose}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <Typography variant="h6" id="modal-title" style={{ marginBottom: 20 }}>
                        Add New Clinic Form
                    </Typography>

                    <form noValidate autoComplete="off">
                        <TextField
                            id="clinic_name"
                            label="Clinic Name"
                            placeholder="Enter name of clinic"
                            fullWidth
                            margin="dense"
                            onChange={val => this.handleChange('clinic_name', val)}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="clinicaddress"
                            label="Clinic Address"
                            placeholder="Enter Address of Clinic"
                            onChange={val => this.handleChange('clinic_address', val)}
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="cliniccontact"
                            label="Clinic Contact No"
                            placeholder="Enter contact number of clinic"
                            onChange={val => this.handleChange('clinic_contact', val)}
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Grid container>
                            <Grid item md={6} xs={6}>
                                <Button variant="contained" color="primary" onClick={() => this.showPopup(true)} style={{ marginTop: 20 }}>
                                    Submit Form
                                </Button>
                            </Grid>
                            <Grid item md={6} xs={6} style={{ textAlign: 'right' }}>
                                <Button variant="contained" color="secondary" onClick={() => this.props.closeForm()} style={{ marginTop: 20 }}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>

                        <CConfirm
                            open={this.state.confirm}
                            onClose={() => this.showPopup(false)}
                            title={'Add New Clinic'}
                            message={'Are sure you want to save this clinic information?'}
                            actions={[
                                { actionTitle: 'Yes', action: () => this.submitForm(), actionType: 'primary' },
                                { actionTitle: 'Cancel', action: () => this.showPopup(false), actionType: 'secondary' }
                            ]}
                        />

                    </form>
                </div>
            </Modal>
        )
    }
}

ClinicForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

const ClinicFormWrapped = withStyles(styles)(ClinicForm)

export default ClinicFormWrapped