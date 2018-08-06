import {IS_EMPLOYEE} from './type';


export const reportIsEmployee = (trueOrFalse) => {
    return{
        type: IS_EMPLOYEE,
        payload: trueOrFalse
    };
};
