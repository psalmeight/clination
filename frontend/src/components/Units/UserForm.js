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
import { _createUser, _getUsers, _deleteUser } from '../../rest/users.api'

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

class UserForm extends React.Component {
    state =  {
        form: {},
        confirm: false
    }

    showPopup = val => {
        this.setState({ confirm: val })
    }

    submitForm = () => {
        _createUser(this.state.form, () => {
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
                                    User Registration Form
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
                                        id="contact"
                                        label="Contact Number"
                                        placeholder="Enter Contact Number"
                                        onChange={value => this.handleChange('contact_no', value)}
                                        fullWidth
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <TextField
                                        id="email"
                                        label="Email"
                                        placeholder="Enter Email"
                                        onChange={value => this.handleChange('email', value)}
                                        fullWidth
                                        required={true}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <TextField
                                        id="password"
                                        label="Password"
                                        placeholder="Enter Password"
                                        onChange={value => this.handleChange('password', value)}
                                        fullWidth
                                        type="password"
                                        required={true}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <TextField
                                        id="confirm_password"
                                        label="Confirm Password"
                                        placeholder="Enter Confirm"
                                        onChange={value => this.handleChange('confirm', value)}
                                        fullWidth
                                        type="password"
                                        required={true}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    
                                    <TextField
                                        id="role"
                                        select
                                        label="Role"
                                        onChange={value => this.handleChange('role', value)}
                                        value={this.state.form.role}
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
                                        <MenuItem value={'OWNER'}>OWNER</MenuItem>
                                        <MenuItem value={'DOCTOR'}>DOCTOR</MenuItem>
                                        <MenuItem value={'STAFF'}>STAFF</MenuItem>
                                    </TextField>

                                    <Grid container>
                                        <Grid item md={6} xs={6}>
                                            <Button variant="contained" color="primary" onClick={() => this.showPopup(true)} style={{ marginTop: 20 }}>
                                                Register
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
                    title={'New User Confirmation'}
                    message={'Are sure you want to save this user information?'}
                    actions={[
                        { actionTitle: 'Confirm', action: () => this.submitForm(), actionType: 'primary' },
                        { actionTitle: 'Cancel', action: () => this.showPopup(false), actionType: 'secondary' }
                    ]}
                />
            </div>
        )
    }
}

UserForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

const UserFormWrapped = withStyles(styles)(UserForm)

export default UserFormWrapped