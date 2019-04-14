import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

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
};

class MainContainer extends React.Component {
    state = {
        showRegistration: false
    }

    constructor(props){
        super(props)
    }

    showRegistration = (val) => {
        this.setState({ showRegistration: val })
    }

    render(){
    
        return (
            <div>
                <AppBar color="primary" positionStatic>
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
      
                <Grid container style={{ marginTop: 80 }} spacing={8}>
                    <Grid item md={6} xs={12}>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="username"
                                label="Username/Email"
                                placeholder="Enter Username/Email"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                            />
      
                            <TextField
                                id="password"
                                label="Password"
                                placeholder="Enter Password"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                            />
                        </form>
                    </Grid>
                    <Grid item md={6} xs={12}>
            
                    </Grid>
                </Grid>
            
                <Modal open={this.state.showRegistration}>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="fullname"
                            label="Fullname"
                            placeholder="Enter Fullname"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />
      
                        <TextField
                            id="username"
                            label="Username"
                            placeholder="Enter Username"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />
      
                        <TextField
                            id="email"
                            label="Email"
                            placeholder="Enter Email"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />
      
                        <TextField
                            id="contact"
                            label="Contact Number"
                            placeholder="Enter Contact Number"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />
                    </form>

                    <Button variant="contained" color="primary" onClick={() => this.showRegistration(false)}>
                        Register Clinic
                    </Button>
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles)(MainContainer);