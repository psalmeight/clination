import React from "react";

import _ from 'lodash'

class ManageClinics extends React.Component {

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
            <AppBar className={classes.appBar}>
               <Toolbar>
                  <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.menuButton}
                  >
                     <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" color="inherit" noWrap>
                  CLINation
                  </Typography>
                  <Button color="inherit" onClick={props.showRegistration}>Logout</Button>
               </Toolbar>
            </AppBar>

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