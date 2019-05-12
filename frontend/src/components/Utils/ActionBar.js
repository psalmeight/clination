import React from 'react';
import { Grid, Button } from '@material-ui/core';

class ActionBar extends React.Component {
    render() {
        return (
            <Grid container style={this.props.style}>
                <Grid item>
                    {this.props.children}
                </Grid>
            </Grid>
        )
    }
}

export default ActionBar