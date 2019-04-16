import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { RouteTo } from '../Utils/RouterAction'

import _ from 'lodash'
import CAppBar from "./CAppBar";

const drawerWidth = 240;

const styles = theme => ({
   root: {
      display: "flex"
   },
   drawer: {
      [theme.breakpoints.up("sm")]: {
         width: drawerWidth,
         flexShrink: 0
      }
   },
   appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up("sm")]: {
         width: `calc(100% - ${drawerWidth}px)`
      }
   },
   menuButton: {
      marginRight: 20,
      [theme.breakpoints.up("sm")]: {
         display: "none"
      }
   },
   toolbar: theme.mixins.toolbar,
   drawerPaper: {
      width: drawerWidth
   },
   content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3
   }
})

class CDrawerLayout extends React.Component {
   state = {
      mobileOpen: false,
      pageTitle: 'Dashboard'
   }

   handleDrawerToggle = () => {
      this.setState(state => ({ mobileOpen: !state.mobileOpen }));
   }

   goTo = path => {

      switch(path){
         case '/dashboard': 
            this.setState({ pageTitle: 'Dashboard' }); break
         case '/dashboard/manage_clinics': 
            this.setState({ pageTitle: 'Manage Clinics' }); break
         case '/dashboard/manage_users': 
            this.setState({ pageTitle: 'Manage Users' }); break
         case '/dashboard/settings': 
            this.setState({ pageTitle: 'Settings' }); break     
      }

      RouteTo(this.props, path)
   }

   render() {
      const { classes, theme } = this.props;

      const drawer = (
         <div>
            <div className={classes.toolbar} />
            <List>
               {
                  _.map(this.props.drawers, data => {
                     return (
                        <ListItem button key={data.name} onClick={() => this.goTo(data.route)}>
                           <ListItemIcon>
                              {data.icon}
                           </ListItemIcon>
                           
                           <ListItemText primary={data.name} />
                        </ListItem>
                     )
                  })
               }
            </List>
         </div>
      )

      return (
         <div className={classes.root}>
            <CssBaseline />

            <CAppBar handleDrawerToggle={this.handleDrawerToggle} setTitle={this.state.pageTitle} />

            <nav className={classes.drawer}>
               {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
               <Hidden smUp implementation="css">
                  <Drawer
                  container={this.props.container}
                  variant="temporary"
                  anchor={theme.direction === "rtl" ? "right" : "left"}
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle}
                  classes={{
                     paper: classes.drawerPaper
                  }}
                  >
                  {drawer}
                  </Drawer>
               </Hidden>
               <Hidden xsDown implementation="css">
                  <Drawer
                  classes={{
                     paper: classes.drawerPaper
                  }}
                  variant="permanent"
                  open
                  >
                  {drawer}
                  </Drawer>
               </Hidden>
            </nav>
            <main className={classes.content}>
               <div className={classes.toolbar} />
               {this.props.children}
            </main>
         </div>
      )
   }
}

CDrawerLayout.propTypes = {
   classes: PropTypes.object.isRequired,
   container: PropTypes.object,
   theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(CDrawerLayout)