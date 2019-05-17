import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { DatePicker } from "material-ui-pickers"
import { TextField } from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'
import { CConfirm } from 'components'

import { _updatePatient } from '../../rest/patient.api'

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
      data: [],
      form: {},
      confirm: false
   }
   
   componentDidMount(){
      this.fetchFromProps(this.props)
   }

   componentWillReceiveProps(props){
      this.fetchFromProps(props)
   }
   
   showPopup = val => {
      this.setState({ confirm: val })
   }

   fetchFromProps = data => {
      if(!_.isEmpty(data.patient)){
         this.setState({ form: data.patient })
      }
   }

   submitForm = () => {
      let form = this.state.form;

      form['patient_id'] = this.props.match.params.patientID

      _updatePatient(form, () => {
         this.showPopup(false)
         this.props.fetchPatient()
      })
   }
   
   handleDateChange = (field, e) => {
      let form = this.state.form
      form[field] = moment(e).format("MM/DD/YYYY")
      
      this.setState({
         form
      })
   }

   handleChange = (field, e) => {
      let form = this.state.form
      form[field] = e.target.value
      
      this.setState({
         form
      })
   }

   render() {
      const { classes } = this.props

      return (
         <div className={classes.root} style={{ padding: 10 }}>
            <Paper elevation={2} style={{ padding: 20 }}>
               <Typography variant="h6" style={{ marginBottom: 20 }}>
                  Patient Information
               </Typography>
               <form noValidate autoComplete="off">
                  <Grid container spacing={16}>
                        <Grid item md={4} xs={12}>
                           <TextField
                              id="lastname"
                              label="Lastname"
                              placeholder="Enter Lastname"
                              fullWidth
                              margin="dense"
                              value={this.state.form.lastname}
                              variant="outlined"
                              onChange={value => this.handleChange('lastname', value)}
                              required={true}
                              InputLabelProps={{
                                    shrink: true,
                              }}
                              inputProps={{ autoCapitalize: true }}
                           />
                        </Grid>
                        <Grid item md={4} xs={12}>
                           <TextField
                              id="firstname"
                              label="Firstname"
                              placeholder="Enter Firstname"
                              fullWidth
                              value={this.state.form.firstname}
                              required={true}
                              margin="dense"
                              onChange={value => this.handleChange('firstname', value)}
                              variant="outlined"
                              InputLabelProps={{
                                    shrink: true,
                              }}
                           />
                        </Grid>
                        <Grid item md={4} xs={12}>
                           <TextField
                              id="middlename"
                              label="Middlename"
                              value={this.state.form.middlename}
                              placeholder="Enter Middlename"
                              onChange={value => this.handleChange('middlename', value)}
                              fullWidth
                              required={true}
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{
                                    shrink: true,
                              }}
                           />
                        </Grid>
                  </Grid>

                  <DatePicker
                        keyboard
                        label="Birthdate"
                        format={"MM/DD/YYYY"}
                        placeholder={moment().format("MM/DD/YYYY")}
                        mask={value =>
                        // handle clearing outside if value can be changed outside of the component
                        value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : []
                        }
                        value={this.state.form.dob}
                        onChange={value => this.handleDateChange('dob', value)}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{
                        shrink: true,
                        }}
                  />

                  <TextField
                        id="contact"
                        label="Contact Number"
                        placeholder="Enter Contact Number"
                        onChange={value => this.handleChange('contact_no', value)}
                        fullWidth
                        value={this.state.form.contact_no}
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{
                           shrink: true,
                        }}
                  />

                  <TextField
                     id="gender"
                     select
                     label="Gender"
                     onChange={value => this.handleChange('gender', value)}
                     value={this.state.form.gender}
                     SelectProps={{
                        MenuProps: {
                        className: classes.menu,
                        },
                     }}
                     fullWidth
                     required={true}
                     margin="dense"
                     variant="outlined"
                     InputLabelProps={{
                           shrink: true,
                     }}>
                     <MenuItem value={'MALE'}>MALE</MenuItem>
                     <MenuItem value={'FEMALE'}>FEMALE</MenuItem>
                  </TextField>

                  <TextField
                        id="father_name"
                        label="Father Name"
                        placeholder="Enter Father Name"
                        onChange={value => this.handleChange('father_name', value)}
                        fullWidth
                        value={this.state.form.father_name}
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{
                           shrink: true,
                        }}
                  />

                  <TextField
                        id="father_occupation"
                        label="Father Occupation"
                        placeholder="Enter Father Occupation"
                        onChange={value => this.handleChange('father_occupation', value)}
                        fullWidth
                        value={this.state.form.father_occupation}
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{
                           shrink: true,
                        }}
                  />

                  <TextField
                        id="mother_name"
                        label="Mother Name"
                        placeholder="Enter Mother Name"
                        onChange={value => this.handleChange('mother_name', value)}
                        fullWidth
                        value={this.state.form.mother_name}
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{
                           shrink: true,
                        }}
                  />



                  <TextField
                        id="mother_occupation"
                        label="Mother Occupation"
                        placeholder="Enter Mother Occupation"
                        onChange={value => this.handleChange('mother_occupation', value)}
                        fullWidth
                        value={this.state.form.mother_occupation}
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{
                           shrink: true,
                        }}
                  />

                  <Grid container>
                        <Grid item md={6} xs={6}>
                           <Button variant="contained" color="primary" onClick={() => this.showPopup(true)} style={{ marginTop: 20 }}>
                              Submit Updates
                           </Button>
                        </Grid>
                        <Grid item md={6} xs={6} style={{ textAlign: 'right' }}>
                        </Grid>
                  </Grid>
               </form>

               <CConfirm
                  open={this.state.confirm}
                  onClose={() => this.showPopup(false)}
                  onOk={() => this.showPopup(false)}
                  title={'Update Patient Confirmation'}
                  message={'Are sure you want to save this patient information changes?'}
                  actions={[
                     { actionTitle: 'Confirm', action: () => this.submitForm(), actionType: 'primary' },
                     { actionTitle: 'Cancel', action: () => this.showPopup(false), actionType: 'secondary' }
                  ]}
               />
            </Paper>
         </div>
      )
   }
}

PatientInformation.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(PatientInformation)