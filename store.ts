import { useDispatch } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Reduccer } from "./src/Redux/Reducer";

const AuthStore = createStore(Reduccer, applyMiddleware(thunk));

export default AuthStore;

export type RootState = ReturnType<typeof Reduccer>;
export type AppDispatch = typeof AuthStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
