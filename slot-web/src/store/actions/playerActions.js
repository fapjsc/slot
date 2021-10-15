import { SET_PLAYER_INFO } from '../constants/playerConstants';

export const setPlayerInfo = playerInfo => {
  return {
    type: SET_PLAYER_INFO,
    playerInfo,
  };
};
