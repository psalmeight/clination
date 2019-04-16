import React from 'react';
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import {
  Modal, AppBar, Toolbar, Typography, Button, IconButton, Grid, Paper, TextField
} from '@material-ui/core'

import CAppBar from './CAppBar'

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
        showRegistration: false
    }

    showRegistration = val => {
        this.setState({ showRegistration: val })
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

                <Modal open={this.state.showRegistration} style={{ marginTop: '5%' }}>
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
                </Modal>
            </div>
        )
    }
}

CMainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CMainLayout)