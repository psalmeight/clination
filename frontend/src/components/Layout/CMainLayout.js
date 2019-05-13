import React from 'react';
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import {
  Modal, AppBar, Toolbar, Typography, Button, IconButton, Grid, Paper, TextField
} from '@material-ui/core'

import _ from 'lodash'

import { _createUser } from '../../rest/users.api'

import CAppBar from './CAppBar'
import { CConfirm } from 'components'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    }
}

class CMainLayout extends React.Component {
    constructor(props){
        super(props)
    }

    state = {
        showRegistration: false,
        form: {},
        confirm: false
    }

    showRegistration = val => {
        this.setState({ showRegistration: val })
    }
    
    showConfirm = val => {
        this.setState({ confirm: val })
    }

    submitForm = () => {
        _createUser(this.state.form, () => {
            this.showRegistration(false)
            this.showConfirm(false)
        })

    }

    handleChange = (field, e) => {
        let form = this.state.form
        form[field] = e.target.value

        this.setState({
            form
        })
    }

    render(){
        const { classes } = this.props
        return (
            <div className={classes.root}>
                
                <div style={{ marginBottom: 80 }} />

                <AppBar positionStatic>
                    <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        CLINation
                    </Typography>
                    <Button color="inherit" onClick={this.showRegistration}>REGISTER</Button>
                    </Toolbar>
                </AppBar>

                {this.props.children}

                <Modal open={this.state.showRegistration}>
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
                                        onChange={value => this.handleChange('username', value)}
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
                                        onChange={value => this.handleChange('password', value)}
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
                                        onChange={value => this.handleChange('confirm', value)}
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
                                            <Button variant="contained" color="primary" onClick={() => this.showConfirm(true)} style={{ marginTop: 20 }}>
                                                Register
                                            </Button>
                                        </Grid>
                                        <Grid item md={6} style={{ textAlign: 'right' }}>
                                            <Button variant="contained" color="secondary" onClick={() => this.showRegistration(false)} style={{ marginTop: 20 }}>
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
                    onClose={() => this.showConfirm(false)}
                    onOk={() => this.submitForm()}
                    title={'New User Confirmation'}
                    message={'Are sure you want to save this user information?'}
                    actions={[
                        { actionTitle: 'Yes', action: () => this.submitForm(), actionType: 'primary' },
                        { actionTitle: 'Cancel', action: () => this.showConfirm(false), actionType: 'secondary' }
                    ]}
                />
            </div>
        )
    }
}

CMainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CMainLayout)