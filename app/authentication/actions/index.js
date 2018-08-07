import * as types from './type';

export function performLogout(trueOrFalse) {
    return {
        type: types.USER_ACTION_LOGOUT,
        payload: trueOrFalse
    };
}

export function performLogin(payload) {
    return {
        type: types.USER_ACTION_LOGIN,
        payload: payload
    };
}

export function performRegister(payload) {
    return {
        type: types.USER_ACTION_REGISTER,
        payload: payload
    };
}

export function reportAuthenticationProcessing(payload) {
    return {
        type: types.AUTHENTICATION_PROCESSING,
        payload: payload
    };
}

export function reportUserData(payload) {
    return {
        type: types.USER_DATA,
        payload: payload
    };
}
