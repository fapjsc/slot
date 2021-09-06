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

// React router
import { useHistory } from 'react-router-dom';

// Hooks
import useHttp from '../../hooks/useHttp';

// Apis
import { pointCash } from '../../lib/api';

// Redux
import { useSelector } from 'react-redux';

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

const GameLoadingCard = ({ setShowGameLoading }) => {
  const classes = useStyles();

  // Router Props
  const history = useHistory();

  // Hooks
  const {
    status: pointCashStatus,
    error: pointCashError,
    data: pointCashData,
    sendRequest: pointCashRequest,
  } = useHttp(pointCash);

  // Redux
  const { selectEgmData } = useSelector(state => state.egm);

  // Init State
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

      // 現在時間加上三分鐘
      const expirationTime = new Date(new Date().getTime() + 60 * 1000 * 3);
      localStorage.setItem('expirationTime', expirationTime);
    };
  }, [text.length]);

  useEffect(() => {
    const pointData = {
      cfgId: selectEgmData.mapId,
      egmId: selectEgmData.egmId,
      egmIP: selectEgmData.egmIP,
      egmSession: selectEgmData.egmSession,
      checkSum: selectEgmData.checkSum,
      moneyPoint: selectEgmData.walletBalance,
      apiToken: localStorage.getItem('token'),
    };
    pointCashRequest(pointData);
  }, [pointCashRequest, selectEgmData]);

  useEffect(() => {
    if (pointCashError) {
      alert(pointCashError);
      setShowGameLoading(false);
    }
  }, [pointCashError, setShowGameLoading, history]);

  useEffect(() => {
    if (pointCashStatus !== 'completed') return;

    if (pointCashData === null) {
      localStorage.clear();
      history.replace('/');
      return;
    }

    if (pointCashData.code === 3) {
      history.replace('/gameStart');
    }
  }, [pointCashStatus, history, pointCashData]);

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
