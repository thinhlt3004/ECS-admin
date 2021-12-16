import { takeLatest, call, put } from "redux-saga/effects";
import * as Api from "./../../Api/index";
import * as authActions from "./../actions/authActions";
import * as notificationsActions from "./../actions/notificationActions";
import * as employeeActions from "./../actions/employeeActions";
import * as serviceCateActions from "./../actions/serviceCateActions";
import * as serviceActions from "./../actions/serviceActions";
import * as customerActions from './../actions/customerActions';
import * as serviceCustomerActions from './../actions/serviceCustomerActions';
import * as reportActions from './../actions/reportActions';
function* checkLogin(action) {
  try {
    const res = yield call(Api.login, action.payload);
    if (res.status === 200) {
      if (res.data.emailConfirm === false) {
        yield put(
          notificationsActions.openNotifications(
            "Your Account is not confirmed from email"
          )
        );
        yield put(authActions.login.loginFailure(""));
      } else {
        const authToken = {
          accessToken: res.data.accessToken,
        };
        if (localStorage.getItem("adminToken") !== null) {
          localStorage.removeItem("adminToken");
        }
        localStorage.setItem("adminToken", JSON.stringify(authToken));
        yield put(notificationsActions.openNotifications("Login Successfully"));
        yield put(authActions.login.loginSuccess(res.data));
      }
    }
  } catch (error) {
    console.log(error);
    yield put(authActions.login.loginFailure(""));
    yield put(
      notificationsActions.openNotifications("Email or Password is not valid")
    );
  }
}

function* logOutProcess(action) {
  localStorage.removeItem("adminToken");
  yield put(notificationsActions.openNotifications("Logout Successfully"));
  yield put(authActions.logOut.logOutSuccess());
}

function* expireLogOutProcess(action) {
  localStorage.removeItem("adminToken");
  yield put(
    notificationsActions.openNotifications(
      "Login session has expired. Please login again."
    )
  );
  yield put(authActions.expireLogOut.expireLogOutSuccess());
}

