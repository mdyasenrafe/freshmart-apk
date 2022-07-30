import * as actionTypes from "./ActionTypes";

const intialState: IState = {
  email: {
    isLoading: false,
    user: null,
    erorr: null,
  },
  profile: {
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

const ProfileStart = (state: IState, action: any) => {
  return {
    ...state,
    profile: {
      isLoading: true,
      user: null,
      error: null,
    },
  };
};
const ProfileSuccess = (state: IState, action: any) => {
  return {
    ...state,
    profile: {
      isLoading: false,
      user: action.user,
      error: null,
    },
  };
};
const ProfileFaill = (state: IState, action: any) => {
  return {
    ...state,
    profile: {
      isLoading: false,
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
    case actionTypes.CART_DATA:
      return cartReducer(state, action);
    case actionTypes.PROFILE_START:
      return ProfileStart(state, action);
    case actionTypes.PROFILE_SUCCESS:
      return ProfileSuccess(state, action);
    case actionTypes.PROFILE_FAILURE:
      return ProfileFaill(state, action);
    default:
      return state;
  }
};
