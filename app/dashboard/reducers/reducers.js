import {DASHBOARD_CONTAINER_STATE,
    OPEN_TOP_BAR_BUTTONS_TRAY}
    from '../actions/types';


export const openTopBarButtonsTray = (state = {}, action) => {
    if(action.type === OPEN_TOP_BAR_BUTTONS_TRAY) {
        return action.payload;
    }
    return state;
};

export const dashboardContainerState = (state = 'dashboard', action) => {
    if(action.type === DASHBOARD_CONTAINER_STATE) {
        return action.payload;
    }
    return state;
};
