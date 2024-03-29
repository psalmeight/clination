import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class CDialog extends React.Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
            >
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {this.props.message}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {this.props.choices}
                </DialogActions>
            </Dialog>
        )
    }
}

export default CDialog