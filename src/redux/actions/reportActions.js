import {createActions} from 'redux-actions';


export const getType = (reduxAction) => {
    return reduxAction().type;
};

export const getAllReport = createActions({
    getAllReportRequest : (payload) => payload,
    getAllReportSuccess : (payload) => payload,
    getAllReportFailure : (error) => error,
});

export const updateReport = createActions({
    updateReportRequest : (payload) => payload,
    updateReportSuccess : (payload) => payload,
    updateReportFailure : (error) => error,
});

export const insertReport = createActions({
    insertReportRequest : (payload) => payload,
    insertReportSuccess : (payload) => payload,
    insertReportFailure : (error) => error,
})