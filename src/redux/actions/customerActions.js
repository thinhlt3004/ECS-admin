import {createActions} from 'redux-actions';


export const getType = (reduxAction) => {
    return reduxAction().type;
};

export const getCustomersAll = createActions({
    getCustomersAllRequest : () => undefined,
    getCustomersAllSuccess : (payload) => payload,
    getCustomersAllFailure : (error) => error,
});

export const updateCustomer = createActions({
    updateCustomerRequest : (payload) => payload,
    updateCustomerSuccess : (payload) => payload,
    updateCustomerFailure : (error) => error,
});