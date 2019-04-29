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

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import InputAdornment from '@material-ui/core/InputAdornment'
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
   },
   card: {
      minWidth: 275,
   },
   title: {
      fontSize: 14,
   },
})

class PatientMedications extends React.Component {
   state = {
      expanded: 0,
      data: []
   }

   componentDidMount(){
      this.fetchData()
   }

   fetchData = () => {
      let data = { 
         date: '03/13/1990',
         id: 1, 
         chief_complaint: 'Fever, cough', 
         hpi: 'The quick little brown fox jumps over the back of the lazy dog', 
         physical_exam: 'The quick little brown fox jumps over the back of the lazy dog', 
         diagnosis: 'The quick little brown fox jumps over the back of the lazy dog',
      }

      this.setState({
         data
      })
   }

   render() {
      const { classes } = this.props

      return (
         <div className={classes.root} style={{ padding: 15 }}>
            <form noValidate autoComplete="off">
               <Grid container spacing={16}>
                  <Grid item md={6} xs={12}>
                     <Card className={classes.card}>
                        <CardContent>
                           <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Available Medications
                           </Typography>
                        </CardContent>
                     </Card>
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <Card className={classes.card} fullWidth>
                        <CardContent>
                           <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Prescriptions
                           </Typography>
                           
                        </CardContent>
                     </Card>
                  </Grid>
               </Grid>
            </form>
         </div>
      )
   }
}

PatientMedications.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(PatientMedications)