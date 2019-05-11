import React from 'react';
import { Grid, Button } from '@material-ui/core';

class ActionBar extends React.Component {
    render() {
        return (
            <Grid container>
                <Grid item>
                    {this.props.children}
                </Grid>
            </Grid>
        )
    }
}

export default ActionBar