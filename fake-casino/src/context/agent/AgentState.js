import { useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import AgentReducer from './AgentReducer';
import AgentContext from './AgentContext';

import {} from '../type';

const AgentState = props => {
  const history = useHistory();

  const initialState = {
    test: 'test',
  };

  const [state, dispatch] = useReducer(AgentReducer, initialState);

  return (
    <AgentContext.Provider
      value={{
        test: state.test,
      }}
    >
      {props.children}
    </AgentContext.Provider>
  );
};

export default AgentState;
