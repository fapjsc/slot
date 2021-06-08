import { useReducer, useContext } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import { SET_API_TOKEN } from '../type';

const UserState = props => {
  // Init State
  const initialState = {
    apiToken: '',
    casinoToken: '',
    credit: null,
  };

  const setApiToken = token => {
    dispatch({ type: SET_API_TOKEN, payload: token });
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        apiToken: state.apiToken,
        casinoToken: state.casinoToken,
        credit: state.credit,

        setApiToken,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
