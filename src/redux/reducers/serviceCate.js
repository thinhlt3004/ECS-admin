import { INITIAL_STATE } from "./../store/initialState";
import {
  getType,
  getserviceCateAll,
  updateserviceCateAll,
  createserviceCateAll,
  deleteserviceCateAll
} from "./../actions/serviceCateActions";

export default function ServiceCateReducer(state = INITIAL_STATE.serviceCate, action) {
  switch (action.type) {
    case getType(getserviceCateAll.getserviceCateAllRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getserviceCateAll.getserviceCateAllSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorMsg: "",
      };
    case getType(getserviceCateAll.getserviceCateAllFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(updateserviceCateAll.updateserviceCateAllRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(updateserviceCateAll.updateserviceCateAllSuccess):
      return {
        ...state,
        isLoading: false,
        data: state.data.map((i) =>
          i.id === action.payload.id ? action.payload : i
        ),
        errorMsg: "",
      };
    case getType(updateserviceCateAll.updateserviceCateAllFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(createserviceCateAll.createserviceCateAllRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(createserviceCateAll.createserviceCateAllSuccess):
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload],
        errorMsg: "",
      };
    case getType(createserviceCateAll.createserviceCateAllFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(deleteserviceCateAll.deleteserviceCateAllRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(deleteserviceCateAll.deleteserviceCateAllSuccess):
      return {
        ...state,
        isLoading: false,
        data: state.data.filter(i => i.id !== action.payload),
        errorMsg: "",
      };
    case getType(deleteserviceCateAll.deleteserviceCateAllFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
}
