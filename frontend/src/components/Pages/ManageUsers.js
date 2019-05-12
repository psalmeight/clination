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
import Paper from '@material-ui/core/Paper';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

import { ActionBar, UserForm, ClinicUserForm } from 'components'
import { _createUser, _getUsers, _deleteUser } from '../../rest/users.api'
import { _deleteClinicUser } from '../../rest/clinic_user.api'

import { CConfirm } from 'components'

import _ from 'lodash'
import { truncateSync } from "fs";

const styles = theme => ({
   root: {
      flexGrow: 1,
   },
   grow: {
      flexGrow: 1,
   },
   chip: {
     margin: theme.spacing.unit,
   },
   heading: {
      textTransform: 'uppercase'
   }
})

class ManageUsers extends React.Component {
   state = {
      expanded: 0,
      data: [],
      showRegistration: false,
      showUserRole: false,
      deleteOpen: false,
      selectedID: ''
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

   showUserRole = (val, id) => {
      this.setState({ showUserRole: val, selectedID: id })
   }

   deleteCardOpen = val => {
      this.setState({ deleteOpen: val })
   }

   onDelete = () => {
      this.props.onDelete()
      this.deleteCardOpen(false)
   }

   onDeleteRole = id => {
      _deleteClinicUser(id, () => {
         this.fetchData()
      })
   }

   render() {
      const { classes, theme } = this.props
      const { expanded } = this.state

      return (
         <div className={classes.root}>

            <ActionBar style={{ marginBottom: 10 }}>
               <Button color="primary" onClick={() => this.showRegistration(true)}>
                  Register a User
               </Button>
            </ActionBar>

            {
               _.map(this.state.data, (record, idx) => {
                  return <ExpansionPanel>
                     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}><strong>{record.user.lastname}, {record.user.firstname} {record.user.middlename} ({record.user.role})</strong></Typography>
                     </ExpansionPanelSummary>
                     <ExpansionPanelDetails>
                        <Grid container spacing={8}>
                           <Grid item md={6} style={{ width: '100%' }}>
                              <Paper>
                                 <Table>
                                    <TableBody>
                                       <TableRow>
                                          <TableCell>
                                             <strong>Email</strong>
                                          </TableCell>
                                          <TableCell>{record.user.email}</TableCell>
                                       </TableRow>
                                       <TableRow>
                                          <TableCell>
                                          <strong>Birthdate</strong>
                                          </TableCell>
                                          <TableCell>{record.user.dob}</TableCell>
                                       </TableRow>
                                       <TableRow>
                                          <TableCell>
                                          <strong>Contact</strong>
                                          </TableCell>
                                          <TableCell>{record.user.contact_no}</TableCell>
                                       </TableRow>
                                    </TableBody>
                                 </Table>
                              </Paper>
                           </Grid>
                           <Grid item md={6} style={{ width: '100%' }}>
                              <Paper>
                                 <Table>
                                    <TableBody>

                                       {
                                          _.map(record.roles, role => {
                                             return <TableRow>
                                             <TableCell>
                                                <strong>{role.clinic.clinic_name}</strong>
                                             </TableCell>
                                             <TableCell style={{ textAlign: 'right' }}>
                                                <Button size="small" color="secondary" onClick={() => this.onDeleteRole(role.id)}>
                                                   REMOVE
                                                </Button>
                                             </TableCell>
                                          </TableRow>
                                          })
                                       }
                                       
                                    </TableBody>
                                 </Table>
                              </Paper>
                           </Grid>
                        </Grid>

                     </ExpansionPanelDetails>
                     <ExpansionPanelActions style={{ justifyContent: 'flex-start' }}>
                        <Button size="small" color="secondary" onClick={() => this.onDelete}>
                           REMOVE
                        </Button>

                        <Button size="small" color="primary" onClick={() => this.showUserRole(true, record.user.id)}>
                           ADD A ROLE
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

            <ClinicUserForm 
               open={this.state.showUserRole} 
               closeForm={() => this.showUserRole(false)}
               userID={this.state.selectedID}
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