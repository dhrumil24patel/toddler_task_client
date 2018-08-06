import {USER_ACTION_REGISTER, USER_ACTION_LOGIN, USER_ACTION_LOGOUT, AUTHENTICATION_PROCESSING} from '../actions/type';


export const loginUser = (state = null, action) => {
    if(action.type === USER_ACTION_LOGIN) {
        return action.payload;
    }
    return state;
};

export const logoutUser = (state = false, action) => {
    if(action.type === USER_ACTION_LOGOUT) {
        return action.payload;
    }
    return state;
};

export const registerUser = (state = null, action) => {
    if(action.type === USER_ACTION_REGISTER) {
        return action.payload;
    }
    return state;
};

export const authenticationProcessing = (state = false, action) => {
    if(action.type === AUTHENTICATION_PROCESSING) {
        return action.payload;
    }
    return state;
};
