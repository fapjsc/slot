import {
  SET_API_TOKEN,
  SET_EGM_LIST,
  SET_SELECT_EGM,
  SET_ON_ACTION_EGM_LIST,
  SET_WS_CLIENT,
  SET_EGM_CONNECT_STATE_LIST,
  SET_EMG_CREDIT_STATE_LIST,
  SET_BUTTON_LIST,
  SET_LOGIN_DATA,
  SET_KICK_LIST,
  REMOVE_KICK_ITEM,
  SET_REVIEW_STATE,
  SET_LADING_URL,
  SET_POINT_LOADING,
} from '../type';

const UserReducer = (state, action) => {
  switch (action.type) {
    // Client Review State
    case SET_REVIEW_STATE:
      return {
        ...state,
        reviewState: action.payload,
      };
    // Remove Kick Item
    case REMOVE_KICK_ITEM:
      let updateRemoveKickItems = state.kickList.filter(el => el.egm !== action.payload.egm && el.token !== action.payload.token);
      return {
        ...state,
        kickList: updateRemoveKickItems,
      };

    // SET POINT LOADING
    case SET_POINT_LOADING:
      return {
        ...state,
        pointLading: action.payload,
      };

    // Set Kick List
    case SET_KICK_LIST:
      const { kickList } = state;
      const existingKickIndex = kickList.findIndex(el => el.egm === action.payload.egm);
      const existingKickItem = kickList[existingKickIndex];

      let updateKickItems;

      if (existingKickItem) {
        const updateKickItem = {
          ...existingKickItem,
        };

        updateKickItems = [...kickList];
        updateKickItems[existingKickItem] = updateKickItem;
      } else {
        updateKickItems = kickList.concat(action.payload);
      }

      return {
        ...state,
        kickList: updateKickItems,
      };

    // Login Data
    case SET_LOGIN_DATA:
      return {
        ...state,
        loginData: action.payload,
      };

    case SET_LADING_URL:
      return {
        ...state,
        loadingUrl: action.payload,
      };

    // Button List
    case SET_BUTTON_LIST:
      return {
        ...state,
        btnList: action.payload,
      };

    // Egm Credit State
    case SET_EMG_CREDIT_STATE_LIST:
      const { egmCreditList } = state;
      const existingEgmItemIndex = state.egmCreditList.findIndex(item => item.map === action.payload.map);
      const existingItem = egmCreditList[existingEgmItemIndex];
      let updateItems;

      if (existingItem) {
        const updateItem = {
          ...existingItem,
          credit: action.payload.credit,
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
