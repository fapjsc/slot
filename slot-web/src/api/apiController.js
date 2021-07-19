import { apiGet, apiPost, apiPostCasino } from './api';

const ApiController = () => {
  const controller = {
    //==== Agent Api ====//
    playerLandingApi: async (pc, casino, at) => {
      return await apiGet(`PlayerLandingApi?pc=${pc}&casino=${casino}&at=${at}`);
    },

    playerChooseEgmApi: async (mapId, egmId, egmIP, token) => {
      let body = {
        mapId: mapId,
        egmId: egmId,
        egmIP: egmIP,
      };
      return await apiPost('PlayerChooseEgmApi', body, token);
    },

    // 玩遊戲
    pressSlotApi: async (cfgId, egmId, egmIP, buttonNo, token, egmSession) => {
      let body = {
        cfgId: cfgId,
        egmId: egmId,
        egmIP: egmIP,
        buttonNo: buttonNo,
        EgmSession: egmSession,
      };

      console.log(body);
      return await apiPost('PressSlotApi', body, token);
    },

    // demo version-1 棄用
    pointCashApi: async (cfgId, egmId, egmIP, moneyPoint, token) => {
      let body = {
        cfgId: cfgId,
        egmId: egmId,
        egmIP: egmIP,
        inOrOut: 1,
        moneyPoint: moneyPoint,
      };
      return await apiPost('PointCashApi', body, token);
    },

    playerLeaveApi: async (currentBalance, token) => {
      let body = {
        currentBalance: currentBalance,
      };
      return await apiPost('PlayerLeaveApi', body, token);
    },
    endGameApi: async (cfgId, egmId, egmIP, token, egmSession) => {
      console.log(cfgId, egmId, egmIP, token);
      console.log(egmSession, 'egmSession');
      let body = {
        cfgId: cfgId,
        egmId: egmId,
        egmIP: egmIP,
        egmSession,
      };
      return await apiPost('EndGameApi', body, token);
    },

    //=== Casino Api ===//
    pointCashCasinoApi: async (egmSession, checkSum, moneyPoint, casinoToken) => {
      let body = {
        EgmSession: egmSession,
        Point: Number(moneyPoint),
        CheckSum: Number(checkSum),
      };

      console.log(body, 'body');
      return await apiPostCasino('CashToEgmApi', body, casinoToken);
    },
  };
  return controller;
};

export default ApiController;
