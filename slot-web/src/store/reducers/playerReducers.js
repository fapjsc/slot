import { SET_PLAYER_INFO } from '../constants/playerConstants';

const initialState = {};

export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_INFO:
      return {
        ...state,
        ...action.playerInfo,
      };

    default:
      return state;
  }
};
