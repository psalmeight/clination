import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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
   render() {
      const { classes, theme } = this.props;

      return (
         <div className={classes.root}>
            <Paper className={classes.root} elevation={1} style={{ marginBottom: 5 }}>
               <Typography variant="h5" component="h3">
                  <strong>2</strong>
               </Typography>
               <Typography component="p">
                  Clinics
               </Typography>
            </Paper>
            <Paper className={classes.root} elevation={1} style={{ marginBottom: 5 }}>
               <Typography variant="h5" component="h3">
                  <strong>3</strong>
               </Typography>
               <Typography component="p">
                  Employees
               </Typography>
            </Paper>
            <Paper className={classes.root} elevation={1}>
               <Typography variant="h5" component="h3">
                  <strong>35</strong>
               </Typography>
               <Typography component="p">
                  Patients
               </Typography>
            </Paper>
         </div>
      )
   }
}


export default withStyles(styles, { withTheme: true })(Dashboard)