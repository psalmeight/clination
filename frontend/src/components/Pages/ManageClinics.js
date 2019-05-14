import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button } from '@material-ui/core'
import { ClinicCard, ActionBar, ClinicForm } from 'components'
import * as rule from '../Utils/RoleAccessConfig'

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

            {
               rule.roleQualified(rule.REGISTER_CLINIC) ? <ActionBar style={{ marginBottom: 10 }}>
                  <Button color="primary" onClick={() => this.addNewClinic(true)}>
                     Register a new Clinic
                  </Button>
               </ActionBar> : null
            }
            
            <Grid style={{ flexDirection: 'row' }} container>
               {
                  !_.isEmpty(this.state.data) ? (
                     _.map(this.state.data, clinic => {
                        return (
                           <Grid item lg={4} md={6} xs={12}>
                              <ClinicCard 
                                 data={clinic} 
                                 onClick={() => this.onCardClick(clinic)} 
                                 onDelete={() => this.deleteClinic(clinic.id)} 
                              />
                           </Grid>
                        )
                     })
                  ) : <Typography style={{ fontSize: 30, color: 'gray' }}>No clinic(s)</Typography>
               }   
            </Grid>

            {
               rule.roleQualified(rule.REGISTER_CLINIC) ? <ClinicForm 
                  open={this.state.openClinicForm} 
                  closeForm={() => this.addNewClinic(false)} 
                  refreshList={() => this.fetchData()}   
               /> : null
            }

         </div>
      )
   }
}


export default withStyles(styles, { withTheme: true })(ManageClinics)