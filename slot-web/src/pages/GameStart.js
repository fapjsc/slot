import "./GameStart.css";
import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import GameStartMobile from "../components/gameStart/GameStartMobile";
import ApiController from '../api/apiController';
import UserContext from '../context/User/UserContext';

import Screen from '../Screen';
import centerBg from '../asset/center_bk.jpg';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  screenBox: {
    position: 'relative',
  },
  cameraScreen: {
    position: 'absolute',
    top: 12,
    left: 42,
    backgroundColor: '#15161B',
    width: '87%',
    height: '330px',
  },
});

const GameStart = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const [device, setDevice] = useState(false);
  const [cashIn, setCashIn] = useState(0);
  const [configId, setConfigId] = useState(2);
  const [egmId, setEgmId] = useState(9);
  const [egmIP, setEgmIP] = useState('192.168.10.71');
  const [buttonNumber, setButtonNumber] = useState(77);
  const [buttonText, setButtonText] = useState('SPIN');
  const [buttonNumber2, setButtonNumber2] = useState(99);
  const [buttonText2, setButtonText2] = useState('MAX BET');
  // User Context
  const userContext = useContext(UserContext);
  const { apiToken } = userContext;

  const handleRWD = () => {
    if (window.innerWidth < 1000) setDevice(true);
    else setDevice(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleRWD);
    handleRWD();
    return () => {
      window.removeEventListener('resize', handleRWD);
    };
  }, []);

  if (device === true)
    return (
      <GameStartMobile />
    );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const leave = async () => {
    window.confirm('確定離開嗎?', apiToken);
    // history.replace('/home');

    try {
      let responseData = await ApiController()
      .endGameApi(configId, egmId, egmIP, apiToken);
      if (responseData.code > 100000000) {
        alert('ERROR!');
      }
      if (responseData.code < 100000000) {
      }
    } catch (error) {
      alert('ERROR message: ', error);
    }
  };

  const spin = async () => {

    try {
      let responseData = await ApiController()
      .pressSlotApi(configId, egmId, egmIP, 77, apiToken);
      if (responseData.code > 100000000) {
        alert('ERROR!');
      }
      if (responseData.code < 100000000) {
      }
    } catch (error) {
      alert('ERROR message: ', error);
    }
  };

  const maxBet = async () => {

    try {
      let responseData = await ApiController()
      .pressSlotApi(configId, egmId, egmIP, 99, apiToken);
      if (responseData.code > 100000000) {
        alert('ERROR!');
      }
      if (responseData.code < 100000000) {
      }
    } catch (error) {
      alert('ERROR message: ', error);
    }
  };

  const pointCash = async () => {

    try {
      let responseData = await ApiController()
      .pointCashApi(configId, egmId, egmIP, 1000, apiToken);
      if (responseData.code > 100000000) {
        alert('ERROR!');
      }
      if (responseData.code < 100000000) {
      }
    } catch (error) {
      alert('ERROR message: ', error);
    }
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></div>
  );

  if (device === true)
    return (
      <GameStartMobile 
        leave={leave}
        spin={spin}
        maxBet={maxBet}
        pointCash={pointCash}
      />
    );
  return (
    <Container fixed>
        <Box style={{ backgroundColor: "#191c19" }} className={classes.root}>
          <Box className="divPosition">
            <img className="backImg-left" src={'/left-top.png'} />
            <div className="">
              <img className="backImg-left" src={'/left-bottom.png'} />
            </div>
            <div className="gameDrawer">
              {['設定'].map(anchor => (
                <React.Fragment key={anchor}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: 'azure',
                    }}
                    onClick={toggleDrawer(anchor, true)}
                  >
                    {anchor}
                  </Button>
                  <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
          </Box>
          <Box className="divPosition">
            <div className={classes.screenBox}>
              <img className="backImg_Center" src={'/center.jpg'} />
              {/* <img className="backImg_Center" src={centerBg} alt="center bg" /> */}
              <div className={classes.cameraScreen}>
                <Screen />
              </div>
            </div>

            <div className="tt">
              <img className="backImg" src={'/center_bottom.jpg'} />
              <button className="buttonPosition" type="primary">
                MAX BET
              </button>
              <button className="buttonPosition2" type="primary" onClick={leave}>
                結算
              </button>
              <button className="buttonPosition3" type="primary">
                SPIN
              </button>
              <button className="buttonPosition4" type="primary">
                AUTO SPIN
              </button>
              <div className="gameTab">
                <span
                  style={{
                    fontSize: '1.0rem',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '5px',
                  }}
                >
                  點數
                </span>
                <input onChange={() => setCashIn()}/>
                <button className="gameTabButton" type="primary">
                  投入代幣
                </button>
              </div>
            </div>
          </Box>
          <Box className="divPosition">
            <img className="backImg-right" src={'/right-top.png'} />
            <div className="tt">
              <img className="backImg-right" src={'/right-bottom.png'} />
            </div>
          </Box>
        </Box>
      </Container>
    );
};

export default GameStart;
