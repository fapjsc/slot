import { useEffect, useState } from 'react';

// Components
import MainBtn from './MainBtn';

// Redux
import { useSelector } from 'react-redux';

// Utils
import { _getLocalStorageItem } from '../../utils/helper';

// Styles
import classes from './BtnHolder.module.scss';

const BtnHolder = ({ pressRequest }) => {
  const [btnList, setBtnList] = useState();

  // Redux
  const { selectEgmData } = useSelector(state => state.egm);

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

  useEffect(() => {
    if (selectEgmData && selectEgmData.btnList) {
      const { btnList } = selectEgmData;
      const filterBtn = btnList
        .filter(btn => btn.buttonTxt === 'MAX' || btn.buttonTxt === 'SPIN')
        .sort(btn => -1);

      setBtnList(filterBtn);
    }
  }, [selectEgmData]);

  // Main Button
  const mainBtn =
    btnList &&
    btnList.map(btn => (
      <MainBtn
        key={btn.buttonNo}
        type={btn.buttonTxt}
        clickFn={() => pressSlotHandler(btn.buttonNo)}
      />
    ));

  return (
    <div className={classes.container}>
      <MainBtn type="AUTO" />
      {/* <MainBtn type="MAX" />
      <MainBtn type="SPIN" /> */}
      {mainBtn}
    </div>
  );
};

export default BtnHolder;
