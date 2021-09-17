import { useEffect, useState } from 'react';

// Router Props
import { useLocation, useHistory, useParams } from 'react-router-dom';

// Components
import FormNav from '../components/FormNav';
import TheCard from '../components/element/TheCard';

// Layout
import FormContainer from '../layout/FormContainer';

// Redux
import { useSelector } from 'react-redux';

// Hooks
import useHttp from '../hooks/useHttp';

// Apis
import { postEgmProps } from '../lib/api';

// Style
import { Card, Button, Spinner } from 'react-bootstrap';
import { AiFillCheckCircle, AiFillExclamationCircle } from 'react-icons/ai';

const EditEgmScreen = () => {
  console.log(AiFillCheckCircle);
  // Init State
  const [isPlaying, setIsPlaying] = useState(false);

  // Router Props
  const { hash } = useLocation();
  const { configId } = useParams();
  const history = useHistory();

  // Redux
  const { egmList, playingList } = useSelector(state => state.egm);

  const identifiedEgm = egmList.find(el => String(el.configId) === configId);

  // Hooks
  const {
    data: setEgmData,
    status: setEgmStatus,
    error: setEgmErrorMessage,
    sendRequest: editEgmRequest,
  } = useHttp(postEgmProps);

  const backToHomeHandler = () => {
    history.replace('/egm');
  };

  useEffect(() => {
    if (!identifiedEgm) return;
    const playingEgm = playingList.find(el => el === identifiedEgm.mapId);
    setIsPlaying(playingEgm);
  }, [identifiedEgm, playingList]);

  useEffect(() => {
    history.replace(`/egm/edit/${configId}#tw`);
  }, [configId, history]);

  if (setEgmStatus === 'pending') {
    return (
      <Card style={CardStyle} className="flex-center">
        <Spinner className="p-4" animation="border" variant="primary" />
      </Card>
    );
  }

  if (setEgmErrorMessage) {
    return (
      <Card style={CardStyle} className="flex-center">
        <AiFillExclamationCircle style={{ fontSize: '10rem' }} className="text-danger" />
        <h2 className="text-danger my-4">{setEgmErrorMessage}</h2>
        <Button onClick={backToHomeHandler} className="w-50" variant="outline-primary">
          回首頁
        </Button>
      </Card>

      // <TheCard title={setEgmErrorMessage} action={backToHomeHandler} />
    );
  }

  if (setEgmStatus === 'completed' && setEgmData.code === 15 && !setEgmErrorMessage) {
    return (
      <Card style={CardStyle} className="flex-center">
        <AiFillCheckCircle style={{ fontSize: '10rem' }} className="text-success" />
        <h2 className="my-4">設定成功</h2>
        <Button onClick={backToHomeHandler} className="w-50" variant="outline-primary">
          確定
        </Button>
      </Card>
    );
  }

  return (
    <FormContainer>
      <FormNav
        identifiedEgm={identifiedEgm}
        editEgmRequest={editEgmRequest}
        backToHomeHandler={backToHomeHandler}
        hash={hash}
        configId={configId}
        isPlaying={isPlaying}
      />
    </FormContainer>
  );
};

const CardStyle = {
  padding: '5rem',
  maxWidth: '45rem',
  margin: '5rem auto 0 auto',
};

export default EditEgmScreen;
