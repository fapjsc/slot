import './GameStartMobile.css';
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Screen from '../../Screen';

import Background from '../../asset/bg.png';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#15161B',
    padding: 10,
  },
  machine: {
    Width: '500px',
    height: '500px',
    backgroundImage: 'url(' + Background + ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  buttonBox: {
    backgroundColor: '#15161B',
    width: '100%',
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  maxButton: {
    backgroundColor: '#042a5f',
    padding: '10px',
    margin: '0 10px',
    paddingBottom: '10px',
    color: 'rgb(255, 240, 240)',
    fontSize: '.8rem',
    fontWeight: 'bold 5px',
    borderColor: '#073370',
    borderRadius: '10px',
  },
  pointText: {
    fontSize: '.8rem',
    color: 'white',
    fontWeight: 'bold',
    padding: '3px',
  },
  slotButton: {
    backgroundColor: '#042a5f',
    padding: '10px',
    margin: '0 10px',
    paddingBottom: '10px',
    fontSize: '.8rem',
    color: 'azure',
    fontWeight: 'bold 5px',
    borderColor: '#073370',
    borderRadius: '10px',
  },
  accountButton: {
    backgroundColor: '#ebdada',
    padding: '10px',
    margin: '0 10px',
    paddingBottom: '10px',
    color: 'rgb(14, 0, 0)',
    fontSize: '.8rem',
    fontWeight: 'bold',
    borderColor: '#d2e9bf',
    borderRadius: '10px',
    marginRight: 'auto',
  },

  autoSpinButton: {
    backgroundColor: '#e01313',
    padding: '10px',
    margin: '0 10px',
    paddingBottom: '10px',
    color: 'azure',
    fontWeight: 'bold 5px',
    borderColor: '#81f722',
    borderRadius: '50%',
  },

  spinButton: {
    backgroundColor: '#0d6349',
    padding: '10px',
    margin: '0 10px',
    paddingBottom: '10px',
    color: 'azure',
    fontWeight: 'bold 5px',
    borderColor: '#81f722',
    borderRadius: '50%',
  },
  bottomBox: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  screenBox: {
    position: 'absolute',
    top: 150,
    left: 11,
    height: 330,
    width: '94%',
  },
});

const GameStartMobile = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.machine}></Box>

      <Box className={classes.screenBox}>
        <Screen />
      </Box>

      <Box className={classes.buttonBox}>
        <Box>
          <button className={classes.maxButton} type="primary">
            MAX BET
          </button>
          <span className={classes.pointText}>點數</span>
          <input />
          <button className={classes.slotButton} type="primary">
            投幣
          </button>
        </Box>

        <Box className={classes.bottomBox}>
          <button className={classes.accountButton} type="primary">
            結算
          </button>

          <button className={classes.autoSpinButton} type="primary">
            AUTO SPIN
          </button>

          <button className={classes.spinButton} type="primary">
            SPIN
          </button>
        </Box>

        {/* <button className="mobileButtonPosition2" type="primary">
          結算
        </button>
        <button className="mobileButtonPosition3" type="primary">
          SPIN
        </button>
        <button className="mobileButtonPosition4" type="primary">
          AUTO SPIN
        </button>
        <div className="mobileGameTab">
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
          <input />
          <button className="mobileGameTabButton" type="primary">
            投入代幣
          </button>
        </div> */}
      </Box>
    </Box>
  );
};

export default GameStartMobile;
