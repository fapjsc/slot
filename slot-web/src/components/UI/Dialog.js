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
          Title
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'} className={`${styles.content}`}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1} className={styles.contextText}>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Nisi facilisi id volutpat. Erat fermentum nam donec sit. Luctus phasellus diam parturient dui. Congue nibh nostra congue. Imperdiet
            conubia habitant aenean mauris etiam. Molestie vulputate hac venenatis senectus. semper. Mattis eleifend sem dictum habitasse ultricies. Lorem ipsum odor amet, consectetuer adipiscing
            elit. Nisi facilisi id volutpat. Erat fermentum nam donec sit. Luctus phasellus diam parturient dui. Congue nibh nostra congue. Imperdiet conubia habitant aenean mauris etiam. Molestie
            vulputate hac venenatis senectus. Hendrerit ultrices nisl faucibus taciti quam. Tristique volutpat mus augue inceptos ligula? Pretium praesent nisl vel at. Senectus pharetra maecenas
            integer. Ridiculus purus aliquam dapibus porta fames. Vulputate vestibulum euismod tristique sem. Enim fermentum at. Phasellus posuere accumsan nunc torquent. Molestie at curabitur feugiat
            mi nibh. Mus nulla integer montes torquent. Litora magna dui porta taciti habitant. Nullam hendrerit eleifend fames. Elementum proin semper. Mattis eleifend sem dictum habitasse ultricies.
            Lorem ipsum odor amet, consectetuer adipiscing elit. Nisi facilisi id volutpat. Erat fermentum nam donec sit. Luctus phasellus diam parturient dui. Congue nibh nostra congue. Imperdiet
            conubia habitant conubia habitant aenean mauris etiam. Molestie vulputate hac venenatis senectus. semper. Mattis eleifend sem dictum habitasse ultricies. Lorem ipsum odor amet,
            consectetuer adipiscing elit. Nisi facilisi id volutpat. Erat fermentum nam donec sit. Luctus phasellus diam parturient dui. Congue nibh nostra congue. Imperdiet conubia habitant aenean
            mauris etiam. Molestie vulputate hac venenatis senectus. Hendrerit ultrices nisl faucibus taciti quam. Tristique volutpat mus augue inceptos ligula? Pretium praesent nisl vel at. Senectus
            pharetra maecenas integer. Ridiculus purus aliquam dapibus porta fames. Vulputate vestibulum euismod tristique sem. Enim fermentum at. Phasellus posuere accumsan nunc torquent. Molestie at
            curabitur feugiat mi nibh. Mus nulla integer montes torquent. Litora magna dui porta taciti habitant. Nullam hendrerit eleifend fames. Elementum proin semper. Mattis eleifend sem dictum
            habitasse ultricies. Lorem ipsum odor amet, consectetuer adipiscing elit. Nisi facilisi id volutpat. Erat fermentum nam donec sit. Luctus phasellus diam parturient dui. Congue nibh nostra
            congue. Imperdiet conubia habitant conubia habitant aenean mauris etiam. Molestie vulputate hac venenatis senectus. semper. Mattis eleifend sem dictum habitasse ultricies. Lorem ipsum odor
            amet, consectetuer adipiscing elit. Nisi facilisi id volutpat. Erat fermentum nam donec sit. Luctus phasellus diam parturient dui. Congue nibh nostra congue. Imperdiet conubia habitant
            aenean mauris etiam. Molestie vulputate hac venenatis senectus. Hendrerit ultrices nisl faucibus taciti quam. Tristique volutpat mus augue inceptos ligula? Pretium praesent nisl vel at.
            Senectus pharetra maecenas integer. Ridiculus purus aliquam dapibus porta fames. Vulputate vestibulum euismod tristique sem. Enim fermentum at. Phasellus posuere accumsan nunc torquent.
            Molestie at curabitur feugiat mi nibh. Mus nulla integer montes torquent. Litora magna dui porta taciti habitant. Nullam hendrerit eleifend fames. Elementum proin semper. Mattis eleifend
            sem dictum habitasse ultricies. Lorem ipsum odor amet, consectetuer adipiscing elit. Nisi facilisi id volutpat. Erat fermentum nam donec sit. Luctus phasellus diam parturient dui. Congue
            nibh nostra congue. Imperdiet conubia habitant
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
