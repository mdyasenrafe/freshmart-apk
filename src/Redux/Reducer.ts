import * as actionTypes from "./ActionTypes";

const intialState: IState = {
  email: {
    isLoading: false,
    user: null,
    erorr: null,
  },
};

const emailStart = (state: IState, action: any) => {
  return {
    ...state,
    email: {
      isLoading: true,
      user: null,
      error: null,
    },
  };
};
const emailSuccess = (state: IState, action: any) => {
  return {
    ...state,
    email: {
      isLoading: true,
      user: action.user,
      error: null,
    },
  };
};
const emailFaill = (state: IState, action: any) => {
  return {
    ...state,
    email: {
      isLoading: true,
      user: null,
      error: action.error,
    },
  };
};

export const Reduccer = (state: IState = intialState, action: any) => {
  switch (action?.type) {
    case actionTypes.EMAIL_START:
      return emailStart(state, action);
    case actionTypes.EMAIL_SUCCESS:
      return emailSuccess(state, action);
    case actionTypes.EMAIL_FAILURE:
      return emailFaill(state, action);
    default:
      return state;
  }
};
