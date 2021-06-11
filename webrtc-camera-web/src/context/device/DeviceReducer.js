import { SET_DEVICE_MAP } from '../type';

const DeviceReducer = (state, action) => {
  switch (action.type) {
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
