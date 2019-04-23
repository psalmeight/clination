import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import _ from 'lodash'

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

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

class ClinicForm extends React.Component {
  render() {
    
    const { classes } = this.props

    return (
        <Modal
            open={this.props.open}
            onClose={this.props.onClose}
        >
            <div style={getModalStyle()} className={classes.paper}>
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
                                <TextField
                                    id="fullname"
                                    label="Fullname"
                                    placeholder="Enter Fullname"
                                    fullWidth
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
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <TextField
                                    id="username"
                                    label="Username"
                                    placeholder="Enter Username"
                                    fullWidth
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
                                    fullWidth
                                    type="password"
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
                                    fullWidth
                                    type="password"
                                    margin="dense"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <Grid container>
                                    <Grid item md={6}>
                                        <Button variant="contained" color="primary" onClick={() => this.showRegistration(false)} style={{ marginTop: 20 }}>
                                            Register
                                        </Button>
                                    </Grid>
                                    <Grid item md={6}>

                                    </Grid>
                                </Grid>

                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Modal>
    )
  }
}

ClinicForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

const ClinicFormWrapped = withStyles(styles)(ClinicForm);

export default ClinicFormWrapped