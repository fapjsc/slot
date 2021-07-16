import { SET_API_TOKEN, SET_EGM_LIST, SET_SELECT_EGM, SET_ON_ACTION_EGM_LIST, SET_WS_CLIENT, SET_EGM_CONNECT_STATE_LIST, SET_EMG_CREDIT_STATE_LIST } from '../type';

const UserReducer = (state, action) => {
  switch (action.type) {
    case SET_EMG_CREDIT_STATE_LIST:
      // const existingEgmItemIndex = state.egmCreditList.findIndex(item => item.map === action.payload.map);
      // const existingItem = state.egmConnectList[existingEgmItemIndex];
      // console.log(existingItem);
      return {
        ...state,
      };

    case SET_EGM_CONNECT_STATE_LIST:
      return {
        ...state,
        egmConnectList: action.payload,
      };
    case SET_WS_CLIENT:
      return {
        ...state,
        wsClient: action.payload,
      };
    case SET_ON_ACTION_EGM_LIST:
      return {
        ...state,
        onActionEgmList: action.payload,
      };
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
