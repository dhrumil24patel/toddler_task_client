import {
    DASHBOARD_CONTAINER_STATE, DASHBOARD_RESPONDING_QUESTIONAIRE, DASHBOARD_VIEWING_QUESTIONAIRE,
    OPEN_TOP_BAR_BUTTONS_TRAY
}
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

export const respondingQuestionaire = (state = null, action) => {
    if(action.type === DASHBOARD_RESPONDING_QUESTIONAIRE) {
        return action.payload;
    }
    return state;
};

export const viewingQuestionaire = (state = null, action) => {
    if(action.type === DASHBOARD_VIEWING_QUESTIONAIRE) {
        return action.payload;
    }
    return state;
};