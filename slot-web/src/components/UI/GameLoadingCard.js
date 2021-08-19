import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';

import gameLoadingBg from '../../asset/gameLoading.jpg';

import Loading from './Loading';
import Carousels from '../Carousels';

const useStyles = makeStyles({
  root: {
    width: '80vw',
    height: '20rem',
    backgroundImage: `url(${gameLoadingBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },

  action: {
    backgroundColor: 'rgba(145, 131, 194, 0.15)',
    position: 'absolute',
    width: '80%',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '5px',
  },
});

const GameLoadingCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent></CardContent>
      </CardActionArea>
      <CardActions className={classes.action}>
        <Loading />
      </CardActions>
    </Card>
  );
};

export default GameLoadingCard;
