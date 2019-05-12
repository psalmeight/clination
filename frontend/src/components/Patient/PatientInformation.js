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

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { TextField } from '@material-ui/core'

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

class PatientInformation extends React.Component {
   state = {
      expanded: 0,
      data: []
   }

   componentDidMount(){
      this.fetchData()
   }

   fetchData = () => {

   }

   render() {
      const { classes } = this.props

      return (
         <div className={classes.root} style={{ padding: 15 }}>
            <form noValidate autoComplete="off">
               <TextField
                  label={'Firstname'}
                  value={this.state.data.chief_complaint}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{
                        shrink: true,
                  }}
               />

               <TextField
                  label={'Middlename'}
                  value={this.state.data.chief_complaint}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{
                        shrink: true,
                  }}
               />
               
               <TextField
                  label={'Lastname'}
                  value={this.state.data.chief_complaint}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{
                        shrink: true,
                  }}
               />

               <Grid container fullWidth>
                  <Grid item md={6} xs={6} style={{ paddingRight: 5 }}>
                     <TextField
                        label={'Birthdate'}
                        value={this.state.data.dob}
                        type="date"
                        defaultValue="03/13/1990"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{
                              shrink: true,
                        }}
                     /> 
                     </Grid>
                  <Grid item md={6} xs={6} style={{ paddingLeft: 5 }}>
                     <TextField
                        label={'Age'}
                        value={this.state.data.age}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                  </Grid>
               </Grid>

               <TextField
                  select
                  label="Gender"
                  className={classes.textField}
                  value={this.state.gender}
                  onChange={() => console.log('This')}
                  SelectProps={{
                     MenuProps: {
                     className: classes.menu,
                     },
                  }}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{
                        shrink: true,
                  }}>
                  <MenuItem value={'MALE'}>MALE</MenuItem>
                  <MenuItem value={'FEMALE'}>FEMALE</MenuItem>
               </TextField>

               <TextField
                  label={'Blood Type'}
                  value={this.state.data.blood_type}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{
                        shrink: true,
                  }}
               />

               <TextField
                  label={'Contact No'}
                  value={this.state.data.contact_no}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{
                        shrink: true,
                  }}
               />

               <TextField
                  label={'Email Address'}
                  value={this.state.data.email_address}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{
                        shrink: true,
                  }}
               />

            </form>
         </div>
      )
   }
}

PatientInformation.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(PatientInformation)