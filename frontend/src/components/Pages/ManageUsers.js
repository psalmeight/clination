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

import { ActionBar, UserForm } from 'components'
import { _createUser, _getUsers, _deleteUser } from '../../rest/users.api'
import { CConfirm } from 'components'

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

class ManageUsers extends React.Component {
   state = {
      expanded: 0,
      data: [],
      showRegistration: false,
      deleteOpen: false
   }

   componentDidMount(){
      this.fetchData()
   }

   fetchData = () => {
      _getUsers(data => {
         this.setState({
            data
         })
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

   showRegistration = val => {
      this.setState({ showRegistration: val })
   }

   deleteCardOpen = val => {
      this.setState({ deleteOpen: val })
   }

   onDelete = () => {
      this.props.onDelete()
      this.deleteCardOpen(false)
   }

   render() {
      const { classes, theme } = this.props
      const { expanded } = this.state

      return (
         <div className={classes.root}>

            <ActionBar>
               <Button color="primary" onClick={() => this.showRegistration(true)}>
                  Register a User
               </Button>
            </ActionBar>

            {
               _.map(this.state.data, (record, idx) => {
                  return <ExpansionPanel>
                     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}><strong>{record.lastname}, {record.firstname} {record.middlename}</strong></Typography>
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
                                 <TableCell>{record.contact_no}</TableCell>
                              </TableRow>
                           </TableBody>
                        </Table>
                     </ExpansionPanelDetails>
                     <ExpansionPanelActions style={{ justifyContent: 'flex-start' }}>
                        <Button size="small" color="secondary" onClick={() => this.onDelete}>
                           REMOVE
                        </Button>
                     </ExpansionPanelActions>
                  </ExpansionPanel>
               })
            }
            
            <UserForm 
               open={this.state.showRegistration} 
               closeForm={() => this.showRegistration(false)} 
               refreshList={() => this.fetchData()}   
            />

            <CConfirm
               open={this.state.deleteOpen}
               onClose={() => this.deleteCardOpen(false)}
               onOk={() => this.deleteCardOpen(false)}
               title={'Delete Confirmation'}
               message={`Are you sure you want to delete this record?`}
               actions={[
                  { actionTitle: 'Yes', action: () => this.onDelete(), actionType: 'primary' },
                  { actionTitle: 'Cancel', action: () => this.deleteCardOpen(false), actionType: 'secondary' }
               ]}
            />
         </div>
      )
   }
}

ManageUsers.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(ManageUsers)