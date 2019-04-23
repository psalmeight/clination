import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import _ from 'lodash'

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
})

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

class CConfirm extends React.Component {
  render() {
    
    const { classes } = this.props

    return (
        <Modal
            open={this.props.open}
            onClose={this.props.onClose}
        >
            <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="h6" id="modal-title">
                    {this.props.title}
                </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                    {this.props.message}
                </Typography>

                <div style={{ marginTop: 10 }}>
                    {
                        _.map(this.props.actions, action => {
                            return <Button 
                                size="small" color={action.actionType || 'default'} 
                                onClick={action.action}
                                style={{ marginRight: 10 }}>
                                {action.actionTitle}
                            </Button>
                        })
                    }
                </div>

            </div>
        </Modal>
    )
  }
}

CConfirm.propTypes = {
  classes: PropTypes.object.isRequired,
}

const CConfirmWrapped = withStyles(styles)(CConfirm);

export default CConfirmWrapped