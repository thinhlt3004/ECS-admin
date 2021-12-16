import { INITIAL_STATE } from "./../store/initialState";
import {
  getType,
  login,
  logOut,
  expireLogOut,
  getUserByToken,
  updatePassword,
  checkUpdateUser,
} from "./../actions/authActions";

export default function AuthReducer(state = INITIAL_STATE.auth, action) {
  switch (action.type) {
    case getType(login.loginRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(login.loginSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorMsg: "",
      };
    case getType(login.loginFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(logOut.logOutSuccess):
      return {
        ...state,
        data: null,
      };
    case getType(expireLogOut.expireLogOutSuccess):
      return {
        ...state,
        data: null,
      };
    case getType(getUserByToken.getUserByTokenRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getUserByToken.getUserByTokenSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorMsg: "",
      };
    case getType(updatePassword.updatePasswordRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(updatePassword.updatePasswordSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorMsg: "",
      };
    case getType(updatePassword.updatePasswordFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(checkUpdateUser):
      return {
        ...state,
        isLoading: false,
        data: state.data.employeeId === action.payload.employeeId ? action.payload : state.data,
        errorMsg: "",
      };
    default:
      return state;
  }
}
