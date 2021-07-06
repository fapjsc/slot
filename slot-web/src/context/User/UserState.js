import { useReducer, useContext } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import { SET_API_TOKEN, SET_EGM_LIST, SET_SELECT_EGM } from '../type';

const UserState = props => {
  // Init State
  const initialState = {
    apiToken: '',
    casinoToken: '',
    credit: null,
    emgList: [],
    selectEgm: {},
  };

  // Get Http Header
  // const getHeaders = token => {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', `Bearer ${token}`);
  //   return headers;
  // };

  const setApiToken = token => {
    dispatch({ type: SET_API_TOKEN, payload: token });
  };

  const setEgmList = egmList => {
    dispatch({ type: SET_EGM_LIST, payload: egmList });
  };

  const setSelectEgm = egm => {
    console.log(egm);
    dispatch({ type: SET_SELECT_EGM, payload: egm });
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        apiToken: state.apiToken,
        casinoToken: state.casinoToken,
        credit: state.credit,
        egmList: state.egmList,
        selectEgm: state.selectEgm,

        setApiToken,
        setEgmList,
        setSelectEgm,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
