import Fetch from './api';

const ApiController = () => {
  const controller = {
    playerLandingApi: async (pc, casino, at) => {
      return await Fetch.apiGet(`PlayerLandingApi?pc=${pc}&casino=${casino}&at=${at}`);
    },
    playerChooseEgmApi: async (mapId, egmId, egmIP, token) => {
      let body = {
        mapId: mapId,
        egmId: egmId,
        egmIP: egmIP,
      };
      return await Fetch.apiPost('PlayerChooseEgmApi', body, token);
    },
    pressSlotApi: async (cfgId, egmId, egmIP, buttonNo, token) => {
      let body = {
        cfgId: cfgId,
        egmId: egmId,
        egmIP: egmIP,
        buttonNo: buttonNo,
      };
      return await Fetch.apiPost('PressSlotApi', body, token);
    },
    pointCashApi: async (cfgId, egmId, egmIP, moneyPoint, token) => {
      let body = {
        cfgId: cfgId,
        egmId: egmId,
        egmIP: egmIP,
        inOrOut: 1,
        moneyPoint: moneyPoint,
      };
      return await Fetch.apiPost('PointCashApi', body, token);
    },
    playerLeaveApi: async (currentBalance, token) => {
      let body = {
        currentBalance: currentBalance,
      };
      return await Fetch.apiPost('PlayerLeaveApi', body, token);
    },
    endGameApi: async (cfgId, egmId, egmIP, token) => {
      let body = {
        cfgId: cfgId,
        egmId: egmId,
        egmIP: egmIP,
      };
      return await Fetch.apiPost('EndGameApi', body, token);
    },
  };
  return controller;
};

export default ApiController;
