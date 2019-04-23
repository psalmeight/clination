import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'
import { ClinicCard } from 'components'
import _ from 'lodash'

const styles = {
   root: {
     flexGrow: 1,
   },
   grow: {
     flexGrow: 1,
   }
}

class ManageClinics extends React.Component {
   render() {
      const { classes, theme } = this.props;

      let data = [
         { id: 1, clinic_name: 'Ace Medical Center', address: 'Lizards are a widespread group of squamate reptiles' },
         { id: 2, clinic_name: 'Ace Dermatology Center', address: 'Lizards are a widespread group of squamate reptiles' },
         { id: 3, clinic_name: 'Ace Dental Center', address: 'Lizards are a widespread group of squamate reptiles' },
         { id: 4, clinic_name: 'Ace Medical Center', address: 'Lizards are a widespread group of squamate reptiles' },
         { id: 5, clinic_name: 'Ace Dermatology Center', address: 'Lizards are a widespread group of squamate reptiles' },
         { id: 6, clinic_name: 'Ace Dental Center', address: 'Lizards are a widespread group of squamate reptiles' },
      ]

      return (
         <div>
            <Grid style={{ flexDirection: 'row' }} container justify={'center'}>
               {
                  _.map(data, item => {
                     return (
                        <Grid item md={4}>
                           <ClinicCard data={item} />
                        </Grid>
                     )
                  })
               }     
            </Grid>
         </div>
      )
   }
}


export default withStyles(styles, { withTheme: true })(ManageClinics)