import { useParams } from 'react-router-dom';
import btnStyle from '../data/btnStyle';

// Style
import { Form, Row, Col, Button, Card } from 'react-bootstrap';

const EgmForm = () => {
  const { egmMapId } = useParams();

  const onSubmitHandler = e => {
    e.preventDefault();
  };

  //==== Jsx Element ====//
  const optionEl = btnStyle.map(btn => <option key={btn}>{btn}</option>);

  return (
    <Card>
      <Card.Header>
        <h3>EGM Map：{egmMapId}</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={onSubmitHandler}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>名稱</Form.Label>
              <Form.Control type="text" placeholder="機台名稱" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>語系</Form.Label>
              <select disabled className="form-select" id="langues">
                <option>中文</option>
              </select>
            </Form.Group>
          </Row>

          <Row className="mt-3">
            <Form.Group className="mb-3" controlId="egmBtn">
              <Form.Label>機台按鈕</Form.Label>
              <select className="form-select" id="egmBtn">
                {optionEl}
              </select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>描述</Form.Label>
              <Form.Control as="textarea" placeholder="機台描述" />
            </Form.Group>
          </Row>

          <Row className="mt-4">
            <Form.Group as={Col} md={12} className="text-center">
              <Button variant="secondary" className="mb-3 w-50" type="submit">
                確定
              </Button>
            </Form.Group>

            <Form.Group as={Col} md={12} className="text-center">
              <Button variant="secondary" className="w-50" type="button">
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
