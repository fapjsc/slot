import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

// Actions
import { setEgmList } from '../store/actions/egmAction';

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

  const dispatch = useDispatch();

  const { data: egmData, status, error, sendRequest: getEgmList } = useHttp(getEgmProps);

  const onClickHandler = egmMapId => {
    history.push(`/egm/edit/${egmMapId}`);
  };

  useEffect(() => {
    getEgmList();
  }, [getEgmList]);

  return (
    <div>
      <h3>EGM Status</h3>

      {status === 'pending' && (
        <Center>
          <Spinner animation="border" />
        </Center>
      )}

      {status === 'completed' && error && (
        <Center>
          <Alert style={{ width: '50%' }} variant="danger">
            {error}
          </Alert>
        </Center>
      )}

      {status === 'completed' && !error && (
        <Card style={{ padding: '2rem' }}>
          {egmData.propConfigList.length > 0 ? (
            <EgmList egmList={egmData.propConfigList} onClickHandler={onClickHandler} />
          ) : (
            <Center>
              <p>Not found, please check local Server ip.</p>
            </Center>
          )}
        </Card>
      )}
    </div>
  );
};

export default EgmScreen;
