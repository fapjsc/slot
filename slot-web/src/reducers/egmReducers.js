import {
  EGM_SET_EGM_LIST,
  EGM_SET_EGM_CONNECT_FAIL_LIST,
  EGM_SET_EGM_REMOVE_FAIL_LIST,
  EGM_SET_EGM_PLAYING_LIST,
  EGM_SET_EGM_CREDIT_LIST,
  EGM_SET_SELECT_EGM_DATA,
  EGM_SET_KICK_LIST,
} from '../constants/egmConstants';

const egmListInitState = {
  egmList: [],
  egmConnectFailList: [],
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

    case EGM_SET_EGM_CONNECT_FAIL_LIST:
      const failItem = action.egmConnectFailItem;
      const existFailItem = state.egmConnectFailList.find(el => el === failItem);

      if (existFailItem) {
        return {
          ...state,
          egmConnectFailList: state.egmConnectFailList.map(el =>
            el === existFailItem ? failItem : el
          ),
        };
      } else {
        return {
          ...state,
          egmConnectFailList: [...state.egmConnectFailList, failItem],
        };
      }

    case EGM_SET_EGM_PLAYING_LIST:
      return {
        ...state,
        egmPlayingList: action.egmPlayingList,
      };

    case EGM_SET_EGM_REMOVE_FAIL_LIST:
      return {
        ...state,
        egmConnectFailList: state.egmConnectFailList.filter(
          el => el !== action.removeFailConnectItem
        ),
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

    default:
      return state;
  }
};
