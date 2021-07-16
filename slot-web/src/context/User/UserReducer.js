import { SET_API_TOKEN, SET_EGM_LIST, SET_SELECT_EGM, SET_ON_ACTION_EGM_LIST, SET_WS_CLIENT, SET_EGM_CONNECT_STATE_LIST, SET_EMG_CREDIT_STATE_LIST } from '../type';

const UserReducer = (state, action) => {
  switch (action.type) {
    case SET_EMG_CREDIT_STATE_LIST:
      const { egmCreditList } = state;
      const existingEgmItemIndex = state.egmCreditList.findIndex(item => item.map === action.payload.map);
      const existingItem = egmCreditList[existingEgmItemIndex];
      let updateItems;

      if (existingItem) {
        const updateItem = {
          ...existingItem,
        };

        updateItems = [...egmCreditList];
        updateItems[existingEgmItemIndex] = updateItem;
      } else {
        updateItems = egmCreditList.concat(action.payload);
      }
      return {
        ...state,
        egmCreditList: updateItems,
      };

    // Set Egm Connect State
    case SET_EGM_CONNECT_STATE_LIST:
      const { egmConnectList } = state;
      const existingEgmConnectIndex = egmConnectList.findIndex(item => item.map === action.payload.map);
      const existingEgmConnectItem = egmConnectList[existingEgmConnectIndex];
      let updateEgmConnectList;
      if (existingEgmConnectItem) {
        const updateItem = {
          ...existingEgmConnectItem,
        };

        updateEgmConnectList = [...egmConnectList];
        updateEgmConnectList[existingEgmConnectIndex] = updateItem;
      } else {
        updateEgmConnectList = egmConnectList.concat(action.payload);
      }

      return {
        ...state,
        egmConnectList: updateEgmConnectList,
      };

    // Set WS Client
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
