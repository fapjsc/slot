import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import IconButton from '@material-ui/core/IconButton';

// Style
import classes from './Review.module.scss';

// Context
import UserContext from '../../context/User/UserContext';

const Review = ({ machine, leave, userReview, selectEgm, token }) => {
  //   const [open, setOpen] = React.useState(false);

  const userContext = useContext(UserContext);
  const { setReviewState, reviewState } = userContext;

  const [reviewType, setReviewType] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleClose = () => {
    setReviewState(false);
    leave();
  };

  const handleReviewType = type => {
    setReviewType(type);
  };

  const handleReviewText = e => {
    setReviewText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      egmSession: selectEgm.egmSession,
      isLike: reviewType === 'like' ? true : false,
      comment: reviewText,
      mapId: selectEgm.mapId,
      egmId: selectEgm.egmId,
      egmIP: selectEgm.egmIP,
    };
    setReviewState(false);
    leave();
    userReview(token, data);
  };

  return (
    <form>
      <Dialog open={reviewState} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">您對這次的遊戲體驗如何？</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.contextBox}>
            <div className={classes.iconBox}>
              <IconButton aria-label="add to favorites" onClick={() => handleReviewType('like')}>
                <ThumbUpAltIcon color={reviewType === 'like' ? 'primary' : 'black'} />
              </IconButton>
            </div>
            <div className={classes.iconBox}>
              <IconButton aria-label="add to favorites" onClick={() => handleReviewType('unLike')}>
                <ThumbDownAltIcon color={reviewType === 'unLike' ? 'primary' : 'black'} />
              </IconButton>
            </div>
          </DialogContentText>

          <TextField
            value={reviewText}
            onChange={handleReviewText}
            fullWidth
            id="outlined-textarea"
            label="建議"
            multiline
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            送出
          </Button>
          <Button onClick={handleClose} color="primary">
            下次再填寫
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default Review;
