import { SET_NEW_MESSAGE_TO_LIST } from '../constants/chatConstants';

const initialState = {
  messageList: [],
};

export const chatReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_MESSAGE_TO_LIST:
      return {
        ...state,
        messageList: [...state.messageList, action.newMessage],
      };

    default:
      return state;
  }
};
