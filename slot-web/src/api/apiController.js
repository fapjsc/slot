import Fetch from './api';

const ApiController = () => {
    const controller = {
		playerLandingApi: async (pc, casino, at) => {
			return await Fetch.apiGet(`PlayerLandingApi?pc=${pc}&casino=${casino}&at=${at}`);
		},
		playerChooseEgmApi: async (mapId, egmId, egmIP, token) => {
			let body = {
				"mapId": mapId,
				"egmId": egmId,
				"egmIP": egmIP,
			};
			return await Fetch.apiPost('PlayerChooseEgmApi', body, token);
		},
		pressSlotApi: async (body) => {
			let tmp = {
				"cfgId": 0,
				"egmId": 0,
				"egmIP": "string",
				"buttonNo": 0
			};
			return await Fetch.apiPost('PressSlotApi', body);
		},
		pointCashApi: async (cfgId, egmId, egmIP, inOrOut, moneyPoint, token) => {
			let body = {
				"d": cfgId,
				"egmId": egmId,
				"egmIP": egmIP,
				"inOrOut": inOrOut,
				"moneyPoint": moneyPoint
			};
			return await Fetch.apiPost('PointCashApi', body, token);
		},
		playerLeaveApi: async (currentBalance) => {
			let body = {
				"currentBalance": currentBalance
			};
			return await Fetch.apiPost('PlayerLeaveApi', body);
		},
		endGameApi: async (body) => {
			return await Fetch.apiPost('EndGameApi', body);
		},
    }
	return controller;
}

export default ApiController;