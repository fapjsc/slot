import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation="border"
      variant="primary"
      role="status"
      style={{
        width: '40px',
        height: '40px',
        margin: '5rem auto',
        display: 'block',
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
