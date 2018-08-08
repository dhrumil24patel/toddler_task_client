import * as types from './types';

export function reportOpenTopBarButtonsTray(filter) {
    return {
        type: types.OPEN_TOP_BAR_BUTTONS_TRAY,
        payload: filter
    };
}
export function reportDashboardContainerState(filter) {
    return {
        type: types.DASHBOARD_CONTAINER_STATE,
        payload: filter
    };
}

export function reportRespondingQuestionaire(filter) {
    return {
        type: types.DASHBOARD_RESPONDING_QUESTIONAIRE,
        payload: filter
    };
}

export function reportViewingQuestionaire(filter) {
    return {
        type: types.DASHBOARD_VIEWING_QUESTIONAIRE,
        payload: filter
    };
}

