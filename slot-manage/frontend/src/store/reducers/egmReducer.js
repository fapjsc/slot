import { EGM_SET_EGM_LIST, EGM_SET_PLAYING_LIST } from '../constants/egmConstants';

const initialState = {
  egmList: [],
  playingList: [],
};
export const egmReducer = (state = initialState, action) => {
  switch (action.type) {
    case EGM_SET_EGM_LIST:
      return {
        ...state,
        egmList: action.egmList,
      };

    case EGM_SET_PLAYING_LIST:
      return {
        ...state,
        playingList: action.playingList,
      };
    default:
      return state;
  }
};
