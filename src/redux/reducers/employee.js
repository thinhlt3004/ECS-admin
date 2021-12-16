import { INITIAL_STATE } from "./../store/initialState";
import {
  getType,
  getAll,
  updateEmployee,
  deleteEmployee,
  createEmployee,
} from "./../actions/employeeActions";

export default function EmployeeReducer(state = INITIAL_STATE.employee, action) {
  switch (action.type) {
    case getType(getAll.getAllRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getAll.getAllSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorMsg: "",
      };
    case getType(getAll.getAllFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(updateEmployee.updateEmployeeRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(updateEmployee.updateEmployeeSuccess):
      return {
        ...state,
        isLoading: false,
        data: state.data.map((i) =>
          i.employeeId === action.payload.employeeId ? action.payload : i
        ),
        errorMsg: "",
      };
    case getType(updateEmployee.updateEmployeeFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(deleteEmployee.deleteEmployeeRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(deleteEmployee.deleteEmployeeSuccess):
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((i) => i.employeeId !== action.payload),
        errorMsg: "",
      };
    case getType(deleteEmployee.deleteEmployeeFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case getType(createEmployee.createEmployeeRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(createEmployee.createEmployeeSuccess):
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload],
        errorMsg: "",
      };
    case getType(createEmployee.createEmployeeFailure):
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
}
