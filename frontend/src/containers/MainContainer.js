import React from 'react';
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import {
  Modal, AppBar, Toolbar, Typography, Button, IconButton, Grid, Paper, TextField
} from '@material-ui/core'
import { CMainLayout } from 'components'
import { RouteTo } from '../components/Utils/RouterAction'
import { _tryLogin } from '../rest/users.api'
import * as rule from '../components/Utils/RoleAccessConfig'

import _ from 'lodash'

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
        showRegistration: false,
        email: '',
        password: ''
    }

    componentDidMount(){
        this.validateAuth()
    }

    validateAuth = () => {
        if(!_.isEmpty(localStorage.getItem("access_token"))){
            if(rule.roleQualified(rule.VIEW_DASHBOARD))
                this.goTo('/dashboard')
            else
                this.goTo('/clinics')
        }
    }

    showRegistration = val => {
        this.setState({ showRegistration: val })
    }

    goTo = (path) => {
        RouteTo(this.props, path)
    }

    tryLogin = () => {
        _tryLogin({
            email: this.state.email,
            password: this.state.password
        }, data => {
            if(data.status == 200 && !_.isEmpty(data.access_token)){
                if(rule.roleQualified(rule.VIEW_DASHBOARD))
                    this.goTo('/dashboard')
                else
                    this.goTo('/clinics')
            }
        })
    }

    handleChange = (field, e) => {
        this.setState({
            [field]: e.target.value
        })
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
                                required
                                onChange={val => this.handleChange('email', val)}
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
                                onChange={val => this.handleChange('password', val)}
                                type="password"
                                margin="dense"
                                required
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onKeyPress={ev => {

                                    if (ev.key === 'Enter') {
                                        this.tryLogin()
                                        ev.preventDefault();
                                    }
                                }}
                            />

                            <Button variant="contained" fullWidth color="primary" onClick={() => this.tryLogin()} style={{ marginTop: 10 }}>
                                Login
                            </Button>

                            <Button fullWidth color="primary" onClick={() => this.goTo('/dashboard')} style={{ marginTop: 10 }}>
                                Forgot password
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