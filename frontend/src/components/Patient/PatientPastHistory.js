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

import { _updatePatientPast } from '../../rest/patient.api'

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

class PatientPastHistory extends React.Component {
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

      _updatePatientPast(form, () => {
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
                  Patient Past History
               </Typography>
               <form noValidate autoComplete="off">

                  <TextField
                        id="personal_history"
                        label="Personal History"
                        placeholder="Enter Personal History"
                        onChange={value => this.handleChange('personal_history', value)}
                        fullWidth
                        value={this.state.form.personal_history}
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{
                           shrink: true,
                        }}
                  />

                  <TextField
                        id="family_history"
                        label="Family History"
                        placeholder="Enter Family History"
                        onChange={value => this.handleChange('family_history', value)}
                        fullWidth
                        value={this.state.form.family_history}
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{
                           shrink: true,
                        }}
                  />

                  <TextField
                        id="allergies"
                        label="Food/Drug Allergies"
                        placeholder="Food/Drug Allergies"
                        onChange={value => this.handleChange('allergies', value)}
                        fullWidth
                        value={this.state.form.allergies}
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
                  title={'Update Past History Confirmation'}
                  message={'Are sure you want to save this past history changes?'}
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

PatientPastHistory.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(PatientPastHistory)