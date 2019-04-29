import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import InputAdornment from '@material-ui/core/InputAdornment'
import { TextField } from '@material-ui/core'

import _ from 'lodash'

const styles = theme => ({
   root: {
      flexGrow: 1,
   },
   grow: {
      flexGrow: 1,
   },
   chip: {
      margin: theme.spacing.unit,
   },
   card: {
      minWidth: 275,
   },
   title: {
      fontSize: 14,
   },
})

class PatientHistory extends React.Component {
   state = {
      expanded: 0,
      data: []
   }

   componentDidMount(){
      this.fetchData()
   }

   fetchData = () => {
      let data = { 
         date: '03/13/1990',
         id: 1, 
         chief_complaint: 'Fever, cough', 
         hpi: 'The quick little brown fox jumps over the back of the lazy dog', 
         physical_exam: 'The quick little brown fox jumps over the back of the lazy dog', 
         diagnosis: 'The quick little brown fox jumps over the back of the lazy dog',
      }

      this.setState({
         data
      })
   }

   render() {
      const { classes } = this.props

      return (
         <div className={classes.root} style={{ padding: 15 }}>
            <form noValidate autoComplete="off">
               <Grid container spacing={16}>
                  <Grid item md={6} xs={12}>
                     <Card className={classes.card}>
                        <CardContent>
                           <Typography className={classes.title} color="textSecondary" gutterBottom>
                              History Records
                           </Typography>
                           
                           <TextField
                              label={'Chief Complaint'}
                              multiline
                              rowsMax="4"
                              value={this.state.data.chief_complaint}
                              fullWidth
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{
                                    shrink: true,
                              }}
                           />

                           <TextField
                              label={'History of Present Illness'}
                              multiline
                              rowsMax="4"
                              value={this.state.data.hpi}
                              fullWidth
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />
                                       
                           <TextField
                              label={'Physical Exam'}
                              multiline
                              rowsMax="4"
                              value={this.state.data.physical_exam}
                              fullWidth
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />

                           <TextField
                              label={'Diagnosis'}
                              multiline
                              rowsMax="4"
                              value={this.state.data.diagnosis}
                              fullWidth
                              margin="dense"
                              variant="outlined"
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />     
                        </CardContent>
                     </Card>
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <Card className={classes.card} fullWidth>
                        <CardContent>
                           <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Recent Vitals
                           </Typography>
                           
                           <Grid container fullWidth>
                              <Grid item md={6} xs={6} style={{ paddingRight: 5 }}>
                                 <TextField
                                    label={'Weight'}
                                    value={this.state.data.weight}
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    InputProps={{
                                       endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                 />
                              </Grid>
                              <Grid item md={6} xs={6} style={{ paddingLeft: 5 }}>
                                 <TextField
                                    label={'Height'}
                                    value={this.state.data.height}
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    InputProps={{
                                       endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                 />
                              </Grid>
                           </Grid>
                           <Grid container fullWidth>
                              <Grid item md={6} xs={6} style={{ paddingRight: 5 }}>
                                 <TextField
                                    label={'Blood Pressure'}
                                    value={this.state.data.height}
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    InputProps={{
                                       endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                 />
                              </Grid>
                              <Grid item md={6} xs={6} style={{ paddingLeft: 5 }}>
                                 <TextField
                                    label={'Pulse Rate'}
                                    value={this.state.data.pulse_rate}
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    InputProps={{
                                       endAdornment: <InputAdornment position="end">bpm</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                 />
                              </Grid>
                           </Grid>

                           <Grid container fullWidth>
                              <Grid item md={6} xs={6} style={{ paddingRight: 5 }}>
                                 <TextField
                                    label={'Respiratory Rate'}
                                    value={this.state.data.respiratory_rate}
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    InputProps={{
                                       endAdornment: <InputAdornment position="end">bpm</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                 />
                              </Grid>
                              <Grid item md={6} xs={6} style={{ paddingLeft: 5 }}>
                                 <TextField
                                    label={'Temperature'}
                                    value={this.state.data.temperature}
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    InputProps={{
                                       endAdornment: <InputAdornment position="end">C</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                 />
                              </Grid>
                           </Grid>
                        </CardContent>
                     </Card>

                     <Card className={classes.card} fullWidth style={{ marginTop: 16 }}>
                        <CardContent>
                           <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Allergies
                           </Typography>
                           
                           <Grid container fullWidth>
                              <Grid item md={6} xs={6} style={{ paddingRight: 5 }}>
                                 <TextField
                                    label={'Food Allergy'}
                                    value={this.state.data.respiratory_rate}
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                 />
                              </Grid>
                              <Grid item md={6} xs={6} style={{ paddingLeft: 5 }}>
                                 <TextField
                                    label={'Drug Allergy'}
                                    value={this.state.data.temperature}
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                 />
                              </Grid>
                           </Grid>
                        </CardContent>
                     </Card>
                  </Grid>
               </Grid>
            </form>
         </div>
      )
   }
}

PatientHistory.propTypes = {
   classes: PropTypes.object.isRequired,
 }

export default withStyles(styles, { withTheme: true })(PatientHistory)