import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Appointments, Patients } from 'components'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
})

class ClinicDashboard extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Patients" />
            <Tab label="Appointments" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>
            <Patients {...this.props} />
        </TabContainer>}
        {value === 1 && <TabContainer>
            <Appointments {...this.props} />
        </TabContainer>}
      </div>
    );
  }
}

ClinicDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClinicDashboard)