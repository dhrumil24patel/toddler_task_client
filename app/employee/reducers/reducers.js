import {IS_EMPLOYEE} from '../actions/type';


export const isEmployee = (state = false, action) => {
    if(action.type === IS_EMPLOYEE) {
        return action.payload;
    }
    return state;
};
