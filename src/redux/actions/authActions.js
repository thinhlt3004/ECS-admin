import {createAction, createActions} from 'redux-actions';


export const getType = (reduxAction) => {
    return reduxAction().type;
};



export const login = createActions({
    loginRequest : (payload) => payload,
    loginSuccess : (payload) => payload,
    loginFailure : (error) => error,
});


export const getUserByToken = createActions({
    getUserByTokenRequest : (payload) => payload,
    getUserByTokenSuccess : (payload) => payload,
})

export const updatePassword = createActions({
    updatePasswordRequest : (payload) => payload,
    updatePasswordSuccess : (payload) => payload,
    updatePasswordFailure : (error) => error,
})


export const checkUpdateUser = createAction('CHECK_UPDATE_USER', (payload) => payload);

export const logOut = createActions({
    logOutRequest : () => undefined,
    logOutSuccess : () => undefined,
})

export const expireLogOut = createActions({
    expireLogOutRequest : () => undefined,
    expireLogOutSuccess : () => undefined,
})


