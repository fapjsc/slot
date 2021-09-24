import { SET_CASH_IN_FILTER, SET_CASH_OUT_FILTER } from '../constants/account';

const initialState = {
  cashIn: { startTime: null, endTime: null },
  cashOut: { startTime: null, endTime: null },
};

export const dateFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CASH_IN_FILTER:
      return {
        ...state,
        cashIn: {
          startTime: action.cashIn.startTime,
          endTime: action.cashIn.endTime,
        },
      };

    case SET_CASH_OUT_FILTER:
      return {
        ...state,
        cashOut: {
          startTime: action.cashOut.startTime,
          endTime: action.cashOut.endTime,
        },
      };

    default:
      return state;
  }
};
