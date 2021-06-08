import { SET_API_TOKEN } from '../type';

const UserReducer = (state, action) => {
  switch (action.type) {
    case SET_API_TOKEN:
      return {
        ...state,
        apiToken: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
