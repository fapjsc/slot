import {
  EGM_SET_EGM_LIST,
  EGM_SET_EGM_PLAYING_LIST,
  EGM_SET_EGM_CREDIT_LIST,
  EGM_SET_SELECT_EGM_DATA,
  EGM_SET_KICK_LIST,
  EGM_REMOVE_IS_PLAYING,
  EGM_SET_EGM_CONNECT_SUCCESS_LIST,
  EGM_SET_EGM_CONNECT_REMOVE_SUCCESS_LIST,
} from '../constants/egmConstants';

export const setEgmList = egmList => dispatch => {
  dispatch({
    type: EGM_SET_EGM_LIST,
    egmList,
  });
};

export const setEgmConnectSuccessList = egmConnectSuccessList => dispatch => {
  dispatch({ type: EGM_SET_EGM_CONNECT_SUCCESS_LIST, egmConnectSuccessList });
};

export const removeEgmConnectSuccessList = removeEgm => dispatch => {
  dispatch({ type: EGM_SET_EGM_CONNECT_REMOVE_SUCCESS_LIST, removeEgm });
};

export const setEgmPlayingList = egmPlayingList => dispatch => {
  dispatch({
    type: EGM_SET_EGM_PLAYING_LIST,
    egmPlayingList,
  });
};

export const setEgmCreditList = egmCreditItem => dispatch => {
  dispatch({
    type: EGM_SET_EGM_CREDIT_LIST,
    egmCreditItem,
  });
};

export const setSelectEgmData = selectEgm => dispatch => {
  dispatch({
    type: EGM_SET_SELECT_EGM_DATA,
    selectEgm,
  });
};

export const setKickList = egmKickItem => dispatch => {
  dispatch({
    type: EGM_SET_KICK_LIST,
    egmKickItem,
  });
};

export const removeIsPlaying = playingItem => dispatch => {
  dispatch({
    type: EGM_REMOVE_IS_PLAYING,
    playingItem,
  });
};
