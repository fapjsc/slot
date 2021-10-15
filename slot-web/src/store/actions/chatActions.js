import { SET_NEW_MESSAGE_TO_LIST } from '../constants/chatConstants';

export const addNewMessageToList = newMessage => dispatch => {
  dispatch({ type: SET_NEW_MESSAGE_TO_LIST, newMessage });
};
