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

const egmListInitState = {
  egmList: [],
  egmConnectSuccessList: [],
  egmPlayingList: [],
  egmCreditList: [],
  selectEgmData: {},
  kickList: [],
};

export const egmListReducers = (state = egmListInitState, action) => {
  switch (action.type) {
    case EGM_SET_EGM_LIST:
      return {
        ...state,
        egmList: action.egmList,
      };

    case EGM_SET_EGM_CONNECT_SUCCESS_LIST:
      return {
        ...state,
        egmConnectSuccessList: [...action.egmConnectSuccessList],
      };

    case EGM_SET_EGM_CONNECT_REMOVE_SUCCESS_LIST:
      return {
        ...state,
        egmConnectSuccessList: state.egmConnectSuccessList.filter(egm => egm !== action.removeEgm),
      };

    case EGM_SET_EGM_PLAYING_LIST:
      return {
        ...state,
        egmPlayingList: action.egmPlayingList,
      };

    case EGM_SET_EGM_CREDIT_LIST:
      const creditItem = action.egmCreditItem;
      const existsCreditItem = state.egmCreditList.find(el => el.map === creditItem.map);

      if (existsCreditItem) {
        return {
          ...state,
          egmCreditList: state.egmCreditList.map(el =>
            el.map === creditItem.map ? creditItem : el
          ),
        };
      } else {
        return {
          ...state,
          egmCreditList: [...state.egmCreditList, creditItem],
        };
      }

    case EGM_SET_SELECT_EGM_DATA:
      return {
        ...state,
        selectEgmData: action.selectEgm,
      };

    case EGM_SET_KICK_LIST:
      const kickItem = action.egmKickItem;
      const existsKickItem = state.kickList.find(el => el.egm === kickItem.egm);

      if (existsKickItem) {
        return {
          ...state,
          kickList: state.kickList.map(el => (el.egm === kickItem.egm ? kickItem : el)),
        };
      } else {
        return {
          ...state,
          kickList: [...state.kickList, kickItem],
        };
      }

    case EGM_REMOVE_IS_PLAYING:
      const existsPlayingItem = state.egmPlayingList.find(
        el => Number(el.map) === action.playingItem
      );

      if (existsPlayingItem) {
        const newPlayingItem = { ...existsPlayingItem, state: 'False', userToken: 'null' };
        return {
          ...state,
          egmPlayingList: state.egmPlayingList.map(el =>
            Number(el.map) === action.playingItem ? newPlayingItem : el
          ),
        };
      } else {
        return {
          ...state,
        };
      }

    default:
      return state;
  }
};
