import { useReducer, useContext } from 'react';
import DeviceReducer from './DeviceReducer';
import DeviceContext from './DeviceContext';
import { SET_DEVICE_MAP, SET_EGM_LIST, DEVICE_IS_CHANGE } from '../type';

const DeviceState = props => {
  // Init State
  const initialState = {
    deviceMap: [],
    egmList: [],
    deviceIsChange: false,
  };

  // Get Http Header
  const getHeaders = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  };

  // Get Egm List
  const getEgmList = async localServer => {
    const headers = getHeaders();
    const apiUrl = `http://220.135.67.240:8000//CameraConfigApi?localSvr=${localServer}`;

    try {
      const res = await fetch(apiUrl, {
        headers,
      });
      const resData = await res.json();

      console.log(resData);
      // console.log(resData.mapItems);
      if (resData.code === 13) setEgmList(resData.mapItems);
    } catch (error) {
      console.log(error);
    }
  };

  // Post Egm
  const postEgmList = async newMap => {
    const headers = getHeaders();
    const apiUrl = `http://220.135.67.240:8000//CameraConfigApi`;

    console.log(newMap);

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          casino: 'casino_demo_1',
          localSvrPosition: '192.168.10.60',
          egmCameraItems: newMap,
        }),
      });
      const resData = await res.json();
      console.log(resData);
      setDeviceIsChange(true);
      // console.log(resData.mapItems);
    } catch (error) {
      console.log(error);
    }
  };

  // // Set Egm List
  const setEgmList = egmList => {
    dispatch({ type: SET_EGM_LIST, payload: egmList });
  };

  const setDeviceMap = deviceObj => {
    dispatch({ type: SET_DEVICE_MAP, payload: deviceObj });
  };

  const setDeviceIsChange = value => {
    dispatch({ type: DEVICE_IS_CHANGE, payload: value });
  };

  const [state, dispatch] = useReducer(DeviceReducer, initialState);

  return (
    <DeviceContext.Provider
      value={{
        deviceMap: state.deviceMap,
        egmList: state.egmList,
        deviceIsChange: state.deviceIsChange,

        setDeviceIsChange,
        setDeviceMap,
        getEgmList,
        postEgmList,
      }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
};

export default DeviceState;
