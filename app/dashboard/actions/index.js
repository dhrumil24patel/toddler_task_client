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

