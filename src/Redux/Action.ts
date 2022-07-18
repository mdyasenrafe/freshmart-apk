import * as actionTypes from "./ActionTypes";

export const EmailStart = () => {
  return {
    type: actionTypes.EMAIL_START,
  };
};
export const EmailSuccess = (user: any) => {
  return {
    type: actionTypes.EMAIL_SUCCESS,
    user: user,
  };
};
export const EmiallFail = (error: any) => {
  return {
    type: actionTypes.EMAIL_SUCCESS,
    user: null,
    error: error,
  };
};
