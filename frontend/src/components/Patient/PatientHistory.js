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

class PatientHistory extends React.Component {
   state = {
      expanded: 0,
      data: []
   }

   componentDidMount(){
      this.fetchData()
   }

   fetchData = () => {
      let data = [
         { 
            date: '03/13/1990',
            id: 1, 
            chief_complaint: 'Fever, cough', 
            hpi: 'The quick little brown fox jumps over the back of the lazy dog', 
            physical_exam: 'The quick little brown fox jumps over the back of the lazy dog', 
            diagnosis: 'The quick little brown fox jumps over the back of the lazy dog',
         },
         { 
            date: '03/11/1990',
            id: 2, 
            chief_complaint: 'Fever, cough', 
            hpi: 'The quick little brown fox jumps over the back of the lazy dog', 
            physical_exam: 'The quick little brown fox jumps over the back of the lazy dog', 
            diagnosis: 'The quick little brown fox jumps over the back of the lazy dog',
         },
         { 
            date: '03/08/1990',
            id: 3, 
            chief_complaint: 'Fever, cough', 
            hpi: 'The quick little brown fox jumps over the back of the lazy dog', 
            physical_exam: 'The quick little brown fox jumps over the back of the lazy dog', 
            diagnosis: 'The quick little brown fox jumps over the back of the lazy dog',
         },
      ]

      this.setState({
         data
      })
   }

   render() {
      const { classes } = this.props

      return (
         <div className={classes.root}>
            {
               _.map(this.state.data, (record, idx) => {
                  return <ExpansionPanel expanded={idx === 0 ? true : null}>
                     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}><strong>{record.date}</strong></Typography>
                     </ExpansionPanelSummary>
                     <ExpansionPanelDetails>
                        <form noValidate autoComplete="off">
                           <TextField
                              label={'Chief Complaint'}
                              multiline
                              rowsMax="4"
                              value={record.chief_complaint}
                              fullWidth
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{
                                  shrink: true,
                              }}
                           />

                           <TextField
                              label={'Short History'}
                              multiline
                              rowsMax="4"
                              value={record.hpi}
                              fullWidth
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />
                           
                           <TextField
                              label={'Physical Exam'}
                              multiline
                              rowsMax="4"
                              value={record.physical_exam}
                              fullWidth
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />

                           <TextField
                              label={'Diagnosis'}
                              multiline
                              rowsMax="4"
                              value={record.diagnosis}
                              fullWidth
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />                                              
                        </form>
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

PatientHistory.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(PatientHistory)