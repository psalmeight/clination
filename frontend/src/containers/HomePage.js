import React from 'react';
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import {
  Modal, AppBar, Toolbar, Typography, Button, IconButton, Grid, Paper, TextField
} from '@material-ui/core'

import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { CDrawerLayout, ManageClinics } from 'components'

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
        showRegistration: false
    }

    showRegistration = val => {
        this.setState({ showRegistration: val })
    }

    render(){
        const { classes } = this.props
        
        let drawers = [
            { name: 'Manage Clinics', route: '/user/manage_clinics', icon: <InboxIcon /> },
            { name: 'Manage Users', route: '/user/manage_users', icon: <MailIcon /> },
            { name: 'Settings', route: '/user/settings', icon: <InboxIcon /> },
            { name: 'Logout', route: '/', icon: <MailIcon /> }
        ]

        return (
            <CDrawerLayout drawers={drawers} {...this.props}>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
                    elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
                    hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
                    velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
                    Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
                    viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
                    Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
                    at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
                    ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
                </Typography>

                <Route exact path="/user/manage_clinics" render={() => <ManageClinics />} />
            </CDrawerLayout>
        )
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HomePage)