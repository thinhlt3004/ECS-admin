import { INITIAL_STATE } from "./../store/initialState";
import {
  getType,
  getCustomersAll,
  updateCustomer,
} from "./../actions/customerActions";

export default function CustomerReducer(
  state = INITIAL_STATE.customer,
  action
) {
  switch (action.type) {
    case getType(getCustomersAll.getCustomersAllRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getCustomersAll.getCustomersAllSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorMsg: "",
      };
    case getType(getCustomersAll.getCustomersAllFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(updateCustomer.updateCustomerRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(updateCustomer.updateCustomerSuccess):
      return {
        ...state,
        isLoading: false,
        data: state.data.map(i => i.id === action.payload.id ? action.payload : i),
        errorMsg: "",
      };
    case getType(updateCustomer.updateCustomerFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
}
