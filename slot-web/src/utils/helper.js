// localStorage
export const _remoteLocalStorageItem = type => {
  if (type === 'endGame') {
    localStorage.removeItem('mapId');
    localStorage.removeItem('egmId');
    localStorage.removeItem('ses');
    localStorage.removeItem('egmIP');
    localStorage.removeItem('audioID');
    localStorage.removeItem('cameraID');
    localStorage.removeItem('webNumber');
  }
};

export const _getLocalStorageItem = type => {
  if (type === 'getPlayerInfo') {
    const data = {
      player: localStorage.getItem('player'),
      apiToken: localStorage.getItem('token'),
      casino: localStorage.getItem('casino'),
    };

    return data;
  }

  if (type === 'getCurrentEgm') {
    const data = {
      mapId: Number(localStorage.getItem('mapId')),
      egmId: Number(localStorage.getItem('egmId')),
      egmIP: localStorage.getItem('egmIP'),
      ses: localStorage.getItem('ses'),
      apiToken: localStorage.getItem('token'),
    };

    return data;
  }

  if (type === 'endGame') {
    const data = {
      cfgId: Number(localStorage.getItem('mapId')),
      egmId: Number(localStorage.getItem('egmId')),
      egmIP: localStorage.getItem('egmIP'),
      egmSession: localStorage.getItem('ses'),
      apiToken: localStorage.getItem('token'),
    };

    return data;
  }
};

//==== Button Helper ====//

export const _setSubBtnAndMainBtn = btnList => {
  if (!btnList || (btnList && btnList.length === 0)) return;
  let mainBtnTemp = [];
  let subBtnTemp = [];

  btnList.forEach(btn => {
    // 99 => MAX, 77 => Spin, 55 => Take
    if (btn.buttonNo === 77 || btn.buttonNo === 99 || btn.buttonNo === 55) {
      mainBtnTemp.push(btn);
    } else {
      subBtnTemp.push(btn);
    }
  });

  return [mainBtnTemp, subBtnTemp];
};

export const _getButtonImg = (btnStyle, btnList, type) => {
  // webPack api 獲取放圖片資料夾的上下文，遞歸尋找符合的圖片
  let imgContext;
  let imgPath; //符合搜尋條件資料夾裡面所有的圖片
  let newPathArr = []; // 重新排序,並按照index設定給哪張image

  newPathArr.length = btnList.length;

  //過濾符合props給的btnStyle
  if (type === 'subBtn') {
    imgContext = require.context('../asset/v2/button', true, /\.jpg|.png/);
    imgPath = imgContext.keys().filter(path => path.split('/')[1] === btnStyle);
    imgPath.forEach(el => {
      let str = el.split('/')[2].split('.')[0].toLowerCase();
      let btnIndex = btnList.findIndex(btn => btn.buttonTxt.toLowerCase() === str);
      newPathArr[btnIndex] = el;
    });
    console.log(newPathArr, 'sub');
  } else {
    imgContext = require.context('../asset/v2/button/main', true, /\.jpg|.png/);
    newPathArr = imgContext.keys();
    console.log(newPathArr, 'main');
  }

  // // 轉成 es6 import obj
  const images = newPathArr.map(path => imgContext(path));

  let arr = [];
  arr.length = btnList.length;
  images.forEach((el, index) => {
    arr[index] = el.default;
  });

  // // // react 可以用的src obj
  return arr;
};

//==== Array Helper ====//
export const _removeDuplicateItem = arr => {
  return Array.from(new Set(arr));
};
