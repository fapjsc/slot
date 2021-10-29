import store from '../store/store';
import { setEgmList, setSelectEgmData } from '../store/actions/egmActions';
import { setPlayerInfo } from '../store/actions/playerActions';

//=== Agent Api===//
export const apiUrl = 'http://220.135.67.240:8000';

//=== Casino Api ===//
export const apiCasinoUrl = 'http://220.135.67.240:8081';

// HTTP data controller
const httpDataControllerType = {
  SET_PLAYER_API_TOKEN: 'SET_PLAYER_API_TOKEN',
  SET_PLAYER_INFO: 'SET_PLAYER_INFO',
  SET_EGM_LIST: 'SET_EGM_LIST',
  SET_SELECT_EGM_DATA: 'SET_SELECT_EGM_DATA',
};

//==== Generally ====//
const getHeaders = (token = null) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${token}`);
  return headers;
};

//==== Auth ====//
// 登入
export const userLogin = async userData => {
  const headers = getHeaders();
  if (!headers) return;

  const url = `${apiCasinoUrl}/LoginApi`;

  let reqData = {
    PlayerAccount: userData.name,
    PlayerPwd: userData.password,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(reqData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Login Fail.');
  }

  if (data.code !== 1000) {
    throw new Error(data.msg || '此帳號暫時無法登入，請稍後再試');
  }

  const userInfo = {
    name: userData.name,
    supplierURL: data.supplierURL,
  };

  return userInfo;
};

// Landing
export const playerLanding = async () => {
  const pc = localStorage.getItem('player');
  const casino = localStorage.getItem('casino');
  const at = localStorage.getItem('at');

  const url = `${apiUrl}/PlayerLandingApi?pc=${pc}&casino=${casino}&at=${at}`;
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Could not fetch landing.');
  }

  if (data.code !== 1) {
    throw new Error(data.msg || 'Landing Fail');
  }

  httpDataController({
    event: httpDataControllerType.SET_PLAYER_API_TOKEN,
    apiToken: data.apiToken,
  });
  return data;
};

//==== User ====//
export const getPlayerInfo = async reqData => {
  const { apiToken, player, casino } = reqData;
  const headers = getHeaders(apiToken);
  const url = `${apiUrl}/PlayerDataApi?casino=${casino}&pc=${player}`;

  const response = await fetch(url, { headers });

  const data = await response.json();

  if (!response.ok || data.code !== 35) {
    throw new Error(data.msg || 'Could not fetch player info');
  }

  httpDataController({
    event: httpDataControllerType.SET_PLAYER_INFO,
    data: data.playerObj,
  });

  return data.playerObj;
};

export const playerFeebBack = async reqData => {
  const headers = getHeaders(reqData.apiToken);
  if (!headers) return;

  const url = `${apiUrl}/PlayEgmCommentApi`;

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(reqData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Could not send comment');
  }

  return data;
};

//==== Egm ====//
// get egm list
export const getEgmList = async reqData => {
  const { pc, casino, token } = reqData;
  const uri = `${apiUrl}/EgmApi?pc=${pc}&casino=${casino}&tk=${token}`;
  const response = await fetch(uri);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Could not fetch egm.');
  }

  if (data.code !== 17) {
    throw new Error(data.msg || 'Could not fetch egm.');
  }
  httpDataController({ ...data, event: httpDataControllerType.SET_EGM_LIST });
  return data;
};

// choose egm
export const chooseEgm = async reqData => {
  let url = `${apiUrl}/PlayerChooseEgmApi`;
  const { apiToken, mapId, egmId, egmIP } = reqData;
  const body = {
    mapId,
    egmId,
    egmIP,
  };
  const headers = getHeaders(apiToken);

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Could not choose Egm');
  }

  if (data.code !== 2) {
    throw new Error(data.msg || 'Choose Egm Fail');
  }

  httpDataController({
    ...data,
    ...body,
    event: httpDataControllerType.SET_SELECT_EGM_DATA,
    cameraIndex: String(data.cameraIndex),
    gameStream: `webrtc://220.135.67.240/game/${data.cameraIndex}`,
    // gameStream: `webrtc://220.135.67.240/game/11`,
  });
  return data;
};

//結算
export const endGame = async reqData => {
  const { cfgId, egmId, egmIP, egmSession, apiToken } = reqData;

  const headers = getHeaders(apiToken);

  if (!headers) {
    throw new Error('No headers.');
  }

  const url = `${apiUrl}/EndGameApi`;

  const body = {
    cfgId,
    egmId,
    egmIP,
    egmSession,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'something wrong.');
  }

  if (data.code !== 5) {
    throw new Error(data.msg || '結算錯誤.');
  }

  return data;
};

// get current egm
export const getCurrentEgm = async reqData => {
  const { mapId, egmId, ses: egmSession, apiToken, egmIP } = reqData;
  let url = `${apiUrl}/PlayerChooseEgmApi?mapId=${mapId}&egmId=${egmId}&ses=${egmSession}`;

  const headers = getHeaders(apiToken);

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Could not get egm data');
  }

  httpDataController({
    ...data,
    mapId,
    egmId,
    egmIP,
    egmSession,
    event: httpDataControllerType.SET_SELECT_EGM_DATA,
    cameraIndex: String(data.cameraIndex),
    gameStream: `webrtc://220.135.67.240/game/${data.cameraIndex}`,
  });

  return data;
};

// 開分
export const pointCash = async reqData => {
  const uri = `${apiUrl}/PointCashApi`;
  const { apiToken } = reqData;
  const headers = getHeaders(apiToken);
  const body = {
    cfgId: reqData.cfgId,
    egmId: reqData.egmId,
    egmIP: reqData.egmIP,
    egmSession: reqData.egmSession,
    checkSum: reqData.checkSum,
    inOrOut: 1,
    moneyPoint: reqData.moneyPoint,
  };

  const response = await fetch(uri, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Could not point');
  }

  if (data.code !== 3) {
    throw new Error(data.msg || '開分失敗');
  }

  return data;
};

// 玩遊戲
export const pressSlot = async reqData => {
  const { cfgId, egmId, egmIP, buttonNo, egmSession: EgmSession, apiToken } = reqData;
  const uri = `${apiUrl}/PressSlotApi`;
  const headers = getHeaders(apiToken);
  const response = await fetch(uri, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      cfgId,
      egmId,
      egmIP,
      buttonNo,
      EgmSession,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Could not spin');
  }

  if (data.code !== 4) {
    throw new Error(data.msg || 'spin fail');
  }

  return data;
};

//==== Http Dta Controller //====
const httpDataController = data => {
  switch (data.event) {
    case httpDataControllerType.SET_SELECT_EGM_DATA:
      store.dispatch(setSelectEgmData(data));
      localStorage.setItem('mapId', data.mapId);
      localStorage.setItem('egmId', data.egmId);
      localStorage.setItem('ses', data.egmSession);
      localStorage.setItem('egmIP', data.egmIP);
      localStorage.setItem('audioID', data.audioID);
      localStorage.setItem('cameraID', data.cameraID);
      localStorage.setItem('webNumber', data.cameraIndex);
      break;

    case httpDataControllerType.SET_EGM_LIST:
      store.dispatch(setEgmList(data.egmList));
      break;

    case httpDataControllerType.SET_PLAYER_INFO:
      const apiToken = localStorage.getItem('token');
      store.dispatch(setPlayerInfo({ ...data.data, apiToken }));
      break;

    case httpDataControllerType.SET_PLAYER_API_TOKEN:
      localStorage.setItem('token', data.apiToken);
      store.dispatch(setPlayerInfo(data));
      break;

    default:
      break;
  }
};
