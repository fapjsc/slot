import { useState } from 'react';

import classes from './SubBtn.module.scss';

const SubBtn = ({ pressSlotHandler, btnList, btnStyle }) => {
  const [selectBtn, setSelectBtn] = useState('500');

  const onClickHandler = (btnNo, btnTxt) => {
    setSelectBtn(btnTxt);
    pressSlotHandler(btnNo);
  };

  const subBtnEl =
    btnList &&
    btnList.map(btn => {
      const imgObj = require(`../../../asset/v2/button/${btnStyle}/${btn.buttonTxt}.png`);
      const selectImg = require(`../../../asset/v2/button/${btnStyle}/${btn.buttonTxt}-select.png`);

      return (
        <div
          key={btn.buttonNo}
          text={btn.buttonTxt}
          className={`${classes.subBtn} ${selectBtn === btn.buttonTxt && classes.active}`}
          style={{
            backgroundImage:
              selectBtn === btn.buttonTxt ? `url(${selectImg.default})` : `url(${imgObj.default})`,
          }}
          onClick={() => onClickHandler(btn.buttonNo, btn.buttonTxt)}
        />
      );
    });

  return <div className={classes.container}>{subBtnEl}</div>;
};

export default SubBtn;
