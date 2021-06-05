import { SET_TOKEN } from '../type';

const UserReducer = (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
