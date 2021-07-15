import { useReducer } from 'react';
import DeviceReducer from './DeviceReducer';
import DeviceContext from './DeviceContext';
import { SET_DEVICE_MAP, SET_EGM_LIST, DEVICE_IS_CHANGE, SET_IS_LOADING } from '../type';

const DeviceState = props => {
  // Init State
  const initialState = {
    deviceMap: [],
    egmList: [],
    deviceIsChange: false,
    isLoading: false,
  };

  // Get Http Header
  const getHeaders = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  };

  // Get Egm List
  const getEgmList = async localServer => {
    setIsLoading(true);
    const headers = getHeaders();
    const apiUrl = `${process.env.REACT_APP_MAIN_AGENT}//CameraConfigApi?localSvr=${localServer}`;

    if (!headers || !apiUrl) {
      setIsLoading(false);
      console.error('獲取egm list時沒有headers或apiUrl錯誤');
      return;
    }

    try {
      const res = await fetch(apiUrl, {
        headers,
      });
      const resData = await res.json();

      console.log(resData);
      // console.log(resData.mapItems);
      if (resData.code === 13) setEgmList(resData.mapItems);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Post Egm
  const postEgmList = async newMap => {
    const headers = getHeaders();
    const apiUrl = `${process.env.REACT_APP_MAIN_AGENT}//CameraConfigApi`;

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
      if (resData.code === 8) getEgmList(process.env.REACT_APP_AGENT_SERVER);
      setDeviceIsChange(true);
      // console.log(resData.mapItems);
    } catch (error) {
      console.log(error);
    }
  };

  // Set Egm List
  const setEgmList = egmList => {
    dispatch({ type: SET_EGM_LIST, payload: egmList });
  };

  // Set Device Map
  const setDeviceMap = deviceObj => {
    dispatch({ type: SET_DEVICE_MAP, payload: deviceObj });
  };

  // Device Is Change
  const setDeviceIsChange = value => {
    dispatch({ type: DEVICE_IS_CHANGE, payload: value });
  };

  // Set Loading State
  const setIsLoading = value => {
    dispatch({ type: SET_IS_LOADING, payload: value });
  };

  const [state, dispatch] = useReducer(DeviceReducer, initialState);

  return (
    <DeviceContext.Provider
      value={{
        deviceMap: state.deviceMap,
        egmList: state.egmList,
        deviceIsChange: state.deviceIsChange,
        isLoading: state.isLoading,

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
