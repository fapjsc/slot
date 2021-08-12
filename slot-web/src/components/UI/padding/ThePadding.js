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
    textAlign: 'center',
    // backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    padding: '5rem',
    borderRadius: '10px',
    // backgroundImage: 'linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)',
    // backgroundImage: 'linear-gradient(-225deg, #77FFD2 0%, #6297DB 48%, #1EECFF 100%)',
    // backgroundImage: 'linear-gradient(-225deg, #65379B 0%, #886AEA 53%, #6457C6 100%)',
    backgroundImage: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)',
    color: '#815501',
  },
  img: {
    width: '4rem',
    height: '4rem',
  },
}));

export default function TransitionsModal({ show, showList }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(show);

  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (showList) handleClose();
  }, [showList]);

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
