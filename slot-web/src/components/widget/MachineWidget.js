import { useEffect, useState } from 'react';

import Drawer from 'rsuite/Drawer';

// Components
import MainBtnHolder from '../button/main/MainBtnHolder';
import SubBtnHolder from '../button/sub/SubBtnHolder';

// Api
import { pressSlot } from '../../lib/api';

// Hooks
import useHttp from '../../hooks/useHttp';

// Redux
import { useSelector } from 'react-redux';

// Utils
import { _getLocalStorageItem, _getMachineImg } from '../../utils/helper';

const MachineWidget = ({ machineName, placement, open, setOpen, height, width }) => {
  // Init State
  const [mainBtn, setMainBtn] = useState();
  const [subBtn, setSubBtn] = useState();
  const [machineImg, setMachineImg] = useState();

  const styles = {
    height: height && height,
    width: width && width,
    // backgroundImage: `url(${machineName === 'Aruze' ? aruzeImage : null})`,
    backgroundImage: `url(${machineImg})`,
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  };

  // Redux
  const { selectEgmData } = useSelector(state => state.egm);

  // Http
  const {
    // data: pressData,
    // status: pressStatus,
    // error: pressError,
    sendRequest: pressRequest,
  } = useHttp(pressSlot);

  // filter main btn and sub button
  useEffect(() => {
    if (selectEgmData && selectEgmData.btnList) {
      const { btnList } = selectEgmData;

      const main = btnList.filter(btn => btn.buttonNo > 50).sort(() => -1);
      const sub = btnList.filter(btn => btn.buttonNo < 50);

      setMainBtn(main);
      setSubBtn(sub);
    }
  }, [selectEgmData]);

  // listen machine name for get machine img
  useEffect(() => {
    if (machineName) {
      const img = _getMachineImg(machineName);
      setMachineImg(img);
    }
  }, [machineName]);

  const pressSlotHandler = buttonNo => {
    const data = _getLocalStorageItem('getCurrentEgm');
    const reqData = {
      ...data,
      egmSession: data.ses,
      cfgId: data.mapId,
      buttonNo,
    };

    pressRequest(reqData);
  };

  return (
    <>
      <Drawer
        placement={placement}
        backdropClassName="aruze-machine-backdrop"
        open={open}
        style={styles}
        //   onClose={() => setOpen(false)}
      >
        <MainBtnHolder pressSlotHandler={pressSlotHandler} mainBtnList={mainBtn} />

        <SubBtnHolder
          pressSlotHandler={pressSlotHandler}
          btnStyle={selectEgmData && selectEgmData.btnStyle}
          subBtnList={subBtn}
        />
      </Drawer>
    </>
  );
};

export default MachineWidget;
