import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button } from '@material-ui/core'
import { ClinicCard } from 'components'
import _ from 'lodash'
import { RouteTo } from '../Utils/RouterAction'

const styles = {
   root: {
     flexGrow: 1,
   },
   grow: {
     flexGrow: 1,
   }
}

class ManageClinics extends React.Component {

   state = {
      data: []
   }
   componentDidMount(){
      this.fetchData()
   }

   fetchData = () => {
      let data = [
         { id: 1, clinic_name: 'Ace Medical Center', address: 'Lizards are a widespread group of squamate reptiles' },
         { id: 2, clinic_name: 'Ace Dermatology Center', address: 'Lizards are a widespread group of squamate reptiles' },
         { id: 3, clinic_name: 'Ace Dental Center', address: 'Lizards are a widespread group of squamate reptiles' },
         { id: 4, clinic_name: 'Ace Medical Center', address: 'Lizards are a widespread group of squamate reptiles' },
         { id: 5, clinic_name: 'Ace Dermatology Center', address: 'Lizards are a widespread group of squamate reptiles' },
         { id: 6, clinic_name: 'Ace Dental Center', address: 'Lizards are a widespread group of squamate reptiles' },
      ]

      this.setState({
         data
      })
   }

   onCardClick = item => {
      this.goTo('/clinic/' + item.id)
   }
   
   goTo = path => {
      RouteTo(this.props, path)
   }

   openClinic = () => {

   }
   
   render() {
      const { classes, theme } = this.props;


      return (
         <div>
            <Button onClick={() => this.openClinic()}></Button>
            <Grid style={{ flexDirection: 'row' }} container justify={'center'}>
               {
                  _.map(this.state.data, item => {
                     return (
                        <Grid item md={4}>
                           <ClinicCard data={item} onClick={() => this.onCardClick(item)} />
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