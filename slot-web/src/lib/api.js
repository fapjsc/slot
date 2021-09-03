import store from '../store';
import { setEgmList, setSelectEgmData } from '../actions/egmActions';

//=== Agent Api===//
export const apiUrl = 'http://220.135.67.240:8000/';

//=== Casino Api ===//
export const apiCasinoUrl = 'http://220.135.67.240:8081/';

// HTTP data controller
const httpDataControllerType = {
  SET_EGM_LIST: 'SET_EGM_LIST',
  SET_SELECT_EGM_DATA: 'SET_SELECT_EGM_DATA',
};

const getHeaders = (token = null) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${token}`);
  return headers;
};

// get egm list
export const getEgmList = async reqData => {
  const { pc, casino, token } = reqData;
  const uri = `${apiUrl}EgmApi?pc=${pc}&casino=${casino}&tk=${token}`;
  const response = await fetch(uri);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch egm.');
  }

  if (data.code !== 17) {
    throw new Error(data.msg || 'Could not fetch egm.');
  }
  httpDataController({ ...data, event: httpDataControllerType.SET_EGM_LIST });
  return data;
};

// choose egm
export const chooseEgm = async reqData => {
  let url = `${apiUrl}PlayerChooseEgmApi`;
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
  });
  return data;
};

// get current egm
export const getCurrentEgm = async reqData => {
  const { mapId, egmId, ses: egmSession, apiToken, egmIP } = reqData;
  let url = `${apiUrl}PlayerChooseEgmApi?mapId=${mapId}&egmId=${egmId}&ses=${egmSession}`;

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

// 投幣
export const pressSlot = async reqData => {
  const { cfgId, egmId, egmIP, buttonNo, egmSession: EgmSession, apiToken } = reqData;
  const uri = `${apiUrl}PressSlotApi`;
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

    default:
      break;
  }
};
