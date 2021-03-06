import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import EgmList from '../components/EgmList';

// Hooks
import useHttp from '../hooks/useHttp';

// Api
import { getEgmProps } from '../lib/api';

// Style
import { Card, Spinner, Alert } from 'react-bootstrap';

// Layout
import Center from '../layout/Center';

const EgmScreen = () => {
  // Router Props
  const history = useHistory();

  const { data: egmData, status, error, sendRequest: getEgmList } = useHttp(getEgmProps);

  const onClickHandler = egmMapId => {
    history.push(`/egm/edit/${egmMapId}`);
  };

  useEffect(() => {
    getEgmList();
  }, [getEgmList]);

  return (
    <div style={{ marginTop: '2rem' }}>
      {status === 'pending' && (
        <Center>
          <Spinner animation="border" />
        </Center>
      )}

      {error && (
        <Center>
          <Alert className="w-50 p-4 fs-2" variant="danger">
            {error}
          </Alert>
        </Center>
      )}

      {status === 'completed' && !error && egmData.propConfigList.length > 0 && (
        <Card style={{ padding: '2rem' }}>
          <EgmList egmList={egmData.propConfigList} onClickHandler={onClickHandler} />
        </Card>
      )}

      {status === 'completed' && !error && egmData.propConfigList.length === 0 && (
        <Center>
          <p>Not found, please check local Server ip.</p>
        </Center>
      )}
    </div>
  );
};

export default EgmScreen;
