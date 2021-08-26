import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Fade from '@material-ui/core/Fade';

import gameLoadingBg from '../../asset/gameLoading.jpg';
import Loading from './Loading';

// import { Transition } from 'react-transition-group';

const useStyles = makeStyles({
  root: {
    width: '300px',
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
  box: {
    width: '100%',
    textAlign: 'center',
  },
});

const GameLoadingCard = () => {
  const classes = useStyles();

  const [text] = useState(['更多遊戲，等你來玩', '眾家遊戲，火熱上線', '真實老虎機，在家也能玩']);
  const [textIndex, setTextIndex] = useState(0);

  const getRandomNum = num => {
    return Math.floor(Math.random() * num);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      setTextIndex(getRandomNum(text.length));
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [text.length]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent></CardContent>
      </CardActionArea>
      <CardActions className={classes.action}>
        <Box className={classes.box}>
          <Typography variant="p" component="p" style={{ color: '#fff', marginBottom: '5px' }}>
            {text[textIndex]}
          </Typography>
          <Loading />
        </Box>
      </CardActions>
    </Card>
  );
};

export default GameLoadingCard;
