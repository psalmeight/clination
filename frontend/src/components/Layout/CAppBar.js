import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import _ from 'lodash'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
       display: "none"
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
       width: `calc(100% - ${drawerWidth}px)`
    }
 },
})

function addNewClinic(){

}

function CAppBar(props) {
    const { classes } = props

   return (
      <div className={props.className} style={{ marginBottom: 80 }}>
         <AppBar positionStatic className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={() => props.handleDrawerToggle()}
                className={classes.menuButton}>
                    <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                {props.setTitle || 'Dashboard'}
              </Typography>

              {
                props.routePath === '/dashboard/manage_clinics' ? 
                (<div style={{ position: 'absolute', right: 10, marginRight: 10 }}>
                  <Button color="inherit" onClick={addNewClinic()}>Add Clinic</Button>
                </div>)
                :
                null
              }
              
              {
                props.routePath === '/dashboard/manage_users' ? 
                (<div style={{ position: 'absolute', right: 10, marginRight: 10 }}>
                  <Button color="inherit" onClick={addNewClinic()}>Add Users</Button>
                </div>)
                :
                null
              }
              
              {
                props.showRegistration ?
                <Button color="inherit" onClick={props.showRegistration}>Register</Button>
                : null
              }
        </Toolbar>
      </AppBar>
    </div>
  );
}

CAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CAppBar)