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

import { CDrawerLayout, PatientDashboard } from 'components'

const styles = {
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    }
}

class PatientContainer extends React.Component {
    constructor(props){
        super(props)
    }

    state = {
        patientID: 0
    }

    componentDidMount(){
        this.setState({ patientID: this.props.match.params.patientID })
        this.fetchData()
    }

    fetchData = () => {

    }

    render(){
        const { classes } = this.props
        
        let drawers = [
            { name: 'Information', route: `/patient/${this.state.patientID}`, icon: <InboxIcon /> },
            { name: 'History', route: `/patient/${this.state.patientID}/history`, icon: <InboxIcon /> },
        ]

        return (
            <CDrawerLayout unPad backType {...this.props}>
                <Route exact path={`/patient/${this.state.patientID}`} render={() => <PatientDashboard />} />
            </CDrawerLayout>
        )
    }
}

PatientContainer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PatientContainer)