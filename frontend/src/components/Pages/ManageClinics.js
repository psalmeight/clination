import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button } from '@material-ui/core'
import { ClinicCard, ActionBar, ClinicForm } from 'components'
import _ from 'lodash'
import { RouteTo } from '../Utils/RouterAction'
import { _getClinicsOwn, _deleteClinic } from '../../rest/clinic.api'

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
      data: [],
      openClinicForm: false
   }

   componentDidMount(){
      this.fetchData()
   }

   fetchData = () => {
      _getClinicsOwn(data => {
         this.setState({
            data
         })
      })
   }

   deleteClinic = id => {
      _deleteClinic(id, () => {
         this.fetchData()
      })
   }

   onCardClick = item => {
      this.goTo('/clinic/' + item.id)
   }
   
   goTo = path => {
      RouteTo(this.props, path)
   }

   addNewClinic = val => {
      this.setState({ openClinicForm: val })
   }
   
   render() {
      const { classes, theme } = this.props;

      return (
         <div>
            <ActionBar>
               <Button color="primary" onClick={() => this.addNewClinic(true)}>
                  Register a new Clinic
               </Button>
            </ActionBar>

            <Grid style={{ flexDirection: 'row' }} container>
               {
                  _.map(this.state.data, item => {
                     return (
                        <Grid item md={4}>
                           <ClinicCard data={item} onClick={() => this.onCardClick(item)} onDelete={() => this.deleteClinic(item.id)} />
                        </Grid>
                     )
                  })
               }     
            </Grid>

            <ClinicForm 
               open={this.state.openClinicForm} 
               closeForm={() => this.addNewClinic(false)} 
               refreshList={() => this.fetchData()}   
            />
         
         </div>
      )
   }
}


export default withStyles(styles, { withTheme: true })(ManageClinics)