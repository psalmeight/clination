import React from 'react';
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import {
  Modal, AppBar, Toolbar, Typography, Button, IconButton, Grid, Paper, TextField
} from '@material-ui/core'
import { CMainLayout } from 'components'
import { RouteTo } from '../components/Utils/RouterAction'

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

    goTo = (path) => {
        RouteTo(this.props, path)
    }

    render(){
        const { classes } = this.props
        return (
            <CMainLayout className={classes.root}>

                <Grid container style={{ marginTop: 50 }} spacing={8} justify="center" alignContent="center">
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
                                type="password"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <Button variant="contained" fullWidth color="primary" onClick={() => this.goTo('/user')} style={{ marginTop: 10 }}>
                                Login
                            </Button>
                        </form>
                    </Grid>
                </Grid>
        
            </CMainLayout>
        )
    }
}

MainContainer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainContainer)