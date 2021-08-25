import { useEffect, useState, useCallback } from 'react';

import classes from './ButtonGroup.module.scss';

const ButtonGroup = ({ subBtn, btnStyle, spin, LandscapeMode, isOrientationVertical }) => {
  console.log(btnStyle);

  const [imgObj, setImgObj] = useState([]);

  const getImg = useCallback(() => {
    // webPack api 獲取放圖片資料夾的上下文，遞歸尋找符合jpg的圖片

    // const imgContext = require.context('../../asset/button/', true, /\.jpg$/);
    const imgContext = require.context('../../asset/button/', true, /\.jpg|.png/);

    // 過濾符合props給的btnStyle
    // imgPath => btnStyle 資料夾裡面所有的圖檔
    const imgPath = imgContext.keys().filter(path => path.split('/')[1] === btnStyle);
    console.log(imgPath);

    // newPathArr => 重新排序
    let newPathArr = [];

    newPathArr.length = subBtn.length;

    imgPath.forEach(el => {
      let str = el.split('/')[2].split('.')[0].toLowerCase();
      let btnIndex = subBtn.findIndex(btn => btn.buttonTxt.toLowerCase() === str);
      newPathArr[btnIndex] = el;
    });

    // 轉成 es6 import obj
    const images = newPathArr.map(path => imgContext(path));

    let arr = [];
    arr.length = subBtn.length;
    images.forEach((el, index) => {
      arr[index] = el.default;
    });

    // return react 可以用的src obj
    setImgObj(arr);
  }, [btnStyle, subBtn]);

  useEffect(() => {
    getImg();
  }, [getImg, LandscapeMode]);

  return (
    <div
      className={
        LandscapeMode && !isOrientationVertical
          ? classes.buttonGroupLandscape
          : isOrientationVertical && LandscapeMode
          ? classes.buttonGroupIsOrientationVertical
          : classes.buttonGroup
      }
    >
      {subBtn.map((btn, index) => {
        return (
          <div
            key={btn.buttonTxt}
            className={
              !isOrientationVertical && LandscapeMode
                ? classes.btnBoxLandscape
                : isOrientationVertical && LandscapeMode
                ? classes.buttonBoxIsOrientationVertical
                : classes.btnBox
            }
          >
            <button
              onClick={() => spin(btn.buttonNo)}
              className={
                !isOrientationVertical && LandscapeMode
                  ? classes.buttonLandscape
                  : isOrientationVertical && LandscapeMode
                  ? classes.buttonIsOrientationVertical
                  : classes.button
              }
            >
              <img
                src={imgObj[index] ? imgObj[index] : null}
                alt="button"
                style={{ width: '100%', height: '100%' }}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
