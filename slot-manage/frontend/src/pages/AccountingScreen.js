import AccountReport from '../components/account/AccountReport';

import TimePicker from '../components/account/TimePicker';
import { Card } from 'react-bootstrap';

const AccountingScreen = () => {
  return (
    <Card style={{ padding: '3rem' }} className="mt-4">
      <TimePicker />
      <AccountReport />
    </Card>
  );
};

export default AccountingScreen;
