import {createActions} from 'redux-actions';


export const getType = (reduxAction) => {
    return reduxAction().type;
};

export const getserviceAll = createActions({
    getserviceAllRequest : () => undefined,
    getserviceAllSuccess : (payload) => payload,
    getserviceAllFailure : (error) => error,
});

export const updateService = createActions({
    updateserviceAllRequest : (payload) => payload,
    updateserviceAllSuccess : (payload) => payload,
    updateserviceAllFailure : (error) => error,
});

export const createService = createActions({
    createserviceAllRequest : (payload) => payload,
    createserviceAllSuccess : (payload) => payload,
    createserviceAllFailure : (error) => error,
});

export const deleteService = createActions({
    deleteServiceAllRequest : (payload) => payload,
    deleteServiceAllSuccess : (payload) => payload,
    deleteServiceAllFailure : (error) => error,
});