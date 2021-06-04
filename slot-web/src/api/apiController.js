import Fetch from './api';

const ApiController = () => {
    const controller = {
		playerLandingApi: async () => {
			return await Fetch.apiGet('PlayerLandingApi?pc=DinoTesting&casino=casino_demo_1&at=1asd1rsdjaufoph29fhi2o');
		},
		playerChooseEgmApi: async (body) => {
			return await Fetch.apiPost('PlayerChooseEgmApi', body);
		},
    }
	return controller;
}

export default ApiController;