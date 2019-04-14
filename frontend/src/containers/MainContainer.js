import React from 'react';
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import {
  Modal, AppBar, Toolbar, Typography, Button, IconButton, Grid, Paper, TextField
} from '@material-ui/core'

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    }
}

class MainContainer extends React.Component {
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
    
        return (
            <div>
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            CLINation
                        </Typography>
                        <Button color="inherit">Login</Button>
                        <Button color="inherit" onClick={() => this.showRegistration(true)}>Register Clinic</Button>
                    </Toolbar>
                </AppBar>
      
                <Grid container style={{ marginTop: 150 }} spacing={8} justify="center" alignContent="center">
                    <Grid item>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="username"
                                label="Username/Email"
                                placeholder="Enter Username/Email"
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
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <Button variant="contained" fullWidth color="primary" onClick={() => this.showRegistration(false)} style={{ marginTop: 10 }}>
                                Login
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            
                <Modal open={this.state.showRegistration} style={{ marginTop: '10%' }}>
                    <Grid 
                        container
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <Grid item>
                            <Paper elevation={2} style={{ padding: 20 }}>
                                <Typography variant="h6" style={{ marginBottom: 20 }}>
                                    Clinic Registration Fields
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
                                    
                                    <Grid direction="row" container>
                                        <Grid item md={6}>
                                            <Button variant="contained" color="primary" onClick={() => this.showRegistration(false)} style={{ marginTop: 20 }}>
                                                Register Clinic
                                            </Button>
                                        </Grid>
                                        <Grid item md={6} alignContent="flex-end">
                                            <Button variant="contained" color="primary" onClick={() => this.showRegistration(false)} style={{ marginTop: 20 }}>
                                                Cancel
                                            </Button>
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

MainContainer.propTypes = {
    classes: PropTypes.object.isRequired,
}

const WrappedMainContainer = withStyles(styles)(MainContainer)

export default WrappedMainContainer