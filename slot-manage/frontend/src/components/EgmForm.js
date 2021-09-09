// Validator
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../lib/validator';

// Components
import Input from '../components/element/Input';

// Router Props
import { useHistory } from 'react-router-dom';

// Style
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { Fragment } from 'react';

const EgmForm = props => {
  // Init State

  const { inputHandler, formState, onSubmitHandler, formIsValid } = props;

  // Router Props
  const history = useHistory();

  const cancelUpdateFormHandler = () => {
    history.replace('/egm');
  };

  return (
    <Card style={{ paddingTop: '1rem' }}>
      <Card.Body>
        <Form onSubmit={onSubmitHandler}>
          {/* 中文 */}
          {props.tw && (
            <Fragment>
              <Row className="mb-4">
                <Input
                  id="gameName"
                  element="input"
                  type="text"
                  label="遊戲中文名稱"
                  placeholder="請輸入遊戲中文名稱"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="請輸入有效的遊戲中文名稱."
                  onInput={inputHandler}
                  initialValue={formState.inputs.gameName.value}
                  initialValid={formState.inputs.gameName.isValid}
                />
              </Row>
              <Row className="my-4">
                <Input
                  id="gameDesc"
                  element="textarea"
                  label="遊戲中文描述"
                  placeholder="請輸入遊戲中文描述"
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  errorText="至少輸入五個字."
                  onInput={inputHandler}
                  initialValue={formState.inputs.gameDesc.value}
                  initialValid={formState.inputs.gameDesc.isValid}
                />
              </Row>
            </Fragment>
          )}

          {/* 英文 */}
          {props.eng && (
            <Fragment>
              <Row className="mb-4">
                <Input
                  id="gameNameEn"
                  element="input"
                  type="text"
                  label="遊戲英文名稱"
                  placeholder="請輸入英文名稱"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="請輸入有效的遊戲英文名稱."
                  onInput={inputHandler}
                  initialValue={formState.inputs.gameNameEn.value}
                  initialValid={formState.inputs.gameNameEn.isValid}
                />
              </Row>
              <Row className="my-4">
                <Input
                  id="gameDescEn"
                  element="textarea"
                  label="遊戲英文描述"
                  placeholder="請輸入遊戲英文描述"
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  errorText="至少輸入五個字."
                  onInput={inputHandler}
                  initialValue={formState.inputs.gameDescEn.value}
                  initialValid={formState.inputs.gameDescEn.isValid}
                />
              </Row>
            </Fragment>
          )}

          {/* 日文 */}
          {props.jp && (
            <Fragment>
              <Row className="mb-4">
                <Input
                  id="gameNameJp"
                  element="input"
                  type="text"
                  label="遊戲日文名稱"
                  placeholder="請輸入日文名稱"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="請輸入有效的遊戲日文名稱."
                  onInput={inputHandler}
                  initialValue={formState.inputs.gameNameJp.value}
                  initialValid={formState.inputs.gameNameJp.isValid}
                />
              </Row>
              <Row className="my-4">
                <Input
                  id="gameDescJp"
                  element="textarea"
                  label="遊戲日文描述"
                  placeholder="請輸入遊戲日文描述"
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  errorText="至少輸入五個字."
                  onInput={inputHandler}
                  initialValue={formState.inputs.gameDescJp.value}
                  initialValid={formState.inputs.gameDescJp.isValid}
                />
              </Row>
            </Fragment>
          )}

          {/* 通用 */}
          {props.general && (
            <Fragment>
              <Row className="mb-4">
                <Input
                  id="uiOrder"
                  element="input"
                  type="number"
                  label="遊戲排序"
                  placeholder="請輸入排序"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="請輸入有效排序."
                  onInput={inputHandler}
                  initialValue={formState.inputs.uiOrder.value}
                  initialValid={formState.inputs.uiOrder.isValid}
                />
              </Row>
              <Row className="my-4">
                <Input
                  id="picName"
                  element="input"
                  type="text"
                  label="圖檔檔名"
                  placeholder="請輸入圖檔檔名"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="請輸入有效檔名."
                  onInput={inputHandler}
                  initialValue={formState.inputs.picName.value}
                  initialValid={formState.inputs.picName.isValid}
                />
              </Row>
            </Fragment>
          )}

          {/* Form Actions */}
          <Row className="mt-4">
            <Form.Group as={Col} md={12} className="text-center">
              <button
                className={`mb-3 w-50 mt-3 btn btn-outline-primary ${!formIsValid && 'disabled'}`}
                type="submit"
              >
                確定
              </button>
            </Form.Group>

            <Form.Group as={Col} md={12} className="text-center">
              <Button
                variant="secondary"
                className="w-50 mt-2"
                type="button"
                onClick={cancelUpdateFormHandler}
              >
                取消
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EgmForm;
