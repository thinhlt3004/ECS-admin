import {createActions} from 'redux-actions';


export const getType = (reduxAction) => {
    return reduxAction().type;
};

export const getserviceCateAll = createActions({
    getserviceCateAllRequest : () => undefined,
    getserviceCateAllSuccess : (payload) => payload,
    getserviceCateAllFailure : (error) => error,
});


export const updateserviceCateAll = createActions({
    updateserviceCateAllRequest : (payload) => payload,
    updateserviceCateAllSuccess : (payload) => payload,
    updateserviceCateAllFailure : (error) => error,
});

export const createserviceCateAll = createActions({
    createserviceCateAllRequest : (payload) => payload,
    createserviceCateAllSuccess : (payload) => payload,
    createserviceCateAllFailure : (error) => error,
});


export const deleteserviceCateAll = createActions({
    deleteserviceCateAllRequest : (payload) => payload,
    deleteserviceCateAllSuccess : (payload) => payload,
    deleteserviceCateAllFailure : (error) => error,
});