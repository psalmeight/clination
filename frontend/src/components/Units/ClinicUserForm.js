import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { CConfirm } from 'components'
import { _createClinicUser } from '../../rest/clinic_user.api'
import { _getClinics, _getClinicsOwn } from '../../rest/clinic.api'
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

class ClinicUserForm extends React.Component {
    state =  {
        form: {},
        confirm: false,
        clinics: []
    }

    componentDidMount(){
        this.fetchClinics()
    }

    showPopup = val => {
        this.setState({ confirm: val })
    }

    fetchClinics = () => {
        _getClinicsOwn(this.fetchClinicsSuccess)
    }

    fetchClinicsSuccess = data => {
        this.setState({ clinics: data })
    }

    submitForm = () => {

        let form = this.state.form
        form['user_id'] = this.props.userID

        _createClinicUser(this.state.form, () => {
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
                            <Paper elevation={2} style={{ padding: 20, width: 300 }}>
                                <Typography variant="h6" style={{ marginBottom: 20 }}>
                                    User Clinic Assignment
                                </Typography>
                                <form noValidate autoComplete="off">
                                    <TextField
                                        select
                                        label="Select Clinic"
                                        className={classes.textField}
                                        value={this.state.form.clinic_id}
                                        onChange={val => this.handleChange('clinic_id', val)}
                                        SelectProps={{
                                            MenuProps: {
                                            className: classes.menu,
                                            },
                                        }}
                                        fullWidth
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                                shrink: true,
                                        }}>

                                        {
                                            _.map(this.state.clinics, clinic => {
                                                return <MenuItem value={clinic.id}>{clinic.clinic_name}</MenuItem>
                                            })
                                        }
                                        
                                    </TextField>

                                    <Grid container>
                                        <Grid item md={6}>
                                            <Button variant="contained" color="primary" onClick={() => this.showPopup(true)} style={{ marginTop: 20 }}>
                                                Submit Form
                                            </Button>
                                        </Grid>
                                        <Grid item md={6} style={{ textAlign: 'right' }}>
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
                    title={'Confirm Clinic Assignment'}
                    message={'Are sure you want to assign user to this clinic?'}
                    actions={[
                        { actionTitle: 'Confirm', action: () => this.submitForm(), actionType: 'primary' },
                        { actionTitle: 'Cancel', action: () => this.showPopup(false), actionType: 'secondary' }
                    ]}
                />
            </div>
        )
    }
}

ClinicUserForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

const ClinicUserFormWrapped = withStyles(styles)(ClinicUserForm)

export default ClinicUserFormWrapped