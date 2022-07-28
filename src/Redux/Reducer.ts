import * as actionTypes from "./ActionTypes";

const intialState: IState = {
  email: {
    isLoading: false,
    user: null,
    erorr: null,
  },
  cart: [],
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
      isLoading: false,
      user: action.user,
      error: null,
    },
  };
};
const emailFaill = (state: IState, action: any) => {
  return {
    ...state,
    email: {
      isLoading: false,
      user: null,
      error: action.error,
    },
  };
};

const cartReducer = (state: IState, action: any) => {
  return {
    ...state,
    cart: action.cart,
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
    case actionTypes.CART_DATA:
      return cartReducer(state, action);
    default:
      return state;
  }
};
