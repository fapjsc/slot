import { useEffect } from 'react';
import Drawer from 'rsuite/Drawer';

import aruzeImage from '../../asset/v2/aruzeMachine.jpg';

import BtnHolder from '../button/BtnHolder';

// Api
import { pressSlot } from '../../lib/api';

// Hooks
import useHttp from '../../hooks/useHttp';

const MachineWidget = ({ machineName, placement, open, setOpen, height, width }) => {
  const styles = {
    height: height && height,
    width: width && width,
    backgroundImage: `url(${machineName === 'Aruze' ? aruzeImage : aruzeImage})`,
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  };

  const {
    // data: pressData,
    // status: pressStatus,
    // error: pressError,
    sendRequest: pressRequest,
  } = useHttp(pressSlot);

  return (
    <Drawer
      placement={placement}
      backdropClassName="aruze-machine-backdrop"
      open={open}
      style={styles}
      //   onClose={() => setOpen(false)}
    >
      <BtnHolder pressRequest={pressRequest} />
    </Drawer>
  );
};

export default MachineWidget;
