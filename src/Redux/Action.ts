import firebaseInitAuth from "../../Firebase/Firebase.Init";
import * as actionTypes from "./ActionTypes";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";

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
export const EmailFailAction = (error: any) => {
  return {
    type: actionTypes.EMAIL_FAILURE,
    user: null,
    error: error,
  };
};

export const EmailSignUp =
  (email: string, password: string) => (dispatch: any, getState: any) => {
    // dispatch(EmailStartAction());
    return createUserWithEmailAndPassword(auth, email, password);
  };

export const OnAuthChange = () => (dispatch: any, getState: any) => {
  dispatch(EmailStartAction());
  onAuthStateChanged(auth, (user: any) => {
    if (user) {
      const url = "https://freshmartapi.herokuapp.com/user/getuser";
      axios
        .post(url, {
          email: user.email,
        })
        .then((res: any) => {
          dispatch(EmailSuccessAction(res.data.data));
        })
        .catch((err: any) => {
          dispatch(EmailFailAction(err.message));
        });
    } else {
      dispatch(EmailFailAction(null));
    }
  });
};

export const EmailSignin =
  (email: string, password: string) => (dispatch: any, getState: any) => {
    // dispatch(EmailStartAction());
    return signInWithEmailAndPassword(auth, email, password);
  };
