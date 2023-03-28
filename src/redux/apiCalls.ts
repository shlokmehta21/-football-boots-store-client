import { publicRequest } from "../requestMehtods";
import { AppDispatch } from "./Store";
import { loginFailure, loginStart, loginSuccess, userTypes } from "./userSlice";

export const login = async (dispatch: AppDispatch, user: userTypes) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
