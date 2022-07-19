import firebaseInitAuth from "../../Firebase/Firebase.Init";
import * as actionTypes from "./ActionTypes";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

firebaseInitAuth();
const auth = getAuth();

export const EmailStartAction = () => {
  return {
    type: actionTypes.EMAIL_START,
  };
};
export const EmailSuccessAction = (user: any) => {
  return {
    type: actionTypes.EMAIL_SUCCESS,
    user: user,
  };
};
export const EmiallFailAction = (error: any) => {
  return {
    type: actionTypes.EMAIL_SUCCESS,
    user: null,
    error: error,
  };
};

export const EmailSignUp =
  (email: string, password: string) => (dispatch: any, getState: any) => {
    console.log(email);
    dispatch(EmailStartAction());
    return createUserWithEmailAndPassword(auth, email, password);
  };
