import { SET_DEVICE_MAP, SET_EGM_LIST, DEVICE_IS_CHANGE, SET_IS_LOADING } from '../type';

const DeviceReducer = (state, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case DEVICE_IS_CHANGE:
      return {
        ...state,
        deviceIsChange: action.payload,
      };
    case SET_EGM_LIST:
      console.log(action.payload);
      return {
        ...state,
        egmList: action.payload,
      };
    case SET_DEVICE_MAP:
      return {
        ...state,
        deviceMap: [...state.deviceMap, action.payload],
      };
    default:
      return state;
  }
};

export default DeviceReducer;
