import { SET_API_TOKEN, SET_EGM_LIST, SET_SELECT_EGM } from '../type';

const UserReducer = (state, action) => {
  switch (action.type) {
    case SET_SELECT_EGM:
      return {
        ...state,
        selectEgm: action.payload,
      };
    case SET_EGM_LIST:
      return {
        ...state,
        egmList: action.payload,
      };
    case SET_API_TOKEN:
      return {
        ...state,
        apiToken: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
