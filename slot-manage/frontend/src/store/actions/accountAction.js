import { SET_CASH_IN_FILTER, SET_CASH_OUT_FILTER } from '../constants/account';

export const setCashInCondition = cashInCondition => dispatch => {
  dispatch({ type: SET_CASH_IN_FILTER, cashIn: cashInCondition });
};

export const setCashOutCondition = cashOutCondition => dispatch => {
  dispatch({ type: SET_CASH_OUT_FILTER, cashOut: cashOutCondition });
};
