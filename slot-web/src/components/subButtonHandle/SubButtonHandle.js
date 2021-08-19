import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import IconButton from '@material-ui/core/IconButton';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import classes from './SubButtonHandle.module.scss';

// Button Components
import ButtonGroup from '../buttonType/ButtonGroup';

const useStyles = makeStyles({
  list: {
    height: '10rem',
    backgroundImage: 'linear-gradient(#2a2619, #a7a2a2, #2a2619)',
  },
  fullList: {
    // width: 'auto',
  },
});

const SubButtonHandle = ({ subBtn, spin, btnStyle }) => {
  console.log(subBtn);

  const styles = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: true,
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
      {/* <div className={classes.arrDown}>
        <ArrowDownwardIcon onClick={() => setState({ ...state, bottom: false })} />
      </div> */}

      <div className={classes.btnContainer}>
        <div className={classes.arrDown}>
          <ArrowDownwardIcon onClick={() => setState({ ...state, bottom: false })} />
        </div>
        <ButtonGroup spin={spin} subBtn={subBtn} btnStyle={btnStyle} />
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
            <TouchAppIcon fontSize="small" />
          </IconButton>{' '}
          <p style={{ color: 'white', marginTop: 5 }}>操作</p>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            BackdropProps={{ invisible: true }}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
};

export default React.memo(SubButtonHandle);
