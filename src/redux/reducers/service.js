import { INITIAL_STATE } from "./../store/initialState";
import {
  getType,
  getserviceAll,
  updateService,
  createService,
  deleteService,
} from "./../actions/serviceActions";

export default function ServiceReducer(state = INITIAL_STATE.service, action) {
  switch (action.type) {
    case getType(getserviceAll.getserviceAllRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getserviceAll.getserviceAllSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorMsg: "",
      };
    case getType(getserviceAll.getserviceAllFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(updateService.updateserviceAllRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(updateService.updateserviceAllSuccess):
      return {
        ...state,
        isLoading: false,
        data: state.data.map((i) =>
          i.id === action.payload.id ? action.payload : i
        ),
        errorMsg: "",
      };
    case getType(updateService.updateserviceAllFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(createService.createserviceAllRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(createService.createserviceAllSuccess):
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload],
        errorMsg: "",
      };
    case getType(createService.createserviceAllFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(deleteService.deleteServiceAllRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(deleteService.deleteServiceAllSuccess):
      return {
        ...state,
        isLoading: false,
        data: state.data.filter(i => i.id !== action.payload),
        errorMsg: "",
      };
    case getType(deleteService.deleteServiceAllFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
}
