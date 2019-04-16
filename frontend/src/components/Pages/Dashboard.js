import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import _ from 'lodash'

const styles = {
   root: {
     flexGrow: 1,
   },
   grow: {
     flexGrow: 1,
   }
}

class Dashboard extends React.Component {
   render() {
      const { classes, theme } = this.props;

      return (
         <div className={classes.root}>

         </div>
      )
   }
}


export default withStyles(styles, { withTheme: true })(Dashboard)