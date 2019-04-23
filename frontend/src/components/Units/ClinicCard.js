import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  card: {
    width: '99%',
    padding: 5,
    marginLeft: 5,
    marginBottom: 5,
    marginRight: 5
  },
  media: {
    objectFit: 'cover',
  },
};

function ClinicCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
          image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.clinic_name}
          </Typography>
          <Typography component="p">
            {props.data.address}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          EDIT
        </Button>
        <Button size="small" color="secondary">
          REMOVE
        </Button>
      </CardActions>
    </Card>
  );
}

ClinicCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ClinicCard)