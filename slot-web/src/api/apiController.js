import Fetch from './api';

const ApiController = () => {
  const controller = {
    playerLandingApi: async () => {
      return await Fetch.apiGet('PlayerLandingApi?pc=mike---&casino=casino_demo_1&at=1asd1rsdjaufoph29fhi2o');
    },
  };
  return controller;
};

export default ApiController;
