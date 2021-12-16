import { INITIAL_STATE } from "./../store/initialState";
import {
  getType,
  openNotifications,
  closeNotifications,
} from "./../actions/notificationActions";

export default function NotificationReducer(
  state = INITIAL_STATE.notifications,
  action
) {
  switch (action.type) {
    case getType(openNotifications):
      return {
        ...state,
        message: action.payload,
      };
    case getType(closeNotifications):
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
}
