import { useReducer, useContext } from 'react';
import DeviceReducer from './DeviceReducer';
import DeviceContext from './DeviceContext';
import { SET_DEVICE_MAP } from '../type';

const DeviceState = props => {
  // Init State
  const initialState = {
    deviceMap: [],
  };

  const setDeviceMap = deviceObj => {
    dispatch({ type: SET_DEVICE_MAP, payload: deviceObj });
  };

  const [state, dispatch] = useReducer(DeviceReducer, initialState);

  return (
    <DeviceContext.Provider
      value={{
        deviceMap: state.deviceMap,
        setDeviceMap,
      }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
};

export default DeviceState;
