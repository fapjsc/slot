import { useReducer, useContext } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import { SET_TOKEN } from '../type';

const UserState = props => {
  // Init State
  const initialState = {
    userToken: '',
    casinoToken: '',
    credit: null,
  };

  const demoFun = () => {
    alert('hi');
  };

  const setToken = token => {
    dispatch({ type: SET_TOKEN, payload: token });
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        userToken: state.userToken,
        casinoToken: state.casinoToken,
        credit: state.credit,

        demoFun,
        setToken,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
