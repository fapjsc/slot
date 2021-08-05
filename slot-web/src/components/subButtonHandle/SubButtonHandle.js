import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import IconButton from '@material-ui/core/IconButton';
import TouchAppIcon from '@material-ui/icons/TouchApp';

import classes from './SubButtonHandle.module.scss';

const useStyles = makeStyles({
  list: {
    // width: '678px',
    backgroundImage: 'linear-gradient(#2a2619, #a7a2a2, #2a2619)',
  },
  fullList: {
    width: 'auto',
  },
});

const SubButtonHandle = ({ subBtn, spin }) => {
  const styles = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const subBtnListEl = subBtn.map(btn => {
    switch (btn.buttonTxt) {
      // 貴族
      case '1-1':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.credit1}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case '1-2':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.credit3}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case '1-3':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.credit7}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case '1-4':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.credit15}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case '1-5':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.credit25}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case 'x1':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.bet1}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case 'x2':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.bet2}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case 'x5':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.bet5}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case 'x10':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.bet10}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case 'x15':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.bet15}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      // 雄狼
      // case '25':
      //   return (
      //     <div className={`${classes.subBtnBox}`}>
      //       <button className={`${classes.subBtn} ${classes.aruze25}`} onClick={() => spin(btn.buttonNo)} />
      //     </div>
      //   );

      case '50':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.aruze50}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case '100':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.aruze100}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case '150':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.aruze150}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case '250':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.aruze250}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case '500':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.aruze500}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      // case 'TAKE':
      //   return (
      //     <div className={`${classes.subBtnBox}`}>
      //       <button className={`${classes.subBtn} ${classes.take}`} />
      //     </div>
      //   );

      default:
        return null;
    }
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
      {subBtn.length > 0 ? <div className={classes.btnContainer}>{subBtnListEl}</div> : <p style={{ textAlign: 'center' }}>No Button</p>}
    </div>
  );

  return (
    <div>
      {['bottom'].map(anchor => (
        <React.Fragment key={anchor}>
          <IconButton style={{ backgroundColor: '#ddd' }} color="primary" aria-label="add to shopping cart" onClick={toggleDrawer(anchor, true)}>
            <TouchAppIcon fontSize="small" />
          </IconButton>
          <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SubButtonHandle;
