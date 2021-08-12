import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';

import styles from './Dialog.module.scss';

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    maxHeight: '40rem',
  },
}));

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(true);
  const [scroll] = React.useState('paper');
  const classes = useStyles();
  // const [scroll, setScroll] = React.useState('paper');

  // const handleClickOpen = scrollType => () => {
  //   setOpen(true);
  //   setScroll(scrollType);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExit = () => {
    localStorage.setItem('isShow', true);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        onExit={handleExit}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" className={`${styles.title}`}>
          溫馨提醒
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'} className={`${styles.content}`}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1} className={styles.contextText}>
            為維護遊戲良好連線品質，建議使用5G或WIFI連線，並使用下列瀏覽器：Chrome、Safari瀏覽器開啟遊戲，祝君好運。
          </DialogContentText>
        </DialogContent>
        <DialogActions className={styles.darkBg}>
          <Button onClick={handleClose} color="primary" className={styles.btn}>
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
