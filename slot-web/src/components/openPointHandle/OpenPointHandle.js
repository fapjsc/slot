import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

// Balance
import CircularProgress from '@material-ui/core/CircularProgress';
import Odometer from 'react-odometerjs';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

// Img
import goldImg from '../../asset/gold.jpg';
import moneyImg from '../../asset/money.png';

// Style
import classes from './OpenPointHandle.module.scss';

const useStyles = makeStyles({
  list: {
    // width: '678px',
    backgroundImage: 'linear-gradient(#2a2619, #a7a2a2, #2a2619)',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullList: {
    width: 'auto',
  },
});

const OpenPointHandle = ({
  landscape,
  cashIn,
  handleChange,
  pointCash,
  credit,
  creditLoading,
  openPoint,
  setAutoGame,
}) => {
  const styles = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(styles.list, {
        [styles.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <div className={classes.inputBox}>
        <div className={classes.goldBox}>
          <img className={classes.gold} src={goldImg} alt="gold" />
          <span className={classes.span}>開分</span>
        </div>
        <div className={classes.inputInnerBox}>
          <input
            type="number"
            value={cashIn}
            onChange={handleChange}
            placeholder="點數"
            onWheel={event => event.currentTarget.blur()}
          />
          <AddBoxIcon className={classes.slotIcon} onClick={() => pointCash(cashIn)} />
        </div>
      </div>
    </div>
  );

  const balanceList = anchor => (
    <div
      className={clsx(styles.list, {
        [styles.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <div className={classes.creditBox}>
        <div className={classes.moneyBox}>
          <img className={classes.money} src={moneyImg} alt="money" />
          <span className={classes.span}>餘額</span>
        </div>

        {creditLoading ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <div className={classes.odometerBox}>
            <Odometer format="(,ddd).dd" value={Number(credit)} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {['bottom'].map(anchor => (
        <React.Fragment key={anchor}>
          <IconButton
            style={{ backgroundColor: '#ddd' }}
            color="primary"
            aria-label="add to shopping cart"
            onClick={toggleDrawer(anchor, true)}
          >
            {openPoint ? (
              <MonetizationOnIcon fontSize="small" />
            ) : (
              <AccountBalanceIcon fontSize="small" onClick={() => setAutoGame(false)} />
            )}
          </IconButton>
          {openPoint ? <p style={{ color: 'white' }}>開分</p> : null}

          {landscape ? (
            <p style={{ color: 'white', marginTop: 5, fontSize: '12px' }}>查詢餘額</p>
          ) : (
            <p style={{ color: 'white', marginTop: 5 }}>查詢餘額</p>
          )}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {openPoint ? list(anchor) : balanceList(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
};

export default OpenPointHandle;
