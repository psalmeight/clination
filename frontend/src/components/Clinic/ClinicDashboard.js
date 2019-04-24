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

class ClinicDashboard extends React.Component {
   state = {
      dashboardData: []
   }

   componentDidMount(){
      this.fetchData()
   }

   fetchData = () => {
      this.setState({
         dashboardData: [
            { key: 'Clinics', value: 2 },
            { key: 'Employees', value: 3 },
            { key: 'Patients', value: 35 },
         ]
      })
   }

   render() {
      const { classes, theme } = this.props;

      return (
         <div className={classes.root}>
            {
               _.map(this.state.dashboardData, data => {
                  return <Paper className={classes.root} elevation={1} style={{ marginBottom: 5 }}>
                     <Typography variant="h5" component="h3">
                        <strong>{data.value}</strong>
                     </Typography>
                     <Typography component="p">
                     {data.key}
                     </Typography>
                  </Paper>
               })
            }
         </div>
      )
   }
}


export default withStyles(styles, { withTheme: true })(ClinicDashboard)