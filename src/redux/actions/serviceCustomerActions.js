import {createActions} from 'redux-actions';


export const getType = (reduxAction) => {
    return reduxAction().type;
};

export const getAllServiceCustomer = createActions({
    getAllServiceCustomerRequest : () => undefined,
    getAllServiceCustomerSuccess : (payload) => payload,
    getAllServiceCustomerFailure : (error) => error,
});