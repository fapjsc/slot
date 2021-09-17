import { Card, Button } from 'react-bootstrap';
import { AiFillCheckCircle, AiFillExclamationCircle } from 'react-icons/ai';

const TheCard = ({ icon, title, btnTxt, type, action }) => {
  return (
    <Card style={CardStyle} className="flex-center">
      <AiFillExclamationCircle style={{ fontSize: '10rem' }} className="text-danger" />
      <h2 className="text-danger my-4">{title}</h2>
      <Button onClick={action} className="w-50" variant="outline-primary">
        回首頁
      </Button>
    </Card>
  );
};

const CardStyle = {
  padding: '5rem',
  maxWidth: '45rem',
  margin: '5rem auto 0 auto',
};

export default TheCard;
