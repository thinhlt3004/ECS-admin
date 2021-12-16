import {publicRequest, privateRequest} from './axiosConfig';


//publicRequest

export const login = (payload) => publicRequest.post('/Employee/Login', payload);

export const getServiceCate = () => publicRequest.get('/ServiceCategory');

export const getAllService = () => publicRequest.get('/Service');

export const confirmAccount = (payload) => publicRequest.patch(`/Employee/${payload}`); 

//privateRequest
export const getUserByToken = () =>  privateRequest.get('/Employee/GetUserByToken');

export const getAllEmployee = () => privateRequest.get('/Employee');

export const getAllDepartment = () => privateRequest.get('/Department');

export const getAllRole = () => privateRequest.get('/Role');

export const updateEmployee = (payload) => privateRequest.put(`/Employee/${payload.employeeId}`, payload);


export const deleteEmployee = (payload) => privateRequest.delete(`/Employee/${payload}`);

export const createEmployee = (payload) => privateRequest.post(`/Employee/Create`, payload);

export const updateServiceCate = (payload) => privateRequest.put(`/ServiceCategory/${payload.id}`, payload);

export const createServiceCate = (payload) => privateRequest.post(`/ServiceCategory`, payload);

export const deleteServiceCate = (payload) => privateRequest.delete(`/ServiceCategory/${payload}`);

export const updateService = (payload) => privateRequest.put(`/Service/${payload.id}`, payload);

export const createService = (payload) => privateRequest.post(`/Service`, payload);

export const deleteService = (payload) => privateRequest.delete(`/Service/${payload}`);

export const getAllCustomers = () => privateRequest.get('/Customer');

export const updateCustomer = (payload) => privateRequest.put(`/Customer/${payload.id}`, payload);

export const getAllServiceCustomers = () => privateRequest.get(`/ServiceCustomer`);

export const getCurrentEmployeeOfCusSer = (payload) => privateRequest.get(`/EmpOfCus/Customer/${payload}`);

export const createNewEmpOfCus = (payload) => privateRequest.post(`/EmpOfCus`, payload);

export const updateNewEmpOfCus = (payload) => privateRequest.put(`/EmpOfCus`, payload);

export const getReportByCusEmpIDandMonth = (payload) => privateRequest.get(`/Report/get-by-cus-month/${payload.id}/${payload.month}`);

export const updateReport = (payload) => privateRequest.put(`/Report/update-data`, payload);

export const insertReport = (payload) => privateRequest.post(`/Report`, payload);

export const updatePassword = (payload) => privateRequest.patch(`/Employee/update-password/${payload.id}/${payload.password}`);

export const getReportChart = () => privateRequest.get(`/ServiceCustomer/get-report-profit`);