function* getUserByTokenProcess(action) {
  try {
    const res = yield call(Api.getUserByToken);
    if (res.status === 200) {
      yield put(
        notificationsActions.openNotifications(
          `Welcome back ${res.data.fullName}`
        )
      );
      yield put(authActions.getUserByToken.getUserByTokenSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getAllEmployee(action) {
  try {
    const res = yield call(Api.getAllEmployee);
    // console.log(res.data);
    if (res.status === 200) {
      yield put(employeeActions.getAll.getAllSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
    yield put(employeeActions.getAll.getAllFailure(error.message));
  }
}

function* updateEmployeeProcess(action) {
  try {
    const res = yield call(Api.updateEmployee, action.payload);
    if (res.status === 200) {
      yield put(authActions.checkUpdateUser(res.data));
      yield put(
        notificationsActions.openNotifications("Update Employee Successfully")
      );
      
      yield put(employeeActions.updateEmployee.updateEmployeeSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteEmployeeProcess(action) {
  try {
    const res = yield call(Api.deleteEmployee, action.payload);
    if (res.status === 200) {
      yield put(
        notificationsActions.openNotifications("Delete Employee Successfully")
      );
      yield put(
        employeeActions.deleteEmployee.deleteEmployeeSuccess(action.payload)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* createEmployeeProcess(action) {
  try {
    const res = yield call(Api.createEmployee, action.payload);
    if (res.status === 200) {
      yield put(
        notificationsActions.openNotifications("Create new Employee Successfully")
      );
      yield put(
        employeeActions.createEmployee.createEmployeeSuccess(action.payload)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* getAllServiceCateProccess(action) {
  try {
    const res = yield call(Api.getServiceCate);
    if (res.status === 200) {
      yield put(
        serviceCateActions.getserviceCateAll.getserviceCateAllSuccess(res.data)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateServiceCateProccess(action) {
  try {
    const res = yield call(Api.updateServiceCate, action.payload);
    if (res.status === 200) {
      yield put(
        notificationsActions.openNotifications(
          "Update Service Category Successfully"
        )
      );
      yield put(
        serviceCateActions.updateserviceCateAll.updateserviceCateAllSuccess(
          res.data
        )
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* createServiceCateProccess(action) {
  try {
    const res = yield call(Api.createServiceCate, action.payload);
    if (res.status === 200) {
      yield put(
        notificationsActions.openNotifications(
          "Create Service Category Successfully"
        )
      );
      yield put(
        serviceCateActions.createserviceCateAll.createserviceCateAllSuccess(
          res.data
        )
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteServiceCateProccess(action) {
  try {
    const res = yield call(Api.deleteServiceCate, action.payload);
    if (res.status === 200) {
      yield put(
        notificationsActions.openNotifications(
          "Delete Service Category Successfully"
        )
      );
      yield put(
        serviceCateActions.deleteserviceCateAll.deleteserviceCateAllSuccess(
          action.payload
        )
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* getServiceProccess(action) {
  try {
    const res = yield call(Api.getAllService);
    if (res.status === 200) {
      yield put(serviceActions.getserviceAll.getserviceAllSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateServiceProccess(action) {
  try {
    const res = yield call(Api.updateService, action.payload);
    if (res.status === 200) {
      // console.log(res.data);
      yield put(
        notificationsActions.openNotifications("Update Service Successfully")
      );
      yield put(serviceActions.updateService.updateserviceAllSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* createServiceProccess(action) {
  try {
    const res = yield call(Api.createService, action.payload);
    if (res.status === 200) {
      yield put(
        notificationsActions.openNotifications("Create Service Successfully")
      );
      yield put(serviceActions.createService.createserviceAllSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteServiceProccess(action) {
  try {
    const res = yield call(Api.deleteService, action.payload);
    if (res.status === 200) {
      yield put(
        notificationsActions.openNotifications("Delete Service Successfully")
      );
      yield put(serviceActions.deleteService.deleteServiceAllSuccess(action.payload));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getCustomersAllProccess(action){
  try {
    const res = yield call(Api.getAllCustomers);
    if(res.status === 200) {
      yield put(customerActions.getCustomersAll.getCustomersAllSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateCustomerProccess(action){
  try {
    const res = yield call(Api.updateCustomer, action.payload);
    if(res.status === 200){
      yield put(customerActions.updateCustomer.updateCustomerSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getAllServiceCustomerProccess(action){
  try {
    const res = yield call(Api.getAllServiceCustomers);
    if(res.status === 200){
      yield put(serviceCustomerActions.getAllServiceCustomer.getAllServiceCustomerSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getallReportProccess(action){
  try {
    const res = yield call(Api.getReportByCusEmpIDandMonth, action.payload);
    if(res.status === 200){
      yield put(reportActions.getAllReport.getAllReportSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateReportProccess(action){
  try {
    const res = yield call(Api.updateReport, action.payload);
    if(res.status === 200){
      yield put(
        notificationsActions.openNotifications("Update Report Successfully")
      );

      yield put(reportActions.updateReport.updateReportSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* insertReportProccess(action){
  try {
    const res = yield call(Api.insertReport, action.payload);
    if(res.status === 200) {
      yield put(
        notificationsActions.openNotifications("Insert Report Successfully")
      );
      yield put(reportActions.insertReport.insertReportSuccess(res.data));
    }
  } catch (error) {
    console.log(error.message);
    yield put(
      notificationsActions.openNotifications("Today had report !")
    );
    yield put(reportActions.insertReport.insertReportFailure(''));
  }
}

function* updatePasswordProccess(action){
  try {
    const res = yield call(Api.updatePassword, action.payload);
    if(res.status === 200) {
      yield put(
        notificationsActions.openNotifications("Update Password Successfully")
      );
      yield put(authActions.updatePassword.updatePasswordSuccess(res.data));
    }
  } catch (error) {
    yield put(authActions.updatePassword.updatePasswordFailure(''));
  }
}


function* mySaga() {
  yield takeLatest(authActions.login.loginRequest, checkLogin);
  yield takeLatest(authActions.logOut.logOutRequest, logOutProcess);
  yield takeLatest(
    authActions.expireLogOut.expireLogOutRequest,
    expireLogOutProcess
  );
  yield takeLatest(
    authActions.getUserByToken.getUserByTokenRequest,
    getUserByTokenProcess
  );
  yield takeLatest(employeeActions.getAll.getAllRequest, getAllEmployee);
  yield takeLatest(
    employeeActions.updateEmployee.updateEmployeeRequest,
    updateEmployeeProcess
  );
  yield takeLatest(
    employeeActions.deleteEmployee.deleteEmployeeRequest,
    deleteEmployeeProcess
  );
  yield takeLatest(
    employeeActions.createEmployee.createEmployeeRequest,
    createEmployeeProcess
  );
  yield takeLatest(
    serviceCateActions.getserviceCateAll.getserviceCateAllRequest,
    getAllServiceCateProccess
  );
  yield takeLatest(
    serviceCateActions.updateserviceCateAll.updateserviceCateAllRequest,
    updateServiceCateProccess
  );
  yield takeLatest(
    serviceCateActions.createserviceCateAll.createserviceCateAllRequest,
    createServiceCateProccess
  );
  yield takeLatest(
    serviceCateActions.deleteserviceCateAll.deleteserviceCateAllRequest,
    deleteServiceCateProccess
  );
  yield takeLatest(
    serviceActions.getserviceAll.getserviceAllRequest,
    getServiceProccess
  );
  yield takeLatest(
    serviceActions.updateService.updateserviceAllRequest,
    updateServiceProccess
  );
  yield takeLatest(
    serviceActions.createService.createserviceAllRequest,
    createServiceProccess
  );
  yield takeLatest(
    serviceActions.deleteService.deleteServiceAllRequest,
    deleteServiceProccess
  );
  yield takeLatest(
    customerActions.getCustomersAll.getCustomersAllRequest,
    getCustomersAllProccess
  );
  yield takeLatest(
    customerActions.updateCustomer.updateCustomerRequest,
    updateCustomerProccess
  );
  yield takeLatest(
    serviceCustomerActions.getAllServiceCustomer.getAllServiceCustomerRequest,
    getAllServiceCustomerProccess
  );
  yield takeLatest(
    reportActions.getAllReport.getAllReportRequest,
    getallReportProccess
  );
  yield takeLatest(
    reportActions.updateReport.updateReportRequest,
    updateReportProccess
  );
  yield takeLatest(
    reportActions.insertReport.insertReportRequest,
    insertReportProccess
  );
  yield takeLatest(
    authActions.updatePassword.updatePasswordRequest,
    updatePasswordProccess
  );
}

export default mySaga;
