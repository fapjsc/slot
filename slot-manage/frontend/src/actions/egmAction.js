export const setEgmList = egmList => async dispatch => {
  dispatch({
    type: 'SET_EGM_LIST',
    payload: egmList,
  });
};
