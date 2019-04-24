import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';


import _ from 'lodash'

const styles = theme => ({
   root: {
      flexGrow: 1,
   },
   grow: {
      flexGrow: 1,
   },
   chip: {
     margin: theme.spacing.unit,
   }
})

class Appointments extends React.Component {
   state = {
      expanded: 0,
      data: []
   }

   componentDidMount(){
      this.fetchData()
   }

   fetchData = () => {
      let data = [
         { id: 1, 
            employee_name: 'Ace Jordan Lumaad', 
            email: 'acelumaad@gmail.com', 
            dob: '03/13/1990', 
            gender: 'male',
            contact: '+639255055519',
            clinics: [
               { id: 1, clinic_name: 'Ace Dermatology', role: 'OR' },
               { id: 2, clinic_name: 'Ace Dermatology', role: 'DR' },
               { id: 3, clinic_name: 'Ace Dental Clinic', role: 'SF' },
         ]},
         { id: 2, 
            employee_name: 'Gwen Lumaad', 
            email: 'gwenlumaad@gmail.com', 
            dob: '01/13/1990', 
            gender: 'female', 
            contact: '+639255055519',
            clinics: [
               { id: 1, clinic_name: 'Ace Dermatology', role: 'DR' },
               { id: 2, clinic_name: 'Ace Dental Clinic', role: 'DR' },
         ]},
         { id: 3, 
            employee_name: 'Micah Lumaad', 
            email: 'micahlumaad@gmail.com', 
            dob: '05/13/1990', 
            gender: 'male', 
            contact: '+639255055519',
            clinics: [
               { id: 1, clinic_name: 'Ace Dermatology', role: 'SF' },
               { id: 2, clinic_name: 'Ace Dental Clinic', role: 'SF' },
         ]}
      ]

      this.setState({
         data
      })
   }
   handleChange = panel => (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false,
      })
   }

   handleDelete = () => {
      alert('You clicked the delete icon.')
   }

   render() {
      const { classes, theme } = this.props
      const { expanded } = this.state

      return (
         <div className={classes.root}>
            {
               _.map(this.state.data, (record, idx) => {
                  return <ExpansionPanel>
                     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}><strong>{record.employee_name}</strong></Typography>
                     </ExpansionPanelSummary>
                     <ExpansionPanelDetails style={{ padding: 0 }}>
                        <Table>
                           <TableBody>
                              <TableRow>
                                 <TableCell>
                                    <strong>Email</strong>
                                 </TableCell>
                                 <TableCell>{record.email}</TableCell>
                              </TableRow>
                              <TableRow>
                                 <TableCell>
                                 <strong>Birthdate</strong>
                                 </TableCell>
                                 <TableCell>{record.dob}</TableCell>
                              </TableRow>
                              <TableRow>
                                 <TableCell>
                                 <strong>Gender</strong>
                                 </TableCell>
                                 <TableCell>{record.gender}</TableCell>
                              </TableRow>
                              <TableRow>
                                 <TableCell>
                                 <strong>Contact</strong>
                                 </TableCell>
                                 <TableCell>{record.contact}</TableCell>
                              </TableRow>
                           </TableBody>
                        </Table>
                     </ExpansionPanelDetails>
                     <ExpansionPanelActions style={{ justifyContent: 'flex-start' }}>
                        <Button size="small" color="primary">EDIT</Button>
                        <Button size="small" color="secondary">
                           REMOVE
                        </Button>
                     </ExpansionPanelActions>
                  </ExpansionPanel>
               })
            }
            
         </div>
      )
   }
}

Appointments.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(Appointments)