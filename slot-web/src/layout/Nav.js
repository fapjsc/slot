import React, { useState } from 'react';
import classes from './Nav.module.scss';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

const Nav = ({ setReviewState, snackBarPic }) => {
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleShowDialog = () => {
    setShowDialog(true);
  };
  return (
    <div className={classes.navBox}>
      <main className={classes.main}>
        <div
          className={`${classes['hamburger-menu']} ${classes['toggle-overlay']}`}
          onClick={() => setOpen(!open)}
        >
          <div className={open ? `${classes.bar} ${classes.animate}` : classes.bar} />
        </div>
      </main>

      <aside className={`${open ? classes.open : null} ${classes.aside}`}>
        <div className={`${classes['outer-close']} ${classes['toggle-overlay']}`}>
          <Link className={classes.close}>
            <span />
          </Link>
        </div>

        <nav className={classes.nav}>
          <ul>
            <li>
              <Link onClick={handleShowDialog}>遊戲說明</Link>
            </li>
            <li>
              <Link onClick={() => setReviewState(true)}>離開</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <Dialog
        open={showDialog}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle id="alert-dialog-slide-title">遊戲說明</DialogTitle> */}
        <DialogContent
          style={{
            padding: '1px',
            minWidth: '20rem',
            minHeight: '10rem',
          }}
        >
          {snackBarPic ? (
            <img
              src={snackBarPic}
              alt="game description"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4rem',
              }}
            >
              <DialogContentText>尚未添加遊戲說明.</DialogContentText>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(Nav);
