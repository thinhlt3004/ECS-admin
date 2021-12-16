import { INITIAL_STATE } from "./../store/initialState";
import {
  getType,
  getAllReport,
  updateReport,
  insertReport,
} from "./../actions/reportActions";

export default function NotificationReducer(
  state = INITIAL_STATE.report,
  action
) {
  switch (action.type) {
    case getType(getAllReport.getAllReportRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getAllReport.getAllReportSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorMsg: "",
      };
    case getType(getAllReport.getAllReportFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(updateReport.updateReportRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(updateReport.updateReportSuccess):
      return {
        ...state,
        isLoading: false,
        data: state.data.map((i) =>
          i.id === action.payload.id &&
          i.serviceOfCus === action.payload.serviceOfCus
            ? action.payload
            : i
        ),
        errorMsg: "",
      };
    case getType(updateReport.updateReportFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(insertReport.insertReportRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(insertReport.insertReportSuccess):
      const serCus = state.data.find(i => i.serviceOfCus === action.payload.serviceOfCus);
      let newReport  = state.data;
      if(serCus) {
        newReport = [...state.data, action.payload];
      }
      return {
        ...state,
        isLoading: false,
        data: newReport,
        errorMsg: "",
      };
    case getType(insertReport.insertReportFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
}
