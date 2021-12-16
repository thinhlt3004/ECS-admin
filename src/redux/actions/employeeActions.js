import {createActions} from 'redux-actions';


export const getType = (reduxAction) => {
    return reduxAction().type;
};



export const getAll = createActions({
    getAllRequest : () => undefined,
    getAllSuccess : (payload) => payload,
    getAllFailure : (error) => error,
});

export const updateEmployee = createActions({
    updateEmployeeRequest : (payload) => payload,
    updateEmployeeSuccess : (payload) => payload,
    updateEmployeeFailure : (error) => error,
});

export const deleteEmployee = createActions({
    deleteEmployeeRequest : (payload) => payload,
    deleteEmployeeSuccess : (payload) => payload,
    deleteEmployeeFailure : (error) => error,
});


export const createEmployee = createActions({
    createEmployeeRequest : (payload) => payload,
    createEmployeeSuccess : (payload) => payload,
    createEmployeeFailure : (error) => error,
});