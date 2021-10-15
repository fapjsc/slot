import { useEffect, useState } from 'react';

// Hooks
import useHttp from '../../hooks/useHttp';

// Api
import { pressSlot } from '../../lib/api';

// Utils
import { _getLocalStorageItem, _getButtonImg, _setSubBtnAndMainBtn } from '../../utils/helper';

// Style
import classes from './ButtonWidget.module.scss';
import { Drawer } from 'rsuite';

const ButtonWidget = ({ placement, open, setOpen, height, width, btnList, btnStyle }) => {
  const [subBtn, setSubBtn] = useState([]);
  const [mainBtn, setMainBtn] = useState([]);
  const [subBtnImg, setSubBtnImg] = useState(null);
  const [mainBtnImg, setMainBtnImg] = useState(null);

  const {
    // data: pressData,
    // status: pressStatus,
    // error: pressError,
    sendRequest: pressRequest,
  } = useHttp(pressSlot);

  // 點擊按鈕
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

  // Main and Sub Button Setup
  useEffect(() => {
    if (!btnList || (btnList && btnList.length === 0)) return;
    const [mainBtnTemp, subBtnTemp] = _setSubBtnAndMainBtn(btnList);
    setMainBtn(mainBtnTemp);
    setSubBtn(subBtnTemp);
  }, [btnList]);

  // Use Btn Style Get Img
  useEffect(() => {
    if (!btnStyle || !subBtn.length) return;
    const imgGroup = _getButtonImg(btnStyle, subBtn, 'subBtn');
    setSubBtnImg(imgGroup);
  }, [btnStyle, subBtn]);

  useEffect(() => {
    if (!btnStyle || !mainBtn.length) return;
    const imgGroup = _getButtonImg(btnStyle, mainBtn, 'mainBtn');
    setMainBtnImg(imgGroup);
  }, [btnStyle, mainBtn]);

  // Sub Button
  const subBtnEl =
    subBtn &&
    subBtnImg &&
    subBtn.map((btn, index) => (
      <button key={btn.buttonNo} onClick={() => pressSlotHandler(btn.buttonNo)}>
        <img
          src={subBtnImg[index] ? subBtnImg[index] : null}
          alt="button"
          style={{ width: '100%', height: '100%' }}
        />
      </button>
    ));

  // Main Button
  const mainBtnEl =
    mainBtn &&
    mainBtnImg &&
    mainBtn.map((btn, index) => (
      <button key={btn.buttonNo} onClick={() => pressSlotHandler(btn.buttonNo)}>
        {btn.buttonTxt}
      </button>
    ));

  return (
    <Drawer
      style={{
        height: height,
        width: width ? width : '100%',
      }}
      backdropClassName={classes.btnBackdrop}
      placement={placement}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Drawer.Body style={drawerBody}>
        <div style={manBtnBox}>{mainBtnEl}</div>
        <div style={subBtnBox}>{subBtnEl}</div>
      </Drawer.Body>
    </Drawer>
  );
};

const drawerBody = {
  padding: 12,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  backgroundColor: '#ddd',
};

const subBtnBox = {
  display: 'flex',
  width: '100%',
  height: '30%',
};

const manBtnBox = {
  display: 'flex',
  width: '100%',
  height: '30%',
};

export default ButtonWidget;
