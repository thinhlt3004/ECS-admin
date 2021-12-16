import { INITIAL_STATE } from "./../store/initialState";
import {
  getType,
  getAllServiceCustomer
} from "./../actions/serviceCustomerActions";

export default function ServiceCateReducer(state = INITIAL_STATE.serviceCustomer, action) {
    switch(action.type) {
        case getType(getAllServiceCustomer.getAllServiceCustomerRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getAllServiceCustomer.getAllServiceCustomerSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorMsg: "",
      };
    case getType(getAllServiceCustomer.getAllServiceCustomerFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
        default: 
            return state;
    }
}