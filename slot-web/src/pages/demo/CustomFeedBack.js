import { useState } from 'react';

// Utils
import { _getLocalStorageItem } from '../../utils/helper';

import { Modal, Button, Input, Divider } from 'rsuite';
import { RiThumbUpFill, RiThumbDownFill, RiCloseCircleLine } from 'react-icons/ri';

const CustomFeedBack = ({
  open,
  handleClose,
  selectEgm,
  sendPlayerFeedBackRequest,
  endGameRequest,
}) => {
  const [reviewType, setReviewType] = useState('');
  const [reviewText, setReviewText] = useState('');

  const onSubmitFeedBackHandler = e => {
    e.preventDefault();
    if (reviewType === '' || reviewText === '') {
      // TODO
      // Handle Error
      return;
    }

    const data = {
      egmSession: selectEgm.egmSession,
      isLike: reviewType === 'like' ? true : false,
      comment: reviewText,
      mapId: selectEgm.mapId,
      egmId: selectEgm.egmId,
      egmIP: selectEgm.egmIP,
      apiToken: localStorage.getItem('token'),
    };

    sendPlayerFeedBackRequest(data);
    handleClose();
  };

  const onSubmitEndGame = e => {
    e.preventDefault();
    const endGameReqData = _getLocalStorageItem('endGame');
    endGameRequest(endGameReqData);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      dialogClassName="custom-feedBack"
      style={{ width: window.innerWidth }}
    >
      <Modal.Header closeButton={true} style={header}>
        您對這次的遊戲體驗如何？
      </Modal.Header>

      <Divider />

      <Modal.Body>
        <div style={iconBox}>
          <RiThumbUpFill
            color={reviewType === 'like' ? 'blue' : '#575757'}
            style={icon}
            onClick={() => setReviewType('like')}
          />
          <RiThumbDownFill
            color={reviewType === 'unLike' ? 'blue' : '#575757'}
            style={icon}
            onClick={() => setReviewType('unLike')}
          />
        </div>
        <Input
          as="textarea"
          rows={3}
          placeholder="建議..."
          value={reviewText}
          onChange={e => setReviewText(e.trim())}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onSubmitFeedBackHandler} appearance="primary">
          Ok
        </Button>
        <Button onClick={onSubmitEndGame} appearance="subtle">
          下次再寫
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const header = {
  fontSize: '1rem',
  display: 'flex',
  justifyContent: 'flex-start',
};

const iconBox = {
  fontSize: '1.5rem',
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '1.2rem',
};

const icon = {
  transition: 'all .2s',
  cursor: 'pointer',
};

export default CustomFeedBack;
