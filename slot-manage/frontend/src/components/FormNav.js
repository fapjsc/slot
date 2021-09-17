import { useEffect, useState, Fragment } from 'react';

// Hooks
import { useForm } from '../hooks/useForm';

// Components
import EgmForm from './EgmForm';

// Style
import { Nav, Card, Button, Spinner } from 'react-bootstrap';

const FormNav = ({
  editEgmRequest,
  backToHomeHandler,
  identifiedEgm,
  hash,
  configId,
  isPlaying,
}) => {
  // Init State
  const [isLoading, setIsLoading] = useState(true);

  // Hooks
  const [formState, inputHandler, setFormData] = useForm(
    {
      gameName: { value: '', isValid: false },
      gameNameEn: { value: '', isValid: false },
      gameNameJp: { value: '', isValid: false },
      gameDesc: { value: '', isValid: false },
      gameDescEn: { value: '', isValid: false },
      gameDescJp: { value: '', isValid: false },
      uiOrder: { value: null, isValid: false },
      picName: { value: '', isValid: false },
    },
    false
  );

  useEffect(() => {
    if (identifiedEgm) {
      setFormData(
        {
          gameName: {
            value: identifiedEgm.gameName,
            isValid: true,
          },
          gameNameEn: {
            value: identifiedEgm.gameNameEn,
            isValid: true,
          },
          gameNameJp: {
            value: identifiedEgm.gameNameJp,
            isValid: true,
          },
          gameDesc: {
            value: identifiedEgm.gameDesc,
            isValid: true,
          },
          gameDescEn: {
            value: identifiedEgm.gameDescEn,
            isValid: true,
          },
          gameDescJp: {
            value: identifiedEgm.gameDescJp,
            isValid: true,
          },
          uiOrder: {
            value: identifiedEgm.uiOrder,
            isValid: true,
          },
          picName: {
            value: identifiedEgm.picName,
            isValid: true,
          },
          egmIp: {
            value: identifiedEgm.egmIp,
            isValid: true,
          },
          buttonStyle: {
            value: identifiedEgm.buttonStyle,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, identifiedEgm]);

  const onSubmitHandler = e => {
    e.preventDefault();

    if (!formState.isValid) {
      alert('Form is not valid.');
      return;
    }

    let propSetObj = {};

    for (let property in formState.inputs) {
      propSetObj = {
        ...propSetObj,
        [property]: formState.inputs[property].value,
      };
    }

    let reqData = {
      casino: identifiedEgm.casinoCode,
      localSvrPosition: identifiedEgm.localServer,
      propSetList: [propSetObj],
    };

    editEgmRequest(reqData);
  };

  if (isLoading) {
    return (
      <Card style={CardStyle} className="flex-center">
        <Spinner className="p-4" animation="border" variant="primary" />
      </Card>
    );
  }

  if (!identifiedEgm) {
    return (
      <Card style={CardStyle} className="text-center">
        <h2 className="mb-4">請重新選擇EGM</h2>
        <Button onClick={backToHomeHandler} className="mt-4 w-50 mx-auto" variant="outline-primary">
          確定
        </Button>
      </Card>
    );
  }

  return (
    <Fragment>
      <Nav variant="tabs" defaultActiveKey="tw" className="p-4 mt-4">
        <Nav.Item>
          <Nav.Link eventKey="tw" data-bs-toggle="tab" href="#tw">
            中文
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="eng" data-bs-toggle="tab" href="#eng">
            英文
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="">
          <Nav.Link eventKey="jp" data-bs-toggle="tab" href="#jp">
            日文
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="me-auto">
          <Nav.Link eventKey="general" data-bs-toggle="tab" href="#general">
            通用
          </Nav.Link>
        </Nav.Item>

        <span
          className={`flex-center badge rounded-pill ${isPlaying ? 'bg-success' : 'bg-primary'}`}
        >
          {configId}
        </span>
      </Nav>

      <section id="myTabContent" className="tab-content">
        <div className={`tab-pane fade ${hash === '#tw' && 'show active'}`} id="tw">
          <EgmForm
            inputHandler={inputHandler}
            formState={formState}
            onSubmitHandler={onSubmitHandler}
            formIsValid={formState.isValid}
            tw
          />
        </div>

        <div className={`tab-pane fade ${hash === '#eng' && 'show active'}`} id="eng">
          <EgmForm
            inputHandler={inputHandler}
            formState={formState}
            onSubmitHandler={onSubmitHandler}
            formIsValid={formState.isValid}
            eng
          />
        </div>

        <div className={`tab-pane fade ${hash === '#jp' && 'show active'}`} id="jp">
          <EgmForm
            inputHandler={inputHandler}
            formState={formState}
            onSubmitHandler={onSubmitHandler}
            formIsValid={formState.isValid}
            jp
          />
        </div>

        <div className={`tab-pane fade ${hash === '#general' && 'show active'}`} id="general">
          <EgmForm
            inputHandler={inputHandler}
            formState={formState}
            onSubmitHandler={onSubmitHandler}
            formIsValid={formState.isValid}
            general
          />
        </div>
      </section>
    </Fragment>
  );
};

const CardStyle = {
  padding: '10rem',
  marginTop: '5rem',
  maxWidth: '45rem',
};

export default FormNav;
