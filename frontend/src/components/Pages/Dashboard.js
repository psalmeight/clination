import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { _getOwnerDashboardData } from '../../rest/users.api'
import { Avatar } from "@material-ui/core";

const styles = theme => ({
   root: {
      flexGrow: 1,
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
   },
   grow: {
     flexGrow: 1,
   }
})

class Dashboard extends React.Component {
   state = {
      dashboardData: [],
      clinic_count: 0,
      staff_count: 0,
      patient_count: 0
   }

   componentDidMount(){
      this.fetchData()
   }

   fetchData = () => {
      _getOwnerDashboardData(data => {
         this.setState({
            clinic_count: data.clinic_count,
            staff_count: data.staff_count,
            patient_count: data.patient_count
         })
      })
   }

   render() {
      const { classes, theme } = this.props;

      return (
         <Grid container>
            <Grid item md={4} xs={12}>
               <Paper className={classes.root} elevation={1} style={{ marginBottom: 5 }}>
                  <Typography variant="h5" component="h3">
                     <strong>{this.state.clinic_count}</strong>
                  </Typography>
                  <Typography component="p">
                     Clinics
                  </Typography>
               </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
            <Paper className={classes.root} elevation={1} style={{ marginBottom: 5 }}>
                  <Typography variant="h5" component="h3">
                     <strong>{this.state.staff_count}</strong>
                  </Typography>
                  <Typography component="p">
                     Personnels
                  </Typography>
               </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
            <Paper className={classes.root} elevation={1} style={{ marginBottom: 5 }}>
                  <Typography variant="h5" component="h3">
                     <strong>{this.state.patient_count}</strong>
                  </Typography>
                  <Typography component="p">
                     Patients
                  </Typography>
               </Paper>
            </Grid>
         </Grid>
      )
   }
}


export default withStyles(styles, { withTheme: true })(Dashboard)