import { combineReducers } from "redux";
import auth from './auth';
import notifications from './notifications';
import employee from './employee';
import serviceCate from './serviceCate';
import service from './service';
import customer from './customer';
import serviceCustomer from './serviceCustomer';
import report from './report';
export default combineReducers({
    auth,
    notifications,
    employee,
    serviceCate,
    service,
    customer,
    serviceCustomer,
    report
});