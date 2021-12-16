import {createAction} from 'redux-actions';


export const getType = (reduxAction) => {
    return reduxAction().type;
};

export const openNotifications = createAction('OPEN_NOTIFICATIONS', (payload) => payload);

export const closeNotifications = createAction('CLOSE_NOTIFICATIONS');