import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

import tgaLogo from '../../../asset/tga-logo.png';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(2, 4, 3),
    textAlign: 'center',
    boxShadow: theme.shadows[5],
    border: 'none',
    padding: '5rem',
    borderRadius: '10px',
    backgroundImage: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)',
    color: '#815501',
  },
  img: {
    width: '4rem',
    height: '4rem',
  },
}));

export default function TransitionsModal({ show }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(show);

  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img className={classes.img} src={tgaLogo} alt="tga logo" />
            <h2 id="transition-modal-title">遊戲載入中</h2>
            {/* <p id="transition-modal-description">react-transition-group animates me.</p> */}
            <LinearProgress />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
