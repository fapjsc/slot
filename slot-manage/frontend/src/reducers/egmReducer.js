const initialState = {
  egmList: [],
};
export const egmReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EGM_LIST':
      return {
        ...state,
        egmList: action.payload,
      };
    default:
      return state;
  }
};
