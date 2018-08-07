import {OPEN_TOP_BAR_BUTTONS_TRAY} from '../actions/types';


export const openTopBarButtonsTray = (state = {}, action) => {
    if(action.type === OPEN_TOP_BAR_BUTTONS_TRAY) {
        return action.payload;
    }
    return state;
};
