import React from 'react';
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import {
  Modal, AppBar, Toolbar, Typography, Button, IconButton, Grid, Paper, TextField
} from '@material-ui/core'

import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { CDrawerLayout, ManageClinics, ManageUsers, Settings, Dashboard } from 'components'

import { tryLogout } from '../rest/users.api'
import { ActOnBranch } from '../components/Utils/RouterAction';

const styles = {
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    }
}

class HomePage extends React.Component {
    constructor(props){
        super(props)
    }

    state = {
        showClinicForm: false
    }

    showClinicForm = val => {
        this.setState({ showClinicForm: val })
    }

    render(){
        const { classes } = this.props
        
        let drawers = [
            { name: 'Dashboard', route: '/dashboard', icon: <InboxIcon /> },
            { name: 'Manage Clinics', route: '/dashboard/manage_clinics', icon: <InboxIcon /> },
            { name: 'Manage Users', route: '/dashboard/manage_users', icon: <MailIcon /> },
            { name: 'Settings', route: '/dashboard/settings', icon: <InboxIcon /> }
        ]

        return (
            <CDrawerLayout drawers={drawers} {...this.props}>
                <Route exact path="/dashboard" render={() => <Dashboard />} />
                <Route exact path="/dashboard/manage_clinics" render={() => <ManageClinics {...this.props} />} />
                <Route exact path="/dashboard/manage_users" render={() => <ManageUsers {...this.props} />} />
                <Route exact path="/dashboard/settings" render={() => <Settings />} />
            </CDrawerLayout>
        )
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HomePage)