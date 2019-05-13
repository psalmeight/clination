import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

import { PatientInformation, PatientHistory, PatientMedications } from 'components'

function TabContainer(props) {
  return (
    <Typography component="div">
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

class PatientDashboard extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
      const { classes } = this.props;
      const { value } = this.state;

      let patient = {
         id: 5,
         patient_name: "Ace Jordan Lumaad",
         details: 'M | 03/13/1990',
         avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
      }

    return (
      <div className={classes.root}>

        <div>
          <Fragment key={patient.id}>
              <ListItem button>
                <Avatar alt="Profile Picture" src={patient.avatar} />
                <ListItemText primary={patient.patient_name} secondary={patient.details} />
              </ListItem>
          </Fragment>
          <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="History" />
                {/* <Tab label="Medications" /> */}
                <Tab label="Information" />
              </Tabs>
          </AppBar>
        </div>
        <div>
          {value === 0 && <TabContainer>
                <PatientHistory {...this.props} />
          </TabContainer>}
          {value === 1 && <TabContainer>
                <PatientMedications {...this.props} />
          </TabContainer>}
          {value === 2 && <TabContainer>
                <PatientInformation {...this.props} />
          </TabContainer>}
        </div>

      </div>
    );
  }
}

PatientDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PatientDashboard)