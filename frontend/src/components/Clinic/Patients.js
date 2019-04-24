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
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton'

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

import _ from 'lodash'

const styles = theme => ({
   root: {
      flexGrow: 1,
   },
   grow: {
      flexGrow: 1,
   },
   searchRoot: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
   },
   chip: {
     margin: theme.spacing.unit,
   },
   input: {
      marginLeft: 8,
      flex: 1,
      width: '100%'
   },
   iconButton: {
      padding: 10,
   },
   avatar: {
      margin: 10,
   },
   orangeAvatar: {
      color: '#fff',
      backgroundColor: deepOrange[500],
   },
   purpleAvatar: {
      color: '#fff',
      backgroundColor: deepPurple[500],
   },
})
function ListItemLink(props) {
   return <ListItem button component="a" {...props} />;
 }
 
class Patients extends React.Component {
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
            gender: 'M',
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
            gender: 'F', 
            contact: '+639255055519',
            clinics: [
               { id: 1, clinic_name: 'Ace Dermatology', role: 'DR' },
               { id: 2, clinic_name: 'Ace Dental Clinic', role: 'DR' },
         ]},
         { id: 3, 
            employee_name: 'Micah Lumaad', 
            email: 'micahlumaad@gmail.com', 
            dob: '05/13/1990', 
            gender: 'M', 
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

            <Paper className={classes.searchRoot} style={{ marginBottom: 10, paddingLeft: 10 }}>
               <InputBase className={classes.input} placeholder="Search patient" />
               <IconButton className={classes.iconButton} aria-label="Search">
                  <SearchIcon />
               </IconButton>
            </Paper>

            <List component="nav">

               {
                  _.map(this.state.data, (record, idx) => {

                     let avatarClass = record.gender === 'M' ? classes.purpleAvatar : classes.orangeAvatar
                     
                     return <ListItem button style={{ paddingLeft: 0 }}>
                        <ListItemIcon>
                           <Avatar className={avatarClass}>{record.gender}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={record.employee_name} />
                     </ListItem>
                  })
               }

               
            </List>

            {/* {
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
            } */}
            
         </div>
      )
   }
}

Patients.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(Patients)