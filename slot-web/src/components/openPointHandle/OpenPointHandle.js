import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import IconButton from '@material-ui/core/IconButton';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

// Icon
// import goldImg from '../asset/gold.png';
import goldImg from '../../asset/gold.jpg';
import AddBoxIcon from '@material-ui/icons/AddBox';

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

const OpenPointHandle = ({ cashIn, handleChange, pointCash }) => {
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
          <input type="number" value={cashIn} onChange={handleChange} placeholder="點數" onWheel={event => event.currentTarget.blur()} />
          <AddBoxIcon className={classes.slotIcon} onClick={() => pointCash(cashIn)} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {['bottom'].map(anchor => (
        <React.Fragment key={anchor}>
          <IconButton style={{ backgroundColor: '#ddd' }} color="primary" aria-label="add to shopping cart" onClick={toggleDrawer(anchor, true)}>
            <MonetizationOnIcon fontSize="small" />
          </IconButton>
          <p style={{ color: 'white' }}>開分</p>
          <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
};

export default OpenPointHandle;
