import { EGM_SET_EGM_LIST, EGM_SET_PLAYING_LIST } from '../constants/egmConstants';

export const setEgmList = egmList => dispatch => {
  dispatch({
    type: EGM_SET_EGM_LIST,
    egmList,
  });
};

export const setPlayingList = playingList => dispatch => {
  dispatch({
    type: EGM_SET_PLAYING_LIST,
    playingList,
  });
};
