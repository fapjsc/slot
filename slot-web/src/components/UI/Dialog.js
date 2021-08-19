import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import classes from './Dialog.module.scss';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(-1),
    // color: theme.palette.grey[500],
    color: 'white',
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

// const DialogActions = withStyles(theme => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('isShow', true);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle
          style={{ backgroundColor: '#3E1C4A' }}
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>
        <DialogContent dividers className={classes.content}></DialogContent>
      </Dialog>
    </div>
  );
}
