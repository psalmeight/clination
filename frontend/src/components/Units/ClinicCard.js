import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { CConfirm } from 'components'

const styles = {
  card: {
    width: '99%',
    padding: 5,
    marginLeft: 5,
    marginBottom: 5,
    marginRight: 5
  },
  media: {
    objectFit: 'cover',
  },
}

class ClinicCard extends React.Component {
   
   state = {
      deleteOpen: false
   }

   deleteCardOpen = val => {
      this.setState({ deleteOpen: val })
   }

   onDelete = () => {
      this.props.onDelete()
      this.deleteCardOpen(false)
   }

   render(){

      const { classes } = this.props

      return (
         <div>
            <Card className={classes.card}>
            <CardActionArea onClick={() => this.props.onClick()}>

               <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                     {this.props.data.clinic_name}
                  </Typography>
                  <Typography component="p">
                     {this.props.data.clinic_address}
                  </Typography>
               </CardContent>
            </CardActionArea>
            <CardActions>
               {/* <Button size="small" color="primary">
                  EDIT
               </Button> */}
               <Button size="small" color="secondary" onClick={() => this.deleteCardOpen(true)}>
                  REMOVE
               </Button>
            </CardActions>
            </Card>
     
            <CConfirm
               open={this.state.deleteOpen}
               onClose={() => this.deleteCardOpen(false)}
               onOk={() => this.deleteCardOpen(false)}
               title={'Delete Confirmation'}
               message={`Are you sure you want to delete ${this.props.data.clinic_name}?`}
               actions={[
                  { actionTitle: 'Yes', action: () => this.onDelete(), actionType: 'primary' },
                  { actionTitle: 'Cancel', action: () => this.deleteCardOpen(false), actionType: 'secondary' }
               ]}
            />
         </div>
      )
   }
}

ClinicCard.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ClinicCard)